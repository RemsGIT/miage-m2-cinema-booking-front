import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import MultipleSelector, {Option} from "@/components/ui/multiple-selector";
import {useEffect, useState} from "react";
import axios from "@/lib/axios";
import {Movie} from "@/types";

const formSchema = z.object({
    name: z.string().min(2),
    description: z.string(),
    release: z.string().min(10, "Entrez une date valide"),
    duration: z.string().min(1),
    image: z.string(),
    categories: z.number().array(),
})

export const MovieForm = ({handleSubmit, defaultMovie}:{handleSubmit: (data: any) => void, defaultMovie?: Movie}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [categories, setCategories] = useState<Option[]>([])
    
    const [defaultCategories, setDefaultCategories] = useState<Option[]>()

    useEffect(() => {
        axios.get("/categories")
            .then(res => {
                const options = res.data.map((d: any) => ({label: d.name, value: d.id})) 
                setCategories(options)
            })
        
        if(defaultMovie) {
            form.setValue("name", defaultMovie.name )
            form.setValue("description", defaultMovie.description )
            form.setValue("release", new Date(defaultMovie.release).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-') )
            form.setValue("duration", defaultMovie.duration.toString())
            form.setValue("image", defaultMovie.image)
            form.setValue("categories",  defaultMovie.categories.map(c => c.id))
        }

    }, [defaultMovie]);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            release : "",
            duration: "",
            image: "",
            categories: []
        },
    })
    
    const handleSelectCategoryChange = (options: Option[]) => {
        const values = options.map(option => Number(option.value))

        form.setValue('categories', values)
    }

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        handleSubmit(values)
    }
    
    // Set default categories
    useEffect(() => {
        if(defaultMovie) {
            const categories: Option[] = defaultMovie.categories.map(category => ({
                value: category.id.toString(),
                label: category.name
            }))
            setDefaultCategories(categories)
        }
    }, []);
    
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
                                    <Input placeholder="Nom du film" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description du film" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    
                    <div className={"flex gap-2"}>
                        <FormField
                            control={form.control}
                            name="release"
                            render={({ field }) => (
                                <FormItem className={"w-1/2"}>
                                    <FormLabel>Date de sortie</FormLabel>
                                    <FormControl>
                                        <Input type={"date"} value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem className={"w-1/2"}>
                                    <FormLabel>Durée</FormLabel>
                                    <FormControl>
                                        <Input type={"number"} inputMode={"numeric"} placeholder={"Durée en minute"} {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>


                    <div className={"flex gap-2"}>
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem className={"w-1/2"}>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Input type={"text"} inputMode={"url"} placeholder={"Lien de l'image"} {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {categories.length > 0 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="categories"
                                    render={({ field }) => (
                                        <FormItem className={"w-1/2"}>
                                            <FormLabel>Catégories</FormLabel>
                                            <FormControl>
                                                <MultipleSelector
                                                    defaultOptions={categories}
                                                    onChange={handleSelectCategoryChange}
                                                    value={defaultCategories}
                                                    emptyIndicator={
                                                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                            Aucun résultat
                                                        </p>
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>

                        )}
                    </div>
                    <Button type="submit" isLoading={isSubmitting}>Créer</Button>
                </form>
            </Form>
        </>
    )
}