import { prisma } from '@/lib/prisma';
import { LegalSection } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const page = await prisma.legalPage.findUnique({
      where: { slug: 'policy' },
      include: { sections: { orderBy: { order: 'asc' } } },
    });

    if (!page) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
