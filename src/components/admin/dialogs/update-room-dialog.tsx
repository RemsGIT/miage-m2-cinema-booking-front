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
import { Room} from "@/types";
import {RoomForm} from "@/components/admin/forms/room-form";

export const UpdateRoomDialog = ({isOpen, id, onClose, handleUpdate}:{isOpen: boolean, id : number | undefined, onClose: () => void, handleUpdate: (room: Room) => void}) => {
    const [room, setRoom] = useState<Room>()
    
    const [open, setOpen] = useState(isOpen)

    const {data: session, status} = useSession()

    useEffect(() => {
        if(id) {
            axios.get(`/rooms/${id}`)
                .then(res => res.data)
                .then(res => {
                    setRoom(res)
                })
        }
    }, [id]);

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen]);

    const onUpdate = (data: any) => {
        const requestOptions = {
            headers: {
                //@ts-ignore
                'Authorization': `Bearer ${session?.user?.token}`,
                'Content-Type': 'application/json'
            }
        };

        const body = {
            name: data.name,
            capacity: data.capacity
        }
        
        axios.put(`/rooms/${id}`, JSON.stringify(body), requestOptions)
            .then(res => res.data)
            .then(res => {
                handleUpdate({
                    id: res.id,
                    name: res.name,
                    capacity: res.capacity
                })
                setOpen(false)
            })
    }
    
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={"text-foreground"}>
                <DialogHeader>
                    <DialogTitle>Modification {room?.name}</DialogTitle>
                </DialogHeader>
                <div>
                    {room && (
                        <RoomForm handleSubmit={onUpdate} defaultRoom={room}  />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}