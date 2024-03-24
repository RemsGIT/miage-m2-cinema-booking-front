"use client"

import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, Eye, FileText, MapPinned, MoreHorizontal} from "lucide-react";
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
import {CreateMovieDialog} from "@/components/admin/dialogs/create-movie-dialog";
import {useRouter} from "next/navigation";
import {UpdateMovieDialog} from "@/components/admin/dialogs/update-movie-dialog";
import {toast} from "sonner";

export const AdminMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [idToUpdate, setIdToUpdate] = useState()
    
    const router = useRouter()
    
    useEffect(() => {
         axios.get("/movies")
             .then(res => res.data)
             .then(res => {
                 setMovies(res)
             })
    }, []);
    
    const handleAddMovie = (movie: Movie) => {
       const updatedMovies = [...movies];
        updatedMovies.push(movie);
        
        setMovies(updatedMovies);
        
        toast.success('Le film a bien été créé')
        
    }
    
    const handleUpdateMovie = (movie: Movie) => {
        const updatedMovies = [...movies];
        
        const index = updatedMovies.findIndex(m => m.id === movie.id);
        if (index !== -1) {
            updatedMovies[index] = movie;

            setMovies(updatedMovies);

            toast.success('Le film a bien été modifié')

        }
        setIdToUpdate(undefined)
    }
    
    const handleDeleteMovie = (id: number) => {
        
        // delete the movie from backend
        axios
            .delete(`/movies/${id}`)
            .then(res => {
                if(res.status === 200) {
                    const updatedMovies = [...movies];

                    const index = updatedMovies.findIndex(movie => movie.id === id);

                    if (index !== -1) {
                        updatedMovies.splice(index, 1);
                        setMovies(updatedMovies);
                        toast.success('Le film a bien été supprimé');
                    }
                }
            })

    }
    
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
            accessorKey: "image",
            header: "Image",
            cell: ({row}) => <div className="lowercase">
                <img src={`${row.getValue("image")}`}  width={60} height={200}/>
            </div>,
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({row}) => (
                <Dialog>
                    <DialogTrigger>
                        <Button variant={"outline"} size={"icon"}>
                            <Eye />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className={"max-w-max lg:max-w-2 lg:min-w-[800px] text-foreground"}>
                        <p>{row.getValue('description')}</p>
                    </DialogContent>
                </Dialog>
            ),
        },
        {
            accessorKey: "categories",
            header: "Catégorie",
            cell: ({row}) => <div>{(row.getValue("categories") as any)?.map((c: Category) => c.name).join(', ')}</div>,
        },
        {
            accessorKey: "release",
            header: "Sortie",
            cell: ({row}) => <div>{row.getValue("release")}</div>,
        },
        {
            accessorKey: "duration",
            header: "Durée",
            cell: ({row}) => <div>{row.getValue("duration")}min</div>,
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
                            <DropdownMenuItem onClick={(e) => handleDeleteMovie(row.getValue('id'))}>
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
            <CreateMovieDialog onAdd={handleAddMovie}  />

            <UpdateMovieDialog isOpen={!!idToUpdate} id={idToUpdate} onClose={() => setIdToUpdate(undefined)} handleUpdate={handleUpdateMovie} />
            
            <CrudTable props={{columns, data: movies, search: {active: true, byField: 'name'}}}/>
        </div>
    )
}