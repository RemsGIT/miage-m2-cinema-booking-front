import React, {useEffect, useState} from "react";
import {User} from "lucide-react";
import {useFormContext} from "react-hook-form";
import axios from "@/lib/axios";

export const TicketSeats = ({session_id}: { session_id: number }) => {
    const capacity = 60;
    const max_col = 8
    const form = useFormContext();
    const [isLoaded, setIsLoaded] = useState(false)

    const [unvailableSeats, setUnvailableSeats] = useState<string[]>([])

    useEffect(() => {
        axios
            .get(`/sessions/${session_id}/tickets`)
            .then(res => res.data)
            .then(res => {
                const seats = res.tickets.map((ticket: any) => ticket.seat)
                setUnvailableSeats(seats)

                setIsLoaded(true)
            })
    }, []);


    const [selectedSeats, setSelectedSeats] = useState<number[]>(form.getValues('seats'));


    const rows = Math.ceil(capacity / max_col);

    const handleSeatClick = (seatNumber: number) => {
        const seatIndex = selectedSeats.indexOf(seatNumber);
        // Already selected: remove it
        if (seatIndex !== -1) {
            const updatedSeats = [...selectedSeats];
            updatedSeats.splice(seatIndex, 1);
            setSelectedSeats(updatedSeats);
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    useEffect(() => {
        form.setValue("seats", selectedSeats)
    }, [selectedSeats]);

    const generateSeatsGrid = () => {
        const grid = [];

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < max_col; j++) {
                const seatNumber = Number(`${i}${j}`)
                const isSelected = selectedSeats.includes(seatNumber);
                if (unvailableSeats.includes(seatNumber.toString())) {
                    // Unvailable
                    row.push(
                        <div
                            key={seatNumber}
                            className={`border border-secondary w-[35px] h-[35px] md:w-[45px] md:h-[45px] cursor-pointer rounded-lg`}
                        >
                        </div>
                    );
                } else {
                    // Available
                    row.push(
                        <div
                            key={seatNumber}
                            className={`bg-card w-[35px] h-[35px] md:w-[45px] md:h-[45px] cursor-pointer rounded-lg ${isSelected && 'bg-primary'} flex justify-center items-center`}
                            onClick={() => handleSeatClick(seatNumber)}
                        >
                            {isSelected && <User color={"#fff"}/>}
                        </div>
                    );
                }
            }
            grid.push(
                <div key={i} className="flex gap-2 md:gap-4">
                    {row}
                </div>
            );
        }
        return grid
    }

    return (
        <>
            {isLoaded ? <div className="space-y-2 flex flex-col items-center mt-4 md:space-y-4">{generateSeatsGrid()}</div> : <div className={"h-[400px]"}></div>}
        </>
    )
}

