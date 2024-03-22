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
import {Type} from "@/types";
import {TypeForm} from "@/components/admin/forms/type-form";

export const UpdateTypeDialog = ({isOpen, id, onClose, handleUpdate}:{isOpen: boolean, id : number | undefined, onClose: () => void, handleUpdate: (type: Type) => void}) => {
    const [type, setType] = useState<Type>()
    
    const [open, setOpen] = useState(isOpen)

    const {data: session, status} = useSession()

    useEffect(() => {
        if(id) {
            axios.get(`/types/${id}`)
                .then(res => res.data)
                .then(res => {
                    setType(res)
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
            price: data.price
        }
        
        axios.put(`/types/${id}`, JSON.stringify(body), requestOptions)
            .then(res => res.data)
            .then(res => {
                handleUpdate({
                    id: res.id,
                    name: res.name,
                    price: res.price
                })
                setOpen(false)
            })
    }
    
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={"text-foreground"}>
                <DialogHeader>
                    <DialogTitle>Modification {type?.name}</DialogTitle>
                </DialogHeader>
                <div>
                    {type && (
                        <TypeForm handleSubmit={onUpdate} defaultType={type}  />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}