import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { addMonths, addYears } from "date-fns";

import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) throw new Error("Missing sessionId");

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const email = session.customer_email;
    const planTag = session.metadata?.planTag;

    if (!email || !planTag) throw new Error("Missing metadata");

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const admin = await prisma.admin.findUnique({ where: { userId: user.id } });
    if (!admin) throw new Error("Admin not found");

    const plan = await prisma.pricingPlan.findUnique({ where: { tag: planTag } });
    if (!plan) throw new Error("Plan not found");

    let endDate: Date;

		if (plan?.duration === "1 month") {
			endDate = addMonths(new Date(), 1);
		} else if (plan?.duration === "1 year") {
			endDate = addYears(new Date(), 1);
		} else {
			throw new Error("Invalid plan duration");
		}

    await prisma.payment.create({
      data: {
        adminId: admin.id,
        plan: plan.tag,
        amount: plan.price,
        status: "paid",
        paymentId: session.id,
      },
    });

    await prisma.admin.update({
      where: { id: admin.id },
      data: { endDate },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { isApproved: true },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Confirm payment error:", err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
