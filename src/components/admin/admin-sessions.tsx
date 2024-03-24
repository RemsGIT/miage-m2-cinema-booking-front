import {useEffect, useState} from "react";
import {Category, Movie, Session} from "@/types";
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
import {CreateSessionDialog} from "@/components/admin/dialogs/create-session-dialog";
import {toast} from "sonner";
import {UpdateSessionDialog} from "@/components/admin/dialogs/update-session-dialog";
import {useRouter} from "next/navigation";

export const AdminSessions = () => {
    const [sessions, setSessions] = useState<Session[]>([])
    const [idToUpdate, setIdToUpdate] = useState()
    
    const router = useRouter()

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
            //@ts-ignore
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
            //@ts-ignore
            cell: ({row}) => <p>{row.getValue('room')?.name}</p>,
        },
        {
            accessorKey: "type",
            header: "Type",
            //@ts-ignore
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
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/admin/session/${row.getValue('id')}`)}>
                                Voir les tickets
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIdToUpdate(row.getValue('id'))}>
                                Éditer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={(e) => handleDeleteSession(row.getValue('id'))}>
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

    const handleAddSession = (session: Session) => {
        const updatedSessions = [...sessions];
        updatedSessions.push(session);

        setSessions(updatedSessions);

        toast.success('La séance a bien été créée')

    }

    const handleUpdateSession = (session: Session) => {
        const updatedMovies = [...sessions];

        const index = updatedMovies.findIndex(m => m.id === session.id);
        if (index !== -1) {
            updatedMovies[index] = session;

            setSessions(updatedMovies);

            toast.success('La séance a bien été modifiée')

        }
        setIdToUpdate(undefined)
    }

    const handleDeleteSession = (id: number) => {

        // delete the movie from backend
        axios
            .delete(`/sessions/${id}`)
            .then(res => {
                console.log(res)
                if(res.status === 200) {
                    const updatedSessions = [...sessions];

                    const index = updatedSessions.findIndex(movie => movie.id === id);

                    if (index !== -1) {
                        updatedSessions.splice(index, 1);
                        setSessions(updatedSessions);
                        toast.success('La séance a bien été supprimée');
                    }
                }
            })

    }

    return (
        <div className={"text-foreground w-5/6 mx-auto mt-6"}>
            <CreateSessionDialog onAdd={handleAddSession} />
            
            <UpdateSessionDialog isOpen={!!idToUpdate} id={idToUpdate} onClose={() => setIdToUpdate(undefined)} handleUpdate={handleUpdateSession} />

            <CrudTable props={{columns, data: sessions, search: {active: false}}}/>
        </div>
    )
}