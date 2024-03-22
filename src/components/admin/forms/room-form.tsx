import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {Category, Room} from "@/types";

const formSchema = z.object({
    name: z.string().min(2),
    capacity: z.string()
})

export const RoomForm = ({handleSubmit, defaultRoom}:{handleSubmit: (data: any) => void, defaultRoom?: Room}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    useEffect(() => {
        if(defaultRoom) {
            form.setValue("name", defaultRoom.name )
            form.setValue("capacity", defaultRoom.capacity.toString() )
        }
    }, [defaultRoom]);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            capacity: "10"
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nom" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="capacity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Capacité</FormLabel>
                                <FormControl>
                                    <Input type={"number"} inputMode={"numeric"} placeholder="Nombre de place disponible" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" isLoading={isSubmitting}>Créer</Button>
                </form>
            </Form>
        </>
    )
}