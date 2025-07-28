// app/api/admin/contents/hero/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const allowedOrigin = 'https://boostseller.ai'; // Change this to your actual frontend domain

function withCors(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  response.headers.set('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function OPTIONS() {
  // Handle preflight requests
  return withCors(new NextResponse(null, { status: 204 }));
}

export async function GET() {
  try {
    const hero = await prisma.heroSection.findFirst({
      include: { ctaButtons: true },
    });
    return withCors(NextResponse.json(hero));
  } catch (error) {
    console.error('[GET ]', error);
    return withCors(NextResponse.json({ error: 'Failed to fetch hero section' }, { status: 500 }));
  }
}

