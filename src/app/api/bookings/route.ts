// src/app/api/bookings/route.ts
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const BOOKINGS_PATH = path.join(process.cwd(), 'data/bookings.json');
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const current = await readFile(BOOKINGS_PATH, 'utf-8').catch(() => '[]');
    const bookings = JSON.parse(current);

    const newBooking = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    await writeFile(BOOKINGS_PATH, JSON.stringify(bookings, null, 2));

    // Mail gönderimi
    await resend.emails.send({
      from: 'YachtMate <noreply@yachtmate.dev>', // Doğrulanmış domain adresi olmalı
      to: 'erenari27@gmail.com',                 // Mailin ulaşacağı adres
      subject: 'New Yacht Booking Request',
      html: `
        <h2>New Booking</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  const data = await readFile(BOOKINGS_PATH, 'utf-8').catch(() => '[]');
  return NextResponse.json(JSON.parse(data));
}
