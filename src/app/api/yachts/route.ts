import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6');
  const skip = (page - 1) * limit;

  const [yachts, total] = await Promise.all([
    prisma.yacht.findMany({
      skip,
      take: limit,
      include: { images: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.yacht.count(),
  ]);

  return NextResponse.json({ yachts, total });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, location, description, price, images } = body;

    const yacht = await prisma.yacht.create({
      data: {
        id: uuidv4(),
        name,
        location,
        description,
        price: Number(price),
        image: images?.[0] || null,
        images: {
          create: images.map((fileName: string) => ({
            id: uuidv4(),
            fileName,
          })),
        },
      },
    });

    return NextResponse.json(yacht, { status: 201 });
  } catch (error) {
    console.error('[YACHT POST ERROR]', error);
    return NextResponse.json(
      { message: 'Something went wrong while adding yacht' },
      { status: 500 }
    );
  }
}
