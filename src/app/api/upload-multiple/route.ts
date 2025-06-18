import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  const formData = await req.formData();
  const files = formData.getAll('files') as File[];

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  try {
    const savedFileNames: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = path.extname(file.name);
      const fileName = `${uuidv4()}${ext}`;
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      savedFileNames.push(fileName);
    }

    return NextResponse.json({ fileNames: savedFileNames });
  } catch (error) {
    console.error('[UPLOAD ERROR]', error);
    return NextResponse.json(
      { message: 'Upload failed' },
      { status: 500 }
    );
  }
}
