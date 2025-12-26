import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // For now, we'll rely on client-side AuthGuard
    // Server-side JWT validation requires API endpoint to verify tokens
    // This middleware can be enhanced later with proper token validation
    
    // Allow access to admin routes - AuthGuard will handle client-side protection
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
