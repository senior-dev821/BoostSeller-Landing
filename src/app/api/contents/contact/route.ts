// File: src/app/api/admin/contents/contact-newsletter/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const contact = await prisma.contactSection.findFirst();
    const newsletter = await prisma.newsletterSection.findFirst();

    return NextResponse.json({ contact, newsletter });
  } catch (error) {
    console.error('GET /contact-newsletter error:', error);
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
}


