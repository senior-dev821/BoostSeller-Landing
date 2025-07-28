import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const section = await prisma.workingStepsSection.findFirst({
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error('[GET workingStepsSection]', error);
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
}
