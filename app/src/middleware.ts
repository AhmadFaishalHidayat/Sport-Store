import { cookies, headers } from "next/headers";
import { verifyJose } from "./db/helpers/jwt";
import { NextRequest, NextResponse } from "next/server";
import { string } from "zod";

export async function middleware(request: NextRequest) {
    const authorization = cookies().get("Authorization");
    console.log(authorization);
    
    if (request.nextUrl.pathname.startsWith('/wishlists')) {
        if (!authorization?.value) {
            return NextResponse.redirect(new URL("/login", request.url));
        }        
    }
    if (request.nextUrl.pathname.startsWith('/login')) {
        let checkCookies = request.cookies.get("Authorization")
        if (checkCookies) {
            return NextResponse.redirect(new URL("/wishlists", request.url));
        }
        return NextResponse.next();        
    }

    if (request.nextUrl.pathname.startsWith('/api/wishlists')) {
        if (!authorization?.value) {
            return Response.json(
                {
                    err: "Unauthorized"
                },
                {
                    status: 401,
                }
            );
        }
        const [Bearer, token] = authorization.value.split(" ");
        if (Bearer !== "Bearer") {
            return Response.json(
                {
                    err: "Invalid Token"
                },
                {
                    status: 401
                }
            );
        }
        // const decoded = jwtVerify(token);
        // console.log(decoded);
        const decoded = await verifyJose<{
            _id: string;
            email: string;
        }>(token);

        // decoded diapain
        console.log(decoded);
        
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-mail", decoded.email)
        requestHeaders.set("x-id", decoded._id)

        //you can also set request headers in NextResponse.rewrite
        const response = NextResponse.next(
            {
                request: {
                    headers: requestHeaders,
                },
            }
        )

        return response
    }
}

//See "Matching Paths" below to learn more
export const config = {
    matcher: ["/api/wishlists/:path", "/wishlists"],
};