import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.cookies.get('jwt')) {
    return NextResponse.rewrite(new URL('/dashboard', req.url));
  }
  return NextResponse.rewrite(new URL('/', req.url));
}

export const config = { matcher: ['/', '/dashboard'] };
