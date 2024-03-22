import NextAuth from "next-auth";
import {authConfig} from "@//auth";

const {auth} = NextAuth(authConfig);

export default auth((req): any => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    
    if(nextUrl.pathname.startsWith("/admin")) {
        if (!isLoggedIn) {
            return Response.redirect(new URL('/api/auth/signin', nextUrl))
        }
    }

    return null;
})

export const config = {
    matcher: ['/admin'],
}
