import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {Movie, Room, Session, Type} from "@/types";
import {Option} from "@/components/ui/multiple-selector";

const formSchema = z.object({
    movie: z.string(),
    type: z.string(),
    room: z.string(),
    date: z.string().min(10, "Entrez une date valide"),
})

export const SessionForm = ({handleSubmit, defaultSession}:{handleSubmit: (data: any) => void, defaultSession?: Session}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [movies, setMovies] = useState<Movie[]>([])
    const [types, setTypes] = useState<Type[]>([])
    const [room, setRooms] = useState<Room[]>([])

    useEffect(() => {
        if(defaultSession) {
            form.setValue("date", new Date(defaultSession.date).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-') )
            form.setValue("movie", defaultSession.price.toString() )
        }
    }, [defaultSession]);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        handleSubmit(values)
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
                                    <Input type={"date"} value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    
                    <div className={"flex gap-4"}>
                        {/* Combo box here with movies/types... => create a simple component that have all options in props and onChange handle */}
                    </div>
                    
                    <Button type="submit" isLoading={isSubmitting}>Créer</Button>
                </form>
            </Form>
        </>
    )
}