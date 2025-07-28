// app/api/admin/contents/hero/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET() {
  try {
    const hero = await prisma.heroSection.findFirst({
      include: { ctaButtons: true },
    });
    return NextResponse.json(hero);
  } catch (error) {
    console.error('[GET ]', error);
    return NextResponse.json({ error: 'Failed to fetch hero section' }, { status: 500 });
  }
}

