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
import {Category} from "@/types";
import {useState} from "react";
import {CategoryForm} from "@/components/admin/forms/category-form";

export const CreateCategoryDialog = ({onAdd}:{onAdd: (category: Category) => void}) => {
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
            name: data.name
        }
        
        axios.post("/categories", JSON.stringify(body), requestOptions)
            .then(res => res.data)
            .then(res => {
                onAdd({
                    id: res.id,
                    name: res.name,
                })
                setOpen(false)
            })
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button asChild onClick={() => setOpen(true)}>
                    <span>Créer une catégorie</span>
                </Button>
            </DialogTrigger>
            <DialogContent className={"text-foreground"}>
                <DialogHeader>
                    <DialogTitle>Créer une catégorie</DialogTitle>
                </DialogHeader>
                <div>
                    <CategoryForm handleSubmit={onCreate} />
                </div>
            </DialogContent>
        </Dialog>
    )
}