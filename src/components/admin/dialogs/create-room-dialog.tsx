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
import {Room} from "@/types";
import {useState} from "react";
import {RoomForm} from "@/components/admin/forms/room-form";

export const CreateRoomDialog = ({onAdd}:{onAdd: (room: Room) => void}) => {
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
            capacity: data.capacity
        }
        
        axios.post("/rooms", JSON.stringify(body), requestOptions)
            .then(res => res.data)
            .then(res => {
                onAdd({
                    id: res.id,
                    name: res.name,
                    capacity: res.capacity
                })
                setOpen(false)
            })
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button asChild onClick={() => setOpen(true)}>
                    <span>Créer une salle</span>
                </Button>
            </DialogTrigger>
            <DialogContent className={"text-foreground"}>
                <DialogHeader>
                    <DialogTitle>Créer une salle</DialogTitle>
                </DialogHeader>
                <div>
                    <RoomForm handleSubmit={onCreate} />
                </div>
            </DialogContent>
        </Dialog>
    )
}