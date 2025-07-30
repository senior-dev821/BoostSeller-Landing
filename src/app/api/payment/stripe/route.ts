import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { email, selectedPlan } = await req.json();
		console.log("selected plan", selectedPlan, email);
		if (!email || !selectedPlan) {
			console.log("1");
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

		// ✅ Lookup user
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.isVerified) {
			console.log("2");
      return NextResponse.json({ message: "User not found or not verified" }, { status: 403 });
    }

		// ✅ Get plan details from DB
		const plan = await prisma.pricingPlan.findUnique({
		where: { tag: selectedPlan }, // requires @unique on `tag`
    });

    if (!plan) {
			console.log("3");
      return NextResponse.json({ message: "Invalid plan selected" }, { status: 400 });
    }

    // ⛔ If plan is free, stop here — let frontend call `/complete-free`
    if (plan.price === 0) {
			console.log("4");
      return NextResponse.json({
        message: "Free plan — no Stripe checkout required. Use /payment/complete-free instead.",
      });
    }
		console.log("plan data", plan);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(plan.price * 100), // convert to cents
            product_data: {
              name: `${plan.tag} plan`,
              description: plan.description,
            },
          },
          quantity: 1,
        },
      ],
      // metadata: {
      //   userId: user.id.toString(),
      //   planTag: plan.tag,
      // },
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/payment/faild`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}