import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  const { name, location, description, price, image } = body;

  const updated = await prisma.yacht.update({
    where: { id: params.id },
    data: { name, location, description, price, image },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
  await prisma.yacht.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
