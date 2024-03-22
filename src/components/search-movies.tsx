import {Input} from "@/components/ui/input";
import {Clapperboard} from "lucide-react";

export const SearchMovies = () => {
    return (
        <div className={" relative group transition flex items-center bg-white p-4 rounded-2xl border border-slate-300"}>
            <div className={"absolute bg-primary -left-6 p-4 rounded-xl text-foreground transition duration-300 -rotate-12 group-hover:rotate-0"}>
                <Clapperboard />
            </div>
            <input className={"ml-12 pt-2 pb-1 w-full bg-transparent border-b border-black ring-0 outline-0 placeholder-black"} placeholder={"Rechercher un film..."} />
        </div>

    )
}