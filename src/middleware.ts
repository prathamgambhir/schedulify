// export { auth as middleware } from "@/auth"

import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

const PROTCTED_PATHS = ["/dashboard", "/events", "availability", "meetings"]

export default auth( async(req: NextRequest) => {
    const { pathname }= req.nextUrl;    
    const session = await auth();
    
    const isProtected = PROTCTED_PATHS.some((path) => pathname.startsWith(path))
    
    if(isProtected && !session?.user){
        const loginUrl = new URL("/login", req.nextUrl.origin);
        loginUrl.searchParams.set("/callbackurl", req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }
    
    if(pathname === "/login" && session?.user){
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
    
    if(pathname ===  "/signup" && session?.user){
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
    
    return NextResponse.next()
})

export const config = {
    matcher: 
    [
        "/dashboard/:path*", 
        "/events/:path*", 
        "/availability/:path*", 
        "/meetings/:path*", 
        "/((?!api|_next/static|_next/image|.*\\.png$).*)"
    ]
}