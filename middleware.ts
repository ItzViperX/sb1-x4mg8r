import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  // Allow access to auth pages when not logged in
  if (!session && (pathname === '/login' || pathname === '/signup' || pathname === '/')) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated and trying to access protected routes
  if (!session && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to dashboard if authenticated and trying to access auth pages
  if (session && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};