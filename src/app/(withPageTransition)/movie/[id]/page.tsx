import {MovieDescription} from "@/components/movie/movie-description";
import {TicketSessions} from "@/components/ticket/ticket-sessions";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {BuyTicketButton} from "@/components/buy-ticket-button";

const MoviePage = ({params}:{params: {id: number}}) => {
    return (
        <div className={"mx-2 md:mx-24"}>
            
            <div className={"mx-4 grid grid-cols-3 mt-6"}>
                <Link href={"/"}>
                    <ArrowLeft className={"text-foreground"} />
                </Link>
                <h3 className={"text-foreground text-xl col-span-2"}>Détail du film</h3>
            </div>
            
            <div className={"mt-2"}>
                <MovieDescription id={params.id} />
            </div>
            
            <div className={"mx-2 mt-12"}>
                <BuyTicketButton movie_id={params.id} />
            </div>
        </div>
    )
}

export default MoviePage