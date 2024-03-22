"use client"

import {useEffect, useState} from "react";
import axios from "@/lib/axios";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {Card, CardContent} from "@/components/ui/card";
import {Movie, Session} from "@/types";
import {useFormContext} from "react-hook-form";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {FormField, FormMessage} from "@/components/ui/form";
import {Check, CheckCircle, CheckCircle2} from "lucide-react";

const currentDate = new Date();
const allDates = [...Array(7 + 1)]
    .map((_, index) => new Date(currentDate.getTime() + index * 24 * 60 * 60 * 1000))
    .sort((a, b) => a.getTime() - b.getTime());
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
        day: date.toLocaleDateString('fr-FR', {weekday: 'long'}),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('fr-FR', {month: 'long'})
    };
};

export const TicketSessions = ({id}: { id: number }) => {
    const form = useFormContext();


    const [movieSessions, setMovieSessions] = useState<{movie: Movie, sessions: Session[]}>()
    const [slideDateActive, setSlideDateActive] = useState(0)

    useEffect(() => {
        axios.get(`/movies/${id}/sessions`)
            .then(res => {
                setMovieSessions({
                    movie: res.data.movie,
                    sessions: res.data.sessions
                })
            })
    }, []);

    const onChangeSlide = (index: number) => {
        setSlideDateActive(index)
    }

    const getSessionsFromSelectedDate = () => {
        if(!movieSessions) return []
        
        return movieSessions?.sessions.filter(session => new Date(session.date).toDateString() === allDates[slideDateActive].toDateString());
    };

    return (
        <div className={"mx-4 mt-8"}>
            <h3 className={"text-xl text-muted-foreground"}>Jour de ta séance</h3>
            <Swiper
                className={"mt-4"}
                spaceBetween={10}
                slidesPerView={3.5}
                onSlideChange={() => console.log('slide change')}
                onSwiper={_ => {
                    // Avoid swipper bug with vaul drawer
                    setTimeout(() => {
                        document.querySelector('.swiper-wrapper')?.classList.remove('vaul-scrollable')
                    })
                }}
                navigation={true}
                initialSlide={0}
                breakpoints={{
                    576: {
                        slidesPerView: 4.5
                    },
                    768: {
                        slidesPerView: 6.5
                    }
                }}
            >
                {allDates.map((date, index) => {
                    const dateFormatted = formatDate(date.toDateString())
                    return (
                        <SwiperSlide key={date.toDateString()}
                                     className={`p-3 pb-0 text-center rounded-2xl cursor-pointer hover:bg-card/20 bg-card text-card-foreground relative`}
                                     onClick={() => onChangeSlide(index)}>
                            <span className={"uppercase block text-sm"}>{dateFormatted.day}</span>
                            <span className={"font-extrabold block text-xl"}>{dateFormatted.dayNumber}</span>
                            <span className={"uppercase block text-sm pb-2"}>{dateFormatted.month}</span>
                            {slideDateActive === index && <span
                                className={"bg-primary h-[4px] rounded-full w-5/6 absolute left-1/2 transform -translate-x-1/2 bottom-[2.5px]"}></span>}
                        </SwiperSlide>
                    )
                })}
            </Swiper>


            <div className={"mt-12"}>
                <h3 className={"text-xl text-muted-foreground"}>Heure de ta séance</h3>
                <FormField
                    control={form.control}
                    name={"session"}
                    render={({field}) => (
                        <>
                            <RadioGroup
                                className={"flex gap-4 flex-wrap justify-center mt-6 min-h-[50px"}
                            >
                                {getSessionsFromSelectedDate().map((session: Session, index) => {
                                    const date = new Date(session.date)
                                    return (
                                        <Label>
                                            <RadioGroupItem value={session.id.toString()} className={"hidden"} />
                                            <Card
                                                className={`h-max cursor-pointer relative ${field.value?.id === session.id.toString() ? 'border-card outline outline-primary outline-2' : ''}`}
                                                onClick={_ => {
                                                    form.setValue("session", {
                                                        id: session.id.toString(),
                                                        date: session.date,
                                                        type: session.type.name,
                                                        price: Number(session.type.price)
                                                    })
                                                }}
                                            >
                                                {field.value?.id === session.id.toString() && <Check className={"text-primary-foreground bg-primary rounded-full absolute -top-2 -right-2"} size={16} />}
                                                <CardContent className={"pl-2 min-w-[110px] pb-3"}>
                                                    <p className={"text-2xl"}>{`${date.getHours()}:${date.getMinutes()}`}</p>
                                                    <p className={"text-sm italic"}>{session.type.name}</p>
                                                </CardContent>
                                            </Card>
                                        </Label>
                                    )
                                })}
                            </RadioGroup>
                            <FormMessage className={"text-primary mt-4 ml-2 text-xl"} />
                        </>

                    )}
                />
            </div>
        </div>
    )
}