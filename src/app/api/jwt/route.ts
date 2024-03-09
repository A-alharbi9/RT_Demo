import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    jwt.verify(body.token, process.env.JWT_SECRET as string);

    return NextResponse.json({ isAuth: true });

    // ! Should change this asap
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    /*TODO: Add better error handling*/

    return NextResponse.json({ isAuth: false });
  }
}
