"use client"

import {useEffect, useState} from "react";
import {fetcherGET} from "@/lib/fetcher";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Category, Movie} from "@/types";
import {motion} from "framer-motion";

import 'swiper/css';
import 'swiper/css/free-mode';
import Link from "next/link";

export const MoviesByCategory = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [movies, setMovies] = useState<Movie[]>([])


    useEffect(() => {
        fetcherGET("/movies?last=true").then(movies => setMovies(movies))
        fetcherGET("/categories").then((categories: Category[]) => setCategories(categories))

    }, []);

    const getMoviesByCategory = (categorySearch: string): Movie[] => movies
        .filter(movie => movie.categories.some(category => category.name === categorySearch))
    
    return (
        <>
            {categories.length && (
                <Tabs defaultValue={categories[0].name}>
                    <TabsList className={"flex  no-scrollbar overflow-auto justify-start"}>
                        {categories.map(category => (
                            <TabsTrigger className={"whitespace-nowrap"} value={category.name} key={category.id}>{category.name}</TabsTrigger>
                        ))}
                    </TabsList>
                    {categories.map(category => (
                        <TabsContent value={category.name} key={category.id}>
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className={"flex flex-wrap gap-4"}
                            >
                                {getMoviesByCategory(category.name).map(movie => (
                                    <Link href={`/movie/${movie.id}`} key={movie.id}>
                                        <img src={movie.image} alt={movie.name}
                                             className={"w-[170px] md:w-[200px] h-[230px] md:h-[300px] object-cover rounded-lg cursor-pointer transition hover:scale-105"}/>
                                    </Link>
                                ))}
                            </motion.div>

                        </TabsContent>
                        ))}
                </Tabs>
            )}

        </>

    )
}