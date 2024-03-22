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
import {Category, Movie} from "@/types";
import {MovieForm} from "@/components/admin/forms/movie-form";
import {CategoryForm} from "@/components/admin/forms/category-form";

export const UpdateCategoryDialog = ({isOpen, id, onClose, handleUpdate}:{isOpen: boolean, id : number | undefined, onClose: () => void, handleUpdate: (category: Category) => void}) => {
    const [category, setCategory] = useState<Category>()
    
    const [open, setOpen] = useState(isOpen)

    const {data: session, status} = useSession()

    useEffect(() => {
        if(id) {
            axios.get(`/categories/${id}`)
                .then(res => res.data)
                .then(res => {
                    setCategory(res)
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
            name: data.name
        }
        axios.put(`/categories/${id}`, JSON.stringify(body), requestOptions)
            .then(res => res.data)
            .then(res => {
                handleUpdate({
                    id: res.id,
                    name: res.name,
                })
                setOpen(false)
            })
    }
    
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={"text-foreground"}>
                <DialogHeader>
                    <DialogTitle>Modification {category?.name}</DialogTitle>
                </DialogHeader>
                <div>
                    {category && (
                        <CategoryForm handleSubmit={onUpdate} defaultCategory={category}  />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}