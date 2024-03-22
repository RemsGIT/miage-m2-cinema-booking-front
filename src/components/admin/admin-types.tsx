import {useEffect, useState} from "react";
import {Category, Room, Type} from "@/types";
import axios from "@/lib/axios";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {CrudTable} from "@/components/admin/crud-table";
import {toast} from "sonner";
import {CreateTypeDialog} from "@/components/admin/dialogs/create-type-dialog";
import {UpdateTypeDialog} from "@/components/admin/dialogs/update-type-dialog";

export const AdminTypes = () => {
    const [types, setTypes] = useState<Type[]>([])
    const [idToUpdate, setIdToUpdate] = useState()

    useEffect(() => {
        axios.get("/types")
            .then(res => res.data)
            .then(res => {
                setTypes(res)
            })
    }, []);

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({row}) => <p>{row.getValue('id')}</p>,
        },
        {
            accessorKey: "name",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nom
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            cell: ({row}) => <div>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "price",
            header: "Prix",
            cell: ({row}) => <p>{row.getValue('price')} €</p>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({row}: { row: any }) => {
                const {slug} = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setIdToUpdate(row.getValue('id'))}>
                                Éditer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={(e) => handleDeleteType(row.getValue('id'))}>
                                <div className={"w-full"}>
                                    Supprimer
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const handleAddType = (type: Type) => {
        const updatedTypes = [...types];
        updatedTypes.push(type);

        setTypes(updatedTypes);

        toast.success('Le type a bien été créé')

    }

    const handleUpdateType = (type: Type) => {
        const updatedTypes = [...types];

        const index = updatedTypes.findIndex(m => m.id === type.id);
        if (index !== -1) {
            updatedTypes[index] = type;

            setTypes(updatedTypes);

            toast.success('Le type a bien été modifié')

        }
        setIdToUpdate(undefined)
    }

    const handleDeleteType = (id: number) => {
        // delete the entity from backend
        axios
            .delete(`/types/${id}`)
            .then(res => {
                if(res.status === 200) {
                    const updatedTypes = [...types];

                    const index = updatedTypes.findIndex(category => category.id === id);

                    if (index !== -1) {
                        updatedTypes.splice(index, 1);
                        setTypes(updatedTypes);
                        toast.success('Le type a bien été supprimé');
                    }
                }
            })

    }

    return (
        <div className={"text-foreground w-5/6 mx-auto mt-6"}>
            <CreateTypeDialog onAdd={handleAddType} />
            
            <UpdateTypeDialog isOpen={!!idToUpdate} id={idToUpdate} onClose={() => setIdToUpdate(undefined)} handleUpdate={handleUpdateType} />

            <CrudTable props={{columns, data: types, search: {active: true, byField: 'name'}}}/>
        </div>
    )
}