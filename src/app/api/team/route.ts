import connectDb from '@/app/config/db';
import { userModel } from '@/app/models/userModel';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDb();

    const members = await userModel.find({});

    return NextResponse.json({ success: true, members });
  } catch (error: unknown) {
    if (error.message === 'jwt expired') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  }
}
