"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import axios from "@/lib/axios";
import {Movie} from "@/types";
import {MovieForm} from "@/components/admin/forms/movie-form";

export const UpdateMovieDialog = ({isOpen, id, onClose, handleUpdate}:{isOpen: boolean, id : number | undefined, onClose: () => void, handleUpdate: (movie: Movie) => void}) => {
    const [movie, setMovie] = useState<Movie>()
    
    const [open, setOpen] = useState(isOpen)

    const {data: session, status} = useSession()

    useEffect(() => {
        if(id) {
            axios.get(`/movies/${id}`)
                .then(res => res.data)
                .then(res => {
                    setMovie(res)
                })
        }
    }, [id]);

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen]);

    const onUpdate = (data: any) => {
        console.log(data)

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
        axios.put(`/movies/${id}`, JSON.stringify(body), requestOptions)
            .then(res => res.data)
            .then(res => {
                handleUpdate({
                    id: res.id,
                    name: res.name,
                    description: res.description,
                    release: res.release,
                    duration: res.duration,
                    image: res.image,
                    categories: res.categories,
                })
                setOpen(false)
            })
    }
    
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={"text-foreground"}>
                <DialogHeader>
                    <DialogTitle>Modification {movie?.name}</DialogTitle>
                </DialogHeader>
                <div>
                    {movie && (
                        <MovieForm handleSubmit={onUpdate} defaultMovie={movie}  />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}