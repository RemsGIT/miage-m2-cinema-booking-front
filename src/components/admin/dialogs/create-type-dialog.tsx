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
import {Room, Type} from "@/types";
import {useState} from "react";
import {RoomForm} from "@/components/admin/forms/room-form";
import {TypeForm} from "@/components/admin/forms/type-form";

export const CreateTypeDialog = ({onAdd}:{onAdd: (type: Type) => void}) => {
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
            name: data.name,
            price: data.price
        }
        
        axios.post("/types", JSON.stringify(body), requestOptions)
            .then(res => res.data)
            .then(res => {
                onAdd({
                    id: res.id,
                    name: res.name,
                    price: res.price
                })
                setOpen(false)
            })
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button asChild onClick={() => setOpen(true)}>
                    <span>Créer un type</span>
                </Button>
            </DialogTrigger>
            <DialogContent className={"text-foreground"}>
                <DialogHeader>
                    <DialogTitle>Créer un type</DialogTitle>
                </DialogHeader>
                <div>
                    <TypeForm handleSubmit={onCreate} />
                </div>
            </DialogContent>
        </Dialog>
    )
}