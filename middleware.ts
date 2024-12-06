import { auth } from "./lib/lucia";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Define protected routes
    const protectedRoutes = ["/dashboard", "/profile"];

    // Check if the request is for a protected route
    if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
        const sessionCookie = req.cookies.get("auth_session");
        if (!sessionCookie) {
            // Redirect to login if session doesn't exist
            url.pathname = "/auth/login";
            return NextResponse.redirect(url);
        }

        try {
            // Validate session
            const session = await auth.validateSession(sessionCookie.value);
            req.nextUrl.searchParams.set("userId", session.userId); // Pass user ID to the request
            return NextResponse.next();
        } catch (error) {
            // Redirect to login if session validation fails
            url.pathname = "/auth/login";
            return NextResponse.redirect(url);
        }
    }

    // Allow requests to non-protected routes
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"], // Add all protected routes here
};
