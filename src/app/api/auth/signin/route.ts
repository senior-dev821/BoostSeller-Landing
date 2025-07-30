import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, selectedPlan } = await req.json();

    if (!email || !password || !selectedPlan) {
      return NextResponse.json(
        { message: "Email, password, and plan are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    if (!user.isVerified) {
      return NextResponse.json({ message: "Please verify your email first" }, { status: 403 });
    }

    // Check admin role
    if (user.role !== "admin") {
      return NextResponse.json({ message: "Only admins can sign in here" }, { status: 403 });
    }

    // Get Admin record
    const admin = await prisma.admin.findUnique({ where: { userId: user.id } });

    if (!admin) {
      return NextResponse.json({ message: "Admin profile not found" }, { status: 404 });
    }

    // Check latest payment
    const lastPayment = await prisma.payment.findFirst({
      where: { adminId: admin.id },
      orderBy: { createdAt: "desc" },
    });

    if (
      lastPayment && selectedPlan === "Free"
    ) {
      return NextResponse.json(
        {
          message:
            "You are already on a plan. Please select a different plan to continue.",
        },
        { status: 400 }
      );
    }

    // ✅ Success
    return NextResponse.json({ message: "Sign in successful" });
  } catch (err) {
    console.error("Sign in error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
