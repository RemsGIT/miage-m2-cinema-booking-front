import {useEffect, useState} from "react";
import {Category, Room} from "@/types";
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
import {CreateRoomDialog} from "@/components/admin/dialogs/create-room-dialog";
import {UpdateRoomDialog} from "@/components/admin/dialogs/update-room-dialog";

export const AdminRooms = () => {
    const [rooms, setRooms] = useState<Room[]>([])
    const [idToUpdate, setIdToUpdate] = useState()

    useEffect(() => {
        axios.get("/rooms")
            .then(res => res.data)
            .then(res => {
                setRooms(res)
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
            accessorKey: "capacity",
            header: "Capacité",
            cell: ({row}) => <p>{row.getValue('capacity')} personnes</p>,
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
                            <DropdownMenuItem onClick={(e) => handleDeleteRoom(row.getValue('id'))}>
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

    const handleAddRoom = (room: Room) => {
        const updatedCategories = [...rooms];
        updatedCategories.push(room);

        setRooms(updatedCategories);

        toast.success('La salle a bien été créée')

    }

    const handleUpdateRoom = (room: Room) => {
        const updatedRooms = [...rooms];

        const index = updatedRooms.findIndex(m => m.id === room.id);
        if (index !== -1) {
            updatedRooms[index] = room;

            setRooms(updatedRooms);

            toast.success('La salle a bien été modifiée')

        }
        setIdToUpdate(undefined)
    }

    const handleDeleteRoom = (id: number) => {
        // delete the entity from backend
        axios
            .delete(`/rooms/${id}`)
            .then(res => {
                if(res.status === 200) {
                    const updatedRooms = [...rooms];

                    const index = updatedRooms.findIndex(category => category.id === id);

                    if (index !== -1) {
                        updatedRooms.splice(index, 1);
                        setRooms(updatedRooms);
                        toast.success('La salle a bien été supprimée');
                    }
                }
            })

    }

    return (
        <div className={"text-foreground w-5/6 mx-auto mt-6"}>
            <CreateRoomDialog onAdd={handleAddRoom} />
            
            <UpdateRoomDialog isOpen={!!idToUpdate} id={idToUpdate} onClose={() => setIdToUpdate(undefined)} handleUpdate={handleUpdateRoom} />

            <CrudTable props={{columns, data: rooms, search: {active: true, byField: 'name'}}}/>
        </div>
    )
}