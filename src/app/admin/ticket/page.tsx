import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Billets | InstantCiné',
  description: 'InstantCiné, Pour une réservation rapide et instantannée',
}

export default function Ticket() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button href="/">Accueil</Button>
    </main>
  )
}

