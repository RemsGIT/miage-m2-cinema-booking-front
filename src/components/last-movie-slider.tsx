"use client"

import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {useEffect, useState} from "react";
import {fetcherGET} from "@/lib/fetcher";
import Link from "next/link";

export const LastMovieSlider = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const movies = fetcherGET("/movies?last=true").then(movies => {
            setMovies(movies)
        })

    }, []);
    
    return (
        <>
            <Swiper
                spaceBetween={10}
                slidesPerView={2.4}
                breakpoints={{
                    576: {
                        slidesPerView: 4.5
                    },
                    768: {
                        slidesPerView: 6.5
                    }
                }}  
            >
                {movies.map((movie: any, index: number) => (
                    <SwiperSlide key={index}>
                        <Link href={`/movie/${movie.id}`}>
                            <img src={movie.image} className={"rounded-2xl h-[230px] md:h-[300px]"} alt={movie.name} />
                        </Link>
                    </SwiperSlide> 
                ))}
            </Swiper>
        </>
    )
}