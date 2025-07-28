import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const section = await prisma.pricingSection.findFirst({
      include: {
        plans: {
          orderBy: { order: 'asc' },
          include: {
            features: true,
          },
        },
      },
    });

    // Return null if no section found
    return NextResponse.json(section || null);
  } catch (error) {
    console.error('[PRICING_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

