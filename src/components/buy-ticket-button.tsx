"use client"

import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {MovieSessions} from "@/components/movie/movie-sessions";
import {ArrowLeft, Banknote} from "lucide-react";
import {useState} from "react";
import {MovieSeats} from "@/components/movie/movie-seats";
import Link from "next/link";

export const BuyTicketButton = ({movie_id}:{movie_id: number}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [step, setStep] = useState(0)
    
    const onSubmit = () => {
        if(isSubmitting) return

        switch (step) {
            case 0 : setStep(1); break;
            case 1 : {
                setIsSubmitting(true)
                
                break;
            }
        }
    }
    
    return (
        <Drawer onClose={() => {
            document.body.style.background = '';
        }}>
            <DrawerTrigger className={"w-full"}>
                <Button className={"w-full gap-2 py-2 h-max"} type={"button"}>
                    <Banknote />
                    <span className={"text-lg"}>Réserver une séance</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className={"mt-4 h-full overflow-auto"}>
                    <div className={"flex flex-col justify-between"}>
                        <div>
                            <h2 className={"text-2xl text-center text-foreground"}>
                                {step === 0 ? 'Choisi ta séance' : (
                                    <div className={"relative"}>
                                        <ArrowLeft className={"text-foreground absolute left-10 top-1"} onClick={() => {
                                            if(!isSubmitting) setStep(0)
                                        }}/>
                                        <h3 className={"text-foreground text-2xl col-span-2 text-center"}>Choisi ton siège</h3>
                                    </div>
                                )}
                            </h2>

                            {step === 0 && <MovieSessions id={movie_id}/>}
                            {step === 1 && <MovieSeats session_id={1}/>}
                        </div>

                        <Button className={"mx-auto flex mb-12 mt-8 w-5/6 md:w-1/3"} onClick={onSubmit} isLoading={isSubmitting}>
                            {step === 0 ? 'Choisir mon siège' : 'Réserver mon billet' }
                        </Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
} 