// app/api/cms/features/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { Feature } from '@prisma/client';


export async function GET() {
  try {
    const section = await prisma.featuresSection.findFirst({
      include: { features: { orderBy: { order: 'asc' } } },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.error('[GET /api/cms/features]', error);
    return NextResponse.json('Failed to fetch features', { status: 500 });
  }
}
