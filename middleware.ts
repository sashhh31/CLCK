import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Skip middleware logic for static files inside the logic (extra safeguard)
  if (/\.(png|jpg|jpeg|svg|webp|gif|ico|mp4|webm|ogg)$/i.test(path)) {
    return NextResponse.next()
  }

  const isPublicPath =
    path === '/login' ||
    path === '/signup' ||
    path === '/plans' ||
    path === '/verification' ||
    path === '/' ||
    path.startsWith('/services') ||
    path.startsWith('/pricing') ||
    path.startsWith('/plans') ||
    path.startsWith('/price') ||
    path.startsWith('/contact-us') ||
    path.startsWith('/faqs') ||
    path.startsWith('/blog-news') ||
    path.startsWith('/about-us')

  const token = request.cookies.get('token')?.value || ''

  // if (isPublicPath && token) {
  //   return NextResponse.redirect(new URL('/user', request.url))
  // }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
      Match all routes except:
      - /api/*
      - /_next/*
      - /favicon.ico
      - /images/* (for /public/images/bg-image.png and others)
    */
    '/((?!api|_next|favicon.ico|images).*)',
  ],
}
