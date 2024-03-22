"use client"

import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, MapPinned, MoreHorizontal} from "lucide-react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {CrudTable} from "@/components/admin/crud-table";
import axios from "@/lib/axios";
import {useEffect, useState} from "react";
import {Category, Movie} from "@/types";
import {toast} from "sonner";
import {CreateCategoryDialog} from "@/components/admin/dialogs/create-category-dialog";
import {UpdateCategoryDialog} from "@/components/admin/dialogs/update-category-dialog";

export const AdminCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [idToUpdate, setIdToUpdate] = useState()

    useEffect(() => {
        axios.get("/categories")
            .then(res => res.data)
            .then(res => {
                setCategories(res)
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
                            <DropdownMenuItem onClick={(e) => handleDeleteCategory(row.getValue('id'))}>
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

    const handleAddCategory = (category: Category) => {
        const updatedCategories = [...categories];
        updatedCategories.push(category);

        setCategories(updatedCategories);

        toast.success('La catégorie a bien été créée')

    }

    const handleUpdateCategory = (category: Category) => {
        const updatedCategories = [...categories];

        const index = updatedCategories.findIndex(m => m.id === category.id);
        if (index !== -1) {
            updatedCategories[index] = category;

            setCategories(updatedCategories);

            toast.success('La catégorie a bien été modifiée')

        }
        setIdToUpdate(undefined)
    }

    const handleDeleteCategory = (id: number) => {
        // delete the entity from backend
        axios
            .delete(`/categories/${id}`)
            .then(res => {
                if(res.status === 200) {
                    const updatedCategories = [...categories];

                    const index = updatedCategories.findIndex(category => category.id === id);

                    if (index !== -1) {
                        updatedCategories.splice(index, 1);
                        setCategories(updatedCategories);
                        toast.success('La catégorie a bien été supprimée');
                    }
                }
            })
        
    }

    return (
        <div className={"text-foreground w-5/6 mx-auto mt-6"}>
            <CreateCategoryDialog onAdd={handleAddCategory} />
            
            <UpdateCategoryDialog isOpen={!!idToUpdate} id={idToUpdate} onClose={() => setIdToUpdate(undefined)} handleUpdate={handleUpdateCategory} />

            <CrudTable props={{columns, data: categories, search: {active: true, byField: 'name'}}}/>
        </div>
    )
}