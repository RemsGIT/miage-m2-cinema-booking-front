import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {Movie, Room, Session, Type} from "@/types";
import {Option} from "@/components/ui/multiple-selector";
import axios from "@/lib/axios";
import {Autocomplete, AutocompleteOption} from "@/components/ui/autocomplete";

const formSchema = z.object({
    movie: z.string(),
    type: z.string(),
    room: z.string(),
    date: z.string().min(10, "Entrez une date valide"),
})

export const SessionForm = ({handleSubmit, defaultSession}:{handleSubmit: (data: any) => void, defaultSession?: Session}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [movies, setMovies] = useState<AutocompleteOption[]>([])
    const [types, setTypes] = useState<AutocompleteOption[]>([])
    const [rooms, setRooms] = useState<AutocompleteOption[]>([])
    
    const [defaultMovie, setDefaultMovie] = useState<AutocompleteOption>()
    const [defaultType, setDefaultType] = useState<AutocompleteOption>()
    const [defaultRoom, setDefaultRoom] = useState<AutocompleteOption>()

    useEffect(() => {
        if(defaultSession) {
            console.log(defaultSession.date)
            form.setValue("date", new Date(defaultSession.date).toISOString().slice(0, 16));
            form.setValue("movie", defaultSession.movie.id.toString() )
            form.setValue("room", defaultSession.room.id.toString() )
            form.setValue("type", defaultSession.type.id.toString() )
            
            setDefaultMovie({
                label: defaultSession.movie.name,
                value: defaultSession.movie.id.toString()
            })
            setDefaultRoom({
                label: defaultSession.room.name,
                value: defaultSession.room.id.toString()
            })
            setDefaultType({
                label: defaultSession.type.name,
                value: defaultSession.type.id.toString()
            })
        }
    }, [defaultSession]);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: "",
            movie: "",
            room: "",
            type: ""
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
        setIsSubmitting(true)
        handleSubmit(values)
    }

    useEffect(() => {
        axios.get("/movies")
            .then(res => {
                const options = res.data.map((d: any) => ({label: d.name, value: d.id}))
                setMovies(options)
            })
        axios.get("/rooms")
            .then(res => {
                const options = res.data.map((d: any) => ({label: d.name, value: d.id}))
                setRooms(options)
            })
        axios.get("/types")
            .then(res => {
                const options = res.data.map((d: any) => ({label: d.name, value: d.id}))
                setTypes(options)
            })
        
    }, [defaultSession]);
    
    const onChangeMovie = (value: string) => {
        form.setValue("movie", value.toString())
    }
    const onChangeRoom = (value: string) => {
        form.setValue("room", value.toString())
    }
    const onChangeType = (value: string) => {
        form.setValue("type", value.toString())
    }
    
    
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input type={"datetime-local"} value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    
                    <div className={"flex gap-4 flex-col justify-center sm:flex-row sm:justify-start"}>
                        {movies && (
                            <FormField
                                control={form.control}
                                name="movie"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Film</FormLabel>
                                        <FormControl>
                                            <div>
                                                <Autocomplete options={movies} handleOnChange={onChangeMovie} defaultValue={defaultSession ? defaultMovie : undefined} />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}

                        {rooms && (
                            <FormField
                                control={form.control}
                                name="movie"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Salle</FormLabel>
                                        <FormControl>
                                            <div>
                                                <Autocomplete options={rooms} handleOnChange={onChangeRoom} defaultValue={defaultSession ? defaultRoom : undefined} />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>

                    {types && (
                        <FormField
                            control={form.control}
                            name="movie"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <div>
                                            <Autocomplete options={types} handleOnChange={onChangeType}  defaultValue={defaultSession ? defaultType: undefined}/>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    )}
                    
                    <Button type="submit" isLoading={isSubmitting}>Créer</Button>
                </form>
            </Form>
        </>
    )
}