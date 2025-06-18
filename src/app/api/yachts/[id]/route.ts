import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: NextRequest, context: any) {
  const { id } = context.params;
  const body = await req.json();
  const { name, location, description, price, image } = body;

  const updated = await prisma.yacht.update({
    where: { id },
    data: { name, location, description, price, image },
  });

  return NextResponse.json(updated);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;

  await prisma.yacht.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
