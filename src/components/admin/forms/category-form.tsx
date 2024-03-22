import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {Category} from "@/types";

const formSchema = z.object({
    name: z.string().min(2),
})

export const CategoryForm = ({handleSubmit, defaultCategory}:{handleSubmit: (data: any) => void, defaultCategory?: Category}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    useEffect(() => {

        if(defaultCategory) {
            form.setValue("name", defaultCategory.name )
        }

    }, [defaultCategory]);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
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
                    <Button type="submit" isLoading={isSubmitting}>Créer</Button>
                </form>
            </Form>
        </>
    )
}