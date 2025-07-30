import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
    }

    // Check OTP validity
    const codeEntry = await prisma.otp.findFirst({
      where: {
        email,
        code: otp,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!codeEntry) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 401 });
    }

    // Mark user as verified
    await prisma.user.update({
      where: { email },
      data: { isVerified: true },
    });

    // Optionally delete used OTP
    await prisma.otp.deleteMany({ where: { email } });

    return NextResponse.json({ message: "Email verified" });
  } catch (err) {
    console.error("OTP verify error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
