import axios from "@/lib/axios";
import Image from "next/image";
import {notFound} from "next/navigation";
import {Calendar, Clock10} from "lucide-react";

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {dateStyle: 'long'});
};

export const MovieDescription = async ({id}: { id: number }) => {

    const movieDescription = await axios.get(`/movies/${id}`).then(res => res.data)
    
    if(!movieDescription) return notFound()
    
    return (
        <div className={"p-4 min-h-[300px]"}>
            <div className={"grid grid-cols-3 gap-4"}>
                <img src={movieDescription.image} alt={""} width={200} height={300} className={"rounded-xl col-span-2 w-full max-w-[400px]"}/>

                <div className={"h-full grid grid-rows-3 gap-4"}>
                    <div className={"border border-secondary rounded-lg"}>
                        <div className={"h-full flex flex-col justify-center items-center"}>
                            <Clock10 className={"text-foreground mx-auto"}/>
                            <p className={"text-secondary mt-2 text-sm text-center"}>{movieDescription.categories.map((c: any) => `${c.name} `)}</p>
                        </div>
                    </div>

                    <div className={"border border-secondary rounded-lg"}>
                        <div className={"h-full flex flex-col justify-center items-center"}>
                            <Clock10 className={"text-foreground mx-auto"}/>
                            <p className={"text-secondary mt-2"}>{movieDescription.duration} min</p>
                        </div>
                    </div>

                    <div className={"border border-secondary rounded-lg"}>
                        <div className={"h-full flex flex-col justify-center items-center"}>
                            <Calendar className={"text-foreground mx-auto"}/>
                            <p className={"text-secondary mt-2 text-sm text-center"}>{formatDate(movieDescription.release)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"w-full space-y-4 text-foreground"}>
                <h1 className={"text-2xl mt-3"}>{movieDescription.name}</h1>
               
                <div>
                    <h6 className={"text-lg"}>Synopsis</h6>
                    <p className={"text-sm mt-2"}>{movieDescription.description}</p>
                </div>
            </div>
        </div>

    )

}