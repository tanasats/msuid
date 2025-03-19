import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "./lib/jwt";

export default async function middleware(request: NextRequest) {

    console.log("Hello Middleware()");
    const auth_token = request.cookies.get("token"); // ตรวจสอบ token ใน cookie
    const isAuthenticated = !!auth_token;
    //console.log("auth_token=", auth_token);

    const { pathname }: { pathname: string } = request.nextUrl;
    //console.log("pathname=", pathname);

    const token = request.cookies.get("token")?.value || "";
    if (!token)
        return NextResponse.redirect(new URL("/signin", request.url)); // กรณีไม่พบ token
    //console.log("token=", token);

    if (token) {
        console.log("------------ValidateJWT--------------");
        try {
            const isValid = await validateJWT(token);
            if (!isValid) {
                //return NextResponse.json({ error: 'Invalid token 1' }, { status: 401 });
                return NextResponse.redirect(new URL("/signin", request.url));
            }
            console.log("JWT Token isValid=", isValid);
        } catch (error) {
            //return NextResponse.json({ error: 'Invalid token 2' }, { status: 401 });
            return NextResponse.redirect(new URL("/signin", request.url));
        }
    }




    // ถ้ายังไม่ได้เข้าสู่ระบบและพยายามเข้าถึง / หรือ /dashboard → ส่งไปที่ /signin
    if (!isAuthenticated && (pathname === "/" || pathname.startsWith("/dashboard"))) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }
    // ถ้าเข้าสู่ระบบแล้วและพยายามเข้าถึง / → ส่งไปที่ /dashboard
    if (isAuthenticated && pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }



    return NextResponse.next();
}

export const config = {
    //matcher: ["/dashboard/:path*", "/profile/:path*"], // ป้องกันหน้า Dashboard และ Profile
    matcher: [
        "/",
        "/dashboard/:path*",
    ],
};