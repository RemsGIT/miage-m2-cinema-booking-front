import NextAuth, {NextAuthConfig} from "next-auth"
import Credentials from "next-auth/providers/credentials";
import axios from "@/lib/axios";

export const authConfig = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {label: 'Adresse mail'},
                password: {label: 'Mot de passe', type: 'password'}
            },
            async authorize(credentials, req) {
                try {
                    const res = await axios
                        .post("/auth/login", {
                            email: credentials.email,
                            password: credentials.password
                        })
                    
                    if(res.status !== 200) {
                        return null;
                    }
                    
                    const user = {
                        id: res.data.user.id,
                        email: res.data.user.email,
                        token: res.data.jwt
                    }
                    
                    return user
                }
                catch (error) {
                    console.log('erreur ' + error)
                }
                return null
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({token, user}) => {
            return {...token, ...user}
        },
        session: async ({ session, token }) => {
            //@ts-ignore
            session.user = token
            return session;
        },
    },
} satisfies NextAuthConfig;

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth(authConfig);