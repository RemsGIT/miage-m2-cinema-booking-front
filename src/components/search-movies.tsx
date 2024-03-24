"use client"

import {Clapperboard} from "lucide-react";
import React, {useState} from "react";
import axios from "@/lib/axios";
import {Movie} from "@/types";
import Link from "next/link";

export const SearchMovies = () => {
    const [searchResults, setSearchResults] = useState<Movie[]>([]);

    const onSearchMovie = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value;
        
        if(searchQuery.trim() === "") {
            setSearchResults([])
            return
        }
        
        try {
            const response: Movie[] = await axios.get(`/movies/search?name=${searchQuery}`).then(res => res.data);
            setSearchResults(response);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    }
    
    return (
        <div
            className={" relative group transition flex items-center bg-white p-4 rounded-2xl border border-slate-300"}>
            <div
                className={"absolute bg-primary -left-6 p-4 rounded-xl text-foreground transition duration-300 -rotate-12 group-hover:rotate-0"}>
                <Clapperboard/>
            </div>
            <input
                className={"ml-12 pt-2 pb-1 w-full bg-transparent border-b border-black ring-0 outline-0 placeholder-black"}
                placeholder={"Rechercher un film..."}                 onInput={onSearchMovie}
            />
            <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 shadow-lg z-50 rounded-b-2xl">
                {searchResults.map(movie => (
                    <Link href={`/movie/${movie.id}`} key={movie.id} className="flex items-center p-2 hover:bg-gray-200 rounded-b-2xl">
                        <img src={movie.image} alt={movie.name} className="w-12 mr-2"/>
                        <span>{movie.name}</span>
                    </Link>
                ))}
            </div>
        </div>

    )
}