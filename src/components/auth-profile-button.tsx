"use client"

import {useSession} from "next-auth/react";
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "./ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";
import {ChevronDown, GanttChart, LogOut, User} from "lucide-react";
import {useRouter} from "next/navigation";

export const AuthProfileButton = () => {
    const {data: session, status} = useSession()
    
    const router = useRouter()

    return (
        <>
            {status !== "loading" && (
                <>
                    {status === "authenticated" && session?.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <span className={"hidden md:block"}>
                                        {session?.user.email}
                                    </span>
                                    <span className={"md:hidden"}>
                                        <User />
                                    </span>
                                    <ChevronDown className="ml-2 h-4 w-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className={"cursor-pointer"} onClick={() => router.push('/admin')}>
                                        <GanttChart className="mr-2 w-5 h-5 " />
                                        Administration
                                </DropdownMenuItem>
                                <DropdownMenuItem className={"cursor-pointer"} onClick={async () => {
                                    await signOut({callbackUrl: '/'})
                                }}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Se déconnecter</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href={"/api/auth/signin"} className={"text-foreground"}>Connexion</Link>
                    )}
                </>
            )}
            
        </>
    )

}