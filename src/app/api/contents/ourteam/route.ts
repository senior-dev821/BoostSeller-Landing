import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch the first TeamSection with members
    let section = await prisma.teamSection.findFirst({
      include: { members: true },
    });

    // If no TeamSection exists, create one
    if (!section) {
      section = await prisma.teamSection.create({
        data: {
          title: 'Our Team',
          subtitle: 'Meet our talented team members',
        },
        include: { members: true },
      });
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error('GET /api/admin/contents/team error:', error);
    return NextResponse.json(
        { error: 'Failed to fetch team section.' },
        { status: 500 });
  }
}

