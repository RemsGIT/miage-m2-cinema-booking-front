import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

export const TicketClient = () => {

    const form = useFormContext()
    
    return (
         <div className={"mx-8 mt-6 space-y-3"}>
             <FormField
                 control={form.control}
                 name={"client.lastname"}
                 render={({field}) => (
                     <FormItem>
                         <FormLabel className={"text-foreground"}>Nom</FormLabel>
                         <FormControl>
                             <Input placeholder="Lacroix" className={"text-foreground"} {...field}/>
                         </FormControl>
                     </FormItem>
                 )}
             />

             <FormField
                 control={form.control}
                 name={"client.firstname"}
                 render={({field}) => (
                     <FormItem>
                         <FormLabel className={"text-foreground"}>Prénom</FormLabel>
                         <FormControl>
                             <Input placeholder="Matthieu" className={"text-foreground"} {...field}/>
                         </FormControl>
                     </FormItem>
                 )}
             />

             <FormField
                 control={form.control}
                 name={"client.email"}
                 render={({field}) => (
                     <FormItem>
                         <FormLabel className={"text-foreground"}>Adresse email</FormLabel>
                         <FormControl>
                             <Input placeholder="matthieu.lacroix@example.com" className={"text-foreground"} {...field}/>
                         </FormControl>
                         <FormMessage className={"text-primary"} />
                     </FormItem>
                 )}
             />
         </div>    
    )
}