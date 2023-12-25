import connectDb from '@/app/config/db';
import { userModel } from '@/app/models/userModel';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await connectDb();

    const doesExist = await userModel.findOne({});

    if (!doesExist) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false });
  } catch (error) {
    /*TODO: Add better error handling*/
    console.log(error);
  }
}
