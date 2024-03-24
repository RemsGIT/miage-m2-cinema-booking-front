import axios from "@/lib/axios";
import {Metadata} from "next";
import Link from "next/link";
import {SearchMovies} from "@/components/search-movies";

export const metadata: Metadata = {
    title: 'Liste des films | InstantCiné',
    description: 'InstantCiné, Pour une réservation rapide et instantannée',

}

const MoviesPage = async () => {
    const movies = await axios.get("/movies").then(res => res.data)
    
    return (
        <>
            
            <div className={"w-1/2 mx-auto mt-8"}>
                <SearchMovies />
            </div>

            <div className={"flex flex-wrap gap-4 items-stretch mt-8 sm:m-12 justify-center"}>
                {movies.map((movie: any, index: any) => (
                    <Link href={`/movie/${movie.id}`} className={"w-[120px] sm:w-[250px]"} key={index}>
                        <img src={movie.image} key={index}
                             className={"w-full h-full rounded-xl transition duration-300 hover:scale-105"}/>
                    </Link>
                ))}
            </div>
        </>

    )
}

export default MoviesPage