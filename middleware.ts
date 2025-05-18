import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authService } from './app/services/api'
import axios from 'axios'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Skip middleware logic for static files
  if (/\.(png|jpg|jpeg|svg|webp|gif|ico|mp4|webm|ogg)$/i.test(path)) {
    return NextResponse.next()
  }

  // Define public paths that don't require authentication
  const isPublicPath =
    path === '/login' ||
    path === '/signup' ||
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

  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next()
  }

  // If no token and not a public path, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Check if the path starts with /admin
  // if (path.startsWith('/admin')) {
  //   try {
  //     const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '${proccess.env.NEXT_PUBLIC_APP_URL}/  '
  //     const response = await axios.get(`${baseUrl}api/users/me`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     })
      
  //     // Check if the user has admin role
  //     if (response.data?.role !== 'admin') {
  //       // If not admin, redirect to /user
  //       return NextResponse.redirect(new URL('/user', request.url))
  //     }
  //   } catch (error) {
  //     // If there's an error getting the profile (invalid token, etc.), redirect to login
  //     console.error('Error checking user profile:', error)
  //     return NextResponse.redirect(new URL('/login', request.url))
  //   }
  // }

  // For all other authenticated routes, continue
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