import connectDb from '@/app/config/db';
import { userModel } from '@/app/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const body = await req.json();
    const userId = body.userId.toLowerCase();

    const doesExist = await userModel.findOne({ empId: userId });

    if (!doesExist) {
      return NextResponse.json({ success: false });
    }

    const user = {
      id: doesExist.empId,
      name: doesExist.fullName,
      role: doesExist.position,
    };

    const token = jwt.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });

    return NextResponse.json({ success: true, user, token });

    // ! Should change this asap
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    /*TODO: Add better error handling*/

    if (error.message === 'jwt expired') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
}
