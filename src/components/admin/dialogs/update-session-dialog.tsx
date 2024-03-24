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
import {Movie, Session} from "@/types";
import {MovieForm} from "@/components/admin/forms/movie-form";
import {SessionForm} from "@/components/admin/forms/session-form";

export const UpdateSessionDialog = ({isOpen, id, onClose, handleUpdate}:{isOpen: boolean, id : number | undefined, onClose: () => void, handleUpdate: (session: Session) => void}) => {
    const [session, setSession] = useState<Session>()
    
    const [open, setOpen] = useState(isOpen)

    const {data: sessionUser, status} = useSession()

    useEffect(() => {
        if(id) {
            axios.get(`/sessions/${id}`)
                .then(res => res.data)
                .then(res => {
                    setSession(res)
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
                'Authorization': `Bearer ${sessionUser?.user?.token}`,
                'Content-Type': 'application/json'
            }
        };

        const body = {
            movie: {
                id: data.movie,
            },
            room: {id: data.room},
            type: {id: data.type},
            date: data.date
        }
        axios.put(`/sessions/${id}`, JSON.stringify(body), requestOptions)
            .then(res => res.data)
            .then(res => {
                handleUpdate({
                    id: res.id,
                    movie: res.movie,
                    room: res.room,
                    type: res.type,
                    date: res.date
                })
                setOpen(false)
            })
    }
    
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={"text-foreground"}>
                <DialogHeader>
                    <DialogTitle>Modification {session?.id}</DialogTitle>
                </DialogHeader>
                <div>
                    {session && (
                        <SessionForm handleSubmit={onUpdate} defaultSession={session}  />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}