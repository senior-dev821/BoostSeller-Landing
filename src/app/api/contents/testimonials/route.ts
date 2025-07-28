import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET() {
  try {
    const section = await prisma.testimonialsSection.findFirst({
      include: {
        testimonials: {
          orderBy: { id: 'asc' },
        },
      },
    });

    if (!section) {
      // Optional: create default section if not found
      const defaultSection = await prisma.testimonialsSection.create({
        data: {
          title: 'Testimonials',
          subtitle: '',
          testimonials: {
            create: [],
          },
        },
        include: { testimonials: true },
      });
      return NextResponse.json(defaultSection, { status: 201 });
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error('[GET testimonials]', error);
    return NextResponse.json(
        { error: 'Failed to fetch testimonials section' },
        { status: 500 });
  }
}
