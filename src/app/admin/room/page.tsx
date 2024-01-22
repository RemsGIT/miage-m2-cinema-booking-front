import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Films | InstantCiné',
  description: 'InstantCiné, Pour une réservation rapide et instantannée',
}

export default function Session() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button href="/">Accueil</Button>
    </main>
  )
}

