"use client"

import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {TicketSessions} from "@/components/ticket/ticket-sessions";
import {ArrowLeft, Banknote} from "lucide-react";
import {useState} from "react";
import {TicketSeats} from "@/components/ticket/ticket-seats";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {toast} from "sonner";
import {TicketClient} from "@/components/ticket/ticket-client";
import {TicketSuccess} from "@/components/ticket/ticket-success";
import Link from "next/link";
import axios from "@/lib/axios";
import {Ticket} from "@/types";

const formSchema = z.object({
    session: z.object({
        id: z.string().min(1),
        date: z.string(),
        type: z.string(),
        price: z.number(),
    }, {required_error: 'Sélectionne une séance'}),
    seats: z.number().array(),
    client: z.object({
        firstname: z.string().optional(),
        lastname: z.string().optional(),
        email: z.string().email({message: "Veuillez saisir une adresse email valide"}).optional()
    }).optional()
})

export const BuyTicketButton = ({movie_id}: { movie_id: number }) => {
    const [open, setOpen] =  useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [step, setStep] = useState(0)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            seats: [],
            client: {
                firstname: "",
                lastname: "",
                email: undefined
            }
        },
    })

    const onSubmit = async (data: any) => {
        if (isSubmitting) return

        if (step === 1 && data.seats.length === 0) {
            toast.error('Sélectionne au moins un siège')
            return
        }

        if (step === 2 && !(data.client.firstname && data.client.lastname && data.client.email)) {
            toast.error('Rempli tes informations')
            return
        }

        switch (step) {
            case 0 :
                setStep(1);
                break;
            case 1 :
                setStep(2);
                break;
            case 2 :
                setIsSubmitting(true)
                
                const seats = data.seats
                let isSuccess = true
                
                const tickets: Ticket[] = []
                for (const seat of seats) {
                    let result = await axios.post('/tickets', {
                        ticket: {
                            session: {id: data.session.id},
                            seat: seat.toString(),
                            amount: data.session.price
                        },
                        client: {
                            firstname: data.client.firstname,
                            lastname: data.client.lastname,
                            email: data.client.email
                        }
                    })
                    
                    if(result.data.success) {
                        tickets.push(result.data.ticket)
                    }
                    else {
                        isSuccess = false
                    }
                }
                
                if(isSuccess) {
                    setStep(3)
                    
                    axios.post('/tickets/sendmail', tickets)
                    
                }
                setIsSubmitting(false)
                break;
        }
    }

    return (
        <Drawer open={open}  onOpenChange={open => setOpen(open)} onClose={() => {
            document.body.style.background = '';
            form.reset()
            setStep(0)
            setOpen(false)
        }}>
            <DrawerTrigger className={"w-full"}>
                <Button className={"w-full gap-2 py-2 h-max"} type={"button"} onClick={() => setOpen(true)} asChild>
                    <div>
                        <Banknote/>
                        <span className={"text-lg"}>Réserver une séance</span>
                    </div>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className={"mt-4 h-full overflow-auto"}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className={"flex flex-col justify-between"}>
                                <div>
                                    <h2 className={"text-2xl text-center text-foreground"}>
                                        {step === 0 ? 'Choisi ta séance' : step === 1 ? (
                                            <div className={"relative"}>
                                                <ArrowLeft className={"text-foreground absolute left-10 top-1"}
                                                           onClick={() => {
                                                               if (!isSubmitting) setStep(0)
                                                           }}/>
                                                <h3 className={"text-foreground text-2xl col-span-2 text-center"}>Choisi
                                                    ton
                                                    siège</h3>
                                            </div>
                                        ) : (
                                            <>
                                                {step < 3 && (
                                                    <div className={"relative"}>
                                                        <ArrowLeft className={"text-foreground absolute left-10 top-1"}
                                                                   onClick={() => {
                                                                       if (!isSubmitting) setStep(1)
                                                                   }}/>
                                                        <h3 className={"text-foreground text-2xl col-span-2 text-center"}>Réservation</h3>
                                                    </div>
                                                )}
                                            </>

                                        )}
                                    </h2>

                                    {step === 0 && <TicketSessions id={movie_id}/>}
                                    {step === 1 && <TicketSeats session_id={Number(form.getValues("session.id"))}/>}
                                    {step === 2 && <TicketClient/>}
                                    {step === 3 && <TicketSuccess/>}

                                    {/* Récapitulatif */}
                                    {step === 2 && (
                                        <div className={"mx-8"}>
                                        <h3 className={"text-foreground text-xl mt-6"}>Récapitulatif</h3>

                                            <div className={"text-muted-foreground mt-4"}>
                                                <p>Séance : {new Date(form.getValues('session.date')).toLocaleDateString('fr-FR', {dateStyle: 'full'})}</p>
                                                <p>Type : {form.getValues('session.type')}</p>
                                                <p>Nombre de billets : {form.getValues('seats').length}</p>
                                                <hr className={"my-2"} />
                                                <p>Prix : {form.getValues('seats').length * form.getValues('session.price')} €</p>

                                            </div>
                                        </div>
                                    )}
                                </div>

                                {step < 3 ? (
                                    <Button
                                        type={"submit"}
                                        className={"mx-auto flex mb-12 mt-8 w-5/6 md:w-1/3"}
                                        isLoading={isSubmitting}
                                    >
                                        {step === 0 ? 'Choisir mon siège' : 'Réserver mon billet'}
                                    </Button>
                                ) : (
                                    <Button variant={"secondary"} className={"mx-auto w-1/6 mt-8"} onClick={() => setOpen(false)}>Fermer</Button>
                                )}

                            </div>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    )
} 