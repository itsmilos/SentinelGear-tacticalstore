import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET!)
        );

        if (req.nextUrl.pathname.startsWith("/admin")) {
            if (payload.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};