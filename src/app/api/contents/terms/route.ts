import { prisma } from '@/lib/prisma';
import { LegalSection } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const page = await prisma.legalPage.findUnique({
      where: { slug: 'terms' },
      include: { sections: { orderBy: { order: 'asc' } } },
    });

    if (!page) {
      return NextResponse.json({
          id: 0,
          slug: 'terms',
          title: '',
          welcome: '',
          sections: [],
        });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('GET /terms error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
