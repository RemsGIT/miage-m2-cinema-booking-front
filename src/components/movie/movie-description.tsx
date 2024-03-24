import axios from "@/lib/axios";
import Image from "next/image";
import {notFound} from "next/navigation";
import {Calendar, Clock, Clock10, Drama, GanttChart, Hourglass} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Movie} from "@/types";
import {BuyTicketButton} from "@/components/buy-ticket-button";

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {dateStyle: 'long'});
};

export const MovieDescription = async ({id}: { id: number }) => {

    const movieDescription: Movie = await axios.get(`/movies/${id}`).then(res => res.data)
    
    if(!movieDescription) return notFound()
    
    return (
        <div className={"p-4 min-h-[300px]"}>
            <div className={"grid grid-cols-3 gap-4 lg:grid-cols-2 lg:flex lg:gap-12"}>
                <img src={movieDescription.image} alt={""} width={200} height={300} className={"rounded-xl col-span-2 lg:col-span-1 w-full max-w-[400px]"}/>

                <div className={"hidden lg:block"}>
                    <h1 className={"text-5xl text-foreground "}>{movieDescription.name}</h1>
                    <div className={"space-x-2 mt-6"}>
                        {movieDescription.categories.map((c: any) => (
                            <Badge className={"text-lg"} variant={"secondary"} key={c.id}>{c.name}</Badge>
                        ))}
                    </div>

                    <div className={"mt-6 flex gap-12"}>
                        <div className={"flex items-center gap-2"}>
                            <span className={"bg-amber-400 max-w-max p-1 rounded-full"}>
                                <Hourglass/>
                            </span>
                            <span className={"text-foreground"}>{movieDescription.duration} min</span>
                        </div>

                        <div className={"flex items-center gap-2"}>
                            <span className={"bg-amber-400 max-w-max p-1 rounded-full"}>
                                <Calendar/>
                            </span>
                            <span className={"text-foreground"}>{formatDate(movieDescription.release.toString())}</span>
                        </div>

                    </div>

                    <div className={"mt-8 text-foreground"}>
                        <p className={"text-lg mt-2"}>{movieDescription.description}</p>
                    </div>

                    <div className={"mt-28 w-1/2"}>
                        <BuyTicketButton movie_id={movieDescription.id}/>
                    </div>
                </div>


                <div className={"h-full grid grid-rows-3 gap-4 lg:hidden"}>
                    <div className={"border border-secondary rounded-lg"}>
                        <div className={"h-full flex flex-col justify-center items-center"}>
                            <Drama className={"text-foreground mx-auto"}/>
                            <p className={"text-secondary mt-2 text-sm text-center"}>{movieDescription.categories.map((c: any) => `${c.name} `)}</p>
                        </div>
                    </div>

                    <div className={"border border-secondary rounded-lg"}>
                        <div className={"h-full flex flex-col justify-center items-center"}>
                            <Hourglass className={"text-foreground mx-auto"}/>
                            <p className={"text-secondary mt-2"}>{movieDescription.duration} min</p>
                        </div>
                    </div>

                    <div className={"border border-secondary rounded-lg"}>
                        <div className={"h-full flex flex-col justify-center items-center"}>
                            <Calendar className={"text-foreground mx-auto"}/>
                            <p className={"text-secondary mt-2 text-sm text-center"}>{formatDate(movieDescription.release.toString())}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"w-full space-y-4 text-foreground lg:hidden"}>
                <h1 className={"text-2xl mt-3"}>{movieDescription.name}</h1>
               
                <div>
                    <h6 className={"text-lg"}>Synopsis</h6>
                    <p className={"text-sm mt-2"}>{movieDescription.description}</p>
                </div>
            </div>
        </div>

    )

}