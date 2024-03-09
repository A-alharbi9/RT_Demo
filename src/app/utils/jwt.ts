import * as jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

export async function verifyTokenSSR(token: string) {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;
  } catch (error) {
    redirect(
      process.env.NODE_ENV == 'development'
        ? (process.env.DEV_URL as string)
        : (process.env.PROD_URL as string)
    );
  }
}
