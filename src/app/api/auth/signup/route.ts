import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // make sure this points to your prisma client
import { hash } from "bcrypt";
import { sendOtpEmail } from "@/lib/sendOtpEmail"; // you'll define this
import { generateOtp } from "@/lib/generateOtp"; // you'll define this

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phoneNumber, password, selectedPlan } = body;

    if (!name || !email || !phoneNumber || !password || !selectedPlan) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Check for existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "admin",
        phoneNumber,
        isVerified: false,
        isApproved: false,
      },
    });

    // Create admin record
    const admin = await prisma.admin.create({
      data: {
        userId: user.id,
        endDate: new Date(), // will update after payment
      },
    });

    // Save OTP
    const otp = generateOtp(); // e.g. 6-digit string
    await prisma.otp.create({
      data: {
        email,
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
      },
    });

    // Send OTP (you implement this function)
    await sendOtpEmail(email, otp);

    return NextResponse.json({ message: "Signup successful, verify OTP" });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ message: "Internal Server Error - " }, { status: 500 });
  }
}
