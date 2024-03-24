"use client"

import {Ticket} from "@/types";
import axios from "@/lib/axios";
import {ColumnDef} from "@tanstack/react-table";


import {CrudTable} from "@/components/admin/crud-table";
import {useEffect, useState} from "react";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";

const AdminSessionDetailsPage = ({params}: { params: { id: number } }) => {
    const [date, setDate] = useState<Date>()
    const [tickets, setTickets] = useState<Ticket[]>([])

    useEffect(() => {
        axios.get(`/sessions/${params.id}/tickets`)
            .then(res => res.data)
            .then(res => {
                setDate(new Date(res.session.date))
                setTickets(res.tickets)
            })
    }, []);
    
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({row}) => <p>{row.getValue('id')}</p>,
        },
        {
            accessorKey: "date",
            header: "Date de réservation",
            cell: ({row}) => {
                const d = new Date(row.getValue('date'))
                return (
                    <p>{d.toLocaleDateString()} {d.getHours()}:{d.getMinutes()}</p>
                )
            },
        },
        {
            accessorKey: "seat",
            header: "Place",
            cell: ({row}) => <p>{row.getValue('seat')}</p>,
        },
        {
            accessorKey: "amount",
            header: "Montant",
            cell: ({row}) => <p>{row.getValue('amount')} €</p>,
        },
        {
            accessorKey: "client",
            header: "Client",
            //@ts-ignore
            cell: ({row}) => <p>{row.getValue('client')?.lastname.toUpperCase()} - {row.getValue('client')?.firstname} - <br /> <span className={"text-gray-300 italic"}>{row.getValue('client')?.email} </span></p>,
        },
    ]

    return (
        <div className={"text-foreground w-5/6 mx-auto mt-6"}>

            <Link href={"/admin?tab=sessions"}>
                <ArrowLeft className={"text-foreground"} />
            </Link>
            
            <h4 className={"mt-4 text-2xl"}>Liste des tickets pour la séance du {date?.toLocaleDateString()} à {date?.getHours()}:{date?.getMinutes()}</h4>
            
            <CrudTable props={{columns, data: tickets, search: {active: false}}}/>
        </div>
    )
}

export default AdminSessionDetailsPage