import axios from "@/lib/axios";
import {Button} from "@/components/ui/button";
import {Ticket} from "lucide-react";
import Link from "next/link";
import {SearchMovies} from "@/components/search-movies";
import {BallsBg} from "@/components/ui/balls-bg";

export const HeroBanner = async () => {

    const lastMovie = await axios.get("/movies?last=true").then(res => res.data[0])
    
    return (
        <div className={"relative overflow-hidden lg:overflow-visible"}>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-[600px] mx-8 lg:mx-32 border-b-2 border-primary pb-12 mb-12">
                <div className={"flex flex-col justify-between"}>
                    <div>
                        <h1 className="text-white text-7xl lg:text-8xl font-bold mt-24">{lastMovie?.name}</h1>

                        <Button className={"flex gap-2 items-center w-full h-auto py-2 text-lg rounded-2xl mt-8"}
                                asChild>
                            <Link href={`/movie/${lastMovie?.id}`}>
                                <Ticket/>
                                Réserver une séance
                            </Link>
                        </Button>

                    </div>

                    <SearchMovies/>

                </div>
                    <img src={lastMovie?.image} alt={lastMovie?.name} className={"mx-auto relative rounded-xl z-40 hidden lg:block max-w-[400px] max-h-[500px]"}/>

            </div>
            <div className="absolute w-[900px] -left-96 -top-60 -z-50">
                <BallsBg/>
            </div>
        </div>
    )
}