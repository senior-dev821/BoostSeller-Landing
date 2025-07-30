import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { addDays } from "date-fns";

export async function POST(req: Request) {
  try {
    const { email, selectedPlan } = await req.json();

    if (!email || !selectedPlan) {
      return NextResponse.json({ message: "Missing email or plan" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isVerified) {
      return NextResponse.json({ message: "User not found or not verified" }, { status: 403 });
    }

    if (user.role !== "admin") {
      return NextResponse.json({ message: "Only admins can activate plans" }, { status: 403 });
    }

    const admin = await prisma.admin.findUnique({ where: { userId: user.id } });
    if (!admin) {
      return NextResponse.json({ message: "Admin record not found" }, { status: 404 });
    }

    const plan = await prisma.pricingPlan.findUnique({
      where: { tag: selectedPlan },
    });

    if (!plan || plan.price !== 0) {
      return NextResponse.json({ message: "This plan is not free" }, { status: 400 });
    }

    const endDate = addDays(new Date(), plan.duration === "monthly" ? 30 : 7);

    // 1. Create payment history
    await prisma.payment.create({
      data: {
        adminId: admin.id,
        plan: plan.tag,
        amount: 0,
        status: "free",
        paymentId: `free_${Date.now()}`,
      },
    });

    // 2. Update admin's endDate
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        endDate,
      },
    });

    // 3. Update user's isApproved to false
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isApproved: false,
      },
    });

    return NextResponse.json({ message: "Free plan activated", endDate });
  } catch (err) {
    console.error("Free plan activation error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
