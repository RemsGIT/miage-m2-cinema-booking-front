"use client"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {motion} from "framer-motion";
import {AdminMovies} from "@/components/admin/admin-movies";
import {AdminCategories} from "@/components/admin/admin-categories";
import {AdminTypes} from "@/components/admin/admin-types";
import {AdminRooms} from "@/components/admin/admin-rooms";
import {AdminSessions} from "@/components/admin/admin-sessions";
import {useSearchParams} from "next/navigation";

export const AdminTabs = () => {
    
    const searchParams = useSearchParams()
    
    const defaultTab = searchParams.get('tab') ?? 'movies'
    
    return (
        <Tabs defaultValue={defaultTab} className={"m-4"}>
            <TabsList className={"flex  no-scrollbar overflow-auto justify-start"}>
                <TabsTrigger className={"whitespace-nowrap"} value={"movies"} >Films</TabsTrigger>
                <TabsTrigger className={"whitespace-nowrap"} value={"sessions"} >Séances</TabsTrigger>
                <TabsTrigger className={"whitespace-nowrap"} value={"rooms"} >Salles</TabsTrigger>
                <TabsTrigger className={"whitespace-nowrap"} value={"types"} >Types</TabsTrigger>
                <TabsTrigger className={"whitespace-nowrap"} value={"categories"} >Catégories</TabsTrigger>
            </TabsList>
            <TabsContent value={"movies"}>
                    <AdminMovies />
            </TabsContent>
            <TabsContent value={"sessions"}>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={"flex flex-wrap gap-4"}
                >
                    <AdminSessions />
                </motion.div>

            </TabsContent>
            <TabsContent value={"rooms"}>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={"flex flex-wrap gap-4"}
                >
                    <AdminRooms />
                </motion.div>

            </TabsContent>
            <TabsContent value={"types"}>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={"flex flex-wrap gap-4"}
                >
                    <AdminTypes />
                </motion.div>

            </TabsContent>
            <TabsContent value={"categories"}>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={"flex flex-wrap gap-4"}
                >
                    <AdminCategories />
                </motion.div>

            </TabsContent>
        </Tabs>
    )
}