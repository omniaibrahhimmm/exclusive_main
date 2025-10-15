import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const authRoutes = ["/login", "/register"];
  const protectedRoutes = ["/cart", "/checkout"];
  const { pathname } = request.nextUrl;

  // لو في توكن والمستخدم بيحاول يدخل على صفحة login أو register → نرجعه للرئيسية
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // لو مفيش توكن والمستخدم بيحاول يدخل صفحة محمية → نحوله للوجين
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/cart",
    "/checkout",
  ],
};
