import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {MovieForm} from "@/components/admin/forms/movie-form";
import axios from "@/lib/axios";
import {useSession} from "next-auth/react";
import {Movie} from "@/types";
import {useRef, useState} from "react";

export const CreateMovieDialog = ({onAdd}:{onAdd: (movie: Movie) => void}) => {
    const [open, setOpen] = useState(false)
    const {data: session, status} = useSession()
    
    const onCreate = (data: any) => {

        const requestOptions = {
            headers: {
                //@ts-ignore
                'Authorization': `Bearer ${session?.user?.token}`,
                'Content-Type': 'application/json'
            }
        };
        
        const body = {
            movie: {
                name: data.name,
                description: data.description,
                release: data.release,
                duration: Number(data.duration),
                image: data.image
            },
            categoryIds: data.categories
        }
        
        axios.post("/movies", JSON.stringify(body), requestOptions)
            .then(res => res.data)
            .then(res => {
                onAdd({
                    name: res.name,
                    description: res.description,
                    release: res.release,
                    duration: res.duration,
                    image: res.image,
                    categories: res.categories,
                    id: res.id,
                })
                setOpen(false)
            })
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button asChild onClick={() => setOpen(true)}>
                    <span>Créer un film</span>
                </Button>
            </DialogTrigger>
            <DialogContent className={"text-foreground"}>
                <DialogHeader>
                    <DialogTitle>Créer un film</DialogTitle>
                </DialogHeader>
                <div>
                    <MovieForm handleSubmit={onCreate} />
                </div>
            </DialogContent>
        </Dialog>
    )
}