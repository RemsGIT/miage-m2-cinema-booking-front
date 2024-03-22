import Image from "next/image";

export const TicketSuccess = () => {
    return (
        <>
            <Image src={"/popcorns.svg"} alt={""} width={300} height={100} className={"w-full max-w-[500px] mx-auto"}/>
            <h3 className={"text-center text-3xl text-foreground"}>Votre réservation est confirmée</h3>
        </>
    )
}