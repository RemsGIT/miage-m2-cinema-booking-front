import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {Type} from "@/types";

const formSchema = z.object({
    name: z.string().min(2),
    price: z.string()
})

export const TypeForm = ({handleSubmit, defaultType}:{handleSubmit: (data: any) => void, defaultType?: Type}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    useEffect(() => {
        if(defaultType) {
            form.setValue("name", defaultType.name )
            form.setValue("price", defaultType.price.toString() )
        }
    }, [defaultType]);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: "10"
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
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prix</FormLabel>
                                <FormControl>
                                    <Input type={"number"} inputMode={"decimal"} placeholder="Prix du billet" {...field} />
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