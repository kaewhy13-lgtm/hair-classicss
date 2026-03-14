import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  let user = null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  const hasValidSupabase = supabaseUrl.startsWith("https://") && !supabaseUrl.includes("placeholder");

  if (hasValidSupabase) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookiesToSet: any[]) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      });
      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch {
      // Supabase unavailable — allow public routes through
    }
  }

  const { pathname } = request.nextUrl;

  // Protected routes — require authentication
  const protectedPaths = ["/dashboard", "/booking", "/hair-passport", "/salon", "/admin"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // Auth routes — redirect if already logged in
  const authPaths = ["/login", "/signup"];
  const isAuthRoute = authPaths.some((path) => pathname.startsWith(path));

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
