import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const pathname = req.nextUrl.pathname;
    const urlOrigin = req.nextUrl.origin;

    // Restrict access to admin routes if the user is not an admin
    if (pathname.includes("/admin") && !token?.isAdmin) {
        return NextResponse.redirect(urlOrigin);
    }

    // Restrict access to company routes if the user is not a company
    if (pathname.includes("/company") && !token?.isCompany) {
        return NextResponse.redirect(urlOrigin);
    }

    // Redirect to login if the user is not authenticated and trying to access a restricted page
    if (!pathname.includes("/login") && !pathname.includes("/signup") && !token) {
        return NextResponse.redirect(`${urlOrigin}/login`);
    }

    // Redirect logged-in users away from login/signup pages
    if ((pathname.includes("/login") || pathname.includes("/signup")) && token) {
        return NextResponse.redirect(urlOrigin);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/create",
        "/details/((?!general).*)",
        "/reservations",
        "/catalog",
        "/",
        "/login",
        "/signup",
        "/success-page",
        "/admin/dashboard",
        "/admin/users",
        "/admin/reservations",
        "/admin/listings",
        "/company/dashboard",
        "/company/listings",
        "/company/reservations",
    ],
};
