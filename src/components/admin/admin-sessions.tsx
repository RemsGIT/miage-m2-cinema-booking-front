import {useEffect, useState} from "react";
import {Category} from "@/types";
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

export const AdminSessions = () => {
    const [sessions, setSessions] = useState<[]>([])

    useEffect(() => {
        axios.get("/sessions")
            .then(res => res.data)
            .then(res => {
                setSessions(res)
            })
    }, []);

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({row}) => <p>{row.getValue('id')}</p>,
        },
        {
            accessorKey: "movie",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Film
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            cell: ({row}) => <div>{row.getValue("movie")?.name}</div>,
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: ({row}) => <p>{row.getValue('date')}</p>,
        },
        {
            accessorKey: "room",
            header: "Salle",
            cell: ({row}) => <p>{row.getValue('room')?.name}</p>,
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({row}) => <p>{row.getValue('type')?.name}</p>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({row}: { row: any }) => {
                const {slug} = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0" asChild>
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => window.location.assign(`/admin/partners/${slug}/edit`)} className={"cursor-pointer"}>
                                Éditer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
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

    return (
        <div className={"text-foreground w-5/6 mx-auto mt-6"}>
            <Button>Ajouter une séance</Button>

            <CrudTable props={{columns, data: sessions, search: {active: false}}}/>
        </div>
    )
}