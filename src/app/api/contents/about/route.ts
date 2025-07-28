import { prisma } from '@/lib/prisma';
// import { Benefits } from '@prisma/client';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const sectionOne = await prisma.aboutSectionOne.findFirst();
    const sectionTwo = await prisma.aboutSectionTwo.findFirst({
      include: { benefites: true },
    });

    return NextResponse.json({ sectionOne, sectionTwo });
  } catch (error) {
    console.error('[GET_ABOUT]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
