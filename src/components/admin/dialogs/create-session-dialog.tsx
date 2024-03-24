import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import axios from "@/lib/axios";
import {useSession} from "next-auth/react";
import {Session} from "@/types";
import {useRef, useState} from "react";
import {SessionForm} from "@/components/admin/forms/session-form";

export const CreateSessionDialog = ({onAdd}:{onAdd: (session: Session) => void}) => {
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
                id: data.movie,
            },
            room: {id: data.room},
            type: {id: data.type},
            date: data.date
        }
        
        axios.post("/sessions", JSON.stringify(body), requestOptions)
            .then(res => res.data)
            .then(res => {
                onAdd({
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button asChild onClick={() => setOpen(true)}>
                    <span>Créer une séance</span>
                </Button>
            </DialogTrigger>
            <DialogContent className={"text-foreground"}>
                <DialogHeader>
                    <DialogTitle>Créer une séance</DialogTitle>
                </DialogHeader>
                <div>
                    <SessionForm handleSubmit={onCreate} />
                </div>
            </DialogContent>
        </Dialog>
    )
}