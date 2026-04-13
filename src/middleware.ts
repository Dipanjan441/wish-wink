import { NextResponse, type NextRequest } from 'next/server'
import { ROUTES, ROUTE_GROUPS } from '@/constants/routes'
import { createSupabaseServerClientForMiddleware } from '@/lib/supabase/server'
import { USER_ROLES } from '@/constants/auth'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const { pathname, search } = req.nextUrl
  console.log('pathname', pathname)
  //Get user
  const {
    data
  } = await createSupabaseServerClientForMiddleware(req).auth.getUser();
  const {user} = data;

  const isLoggedIn = !!user

  //Route checks
  const isAuthRoute = ROUTE_GROUPS.AUTH.some(route =>
    pathname.startsWith(route)
  )

  const isProtectedRoute = ROUTE_GROUPS.PROTECTED.some(route =>
    pathname.startsWith(route)
  )

  const isAdminRoute = ROUTE_GROUPS.ADMIN.some(route =>
    pathname.startsWith(route)
  )

  // 1. Not logged in → trying protected route
  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = new URL(ROUTES.LOGIN, req.url)

    loginUrl.searchParams.set(
      'redirect',
      pathname + search
    )
    return NextResponse.redirect(loginUrl)
  }

  // 2. Logged in → trying auth pages (login/signup)
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(
      new URL(ROUTES.HOME, req.url)
    )
  }

  // 3. Admin route protection
  if (isAdminRoute) {
    if (!isLoggedIn) {
      const loginUrl = new URL(ROUTES.LOGIN, req.url)

      loginUrl.searchParams.set(
        'redirect',
        pathname + search
      )
      return NextResponse.redirect(loginUrl)
    }

    // Role check (basic version)
    const role = user?.user_metadata?.role

    if (role !== USER_ROLES.ADMIN) {
      return NextResponse.redirect(
        //notify user that you are not admin
        new URL(ROUTES.PROFILE, req.url)
      )
    }
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|\\.well-known).*)',
  ],
}