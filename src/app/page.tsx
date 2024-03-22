import { Metadata } from "next"
import {LastMovieSlider} from "@/components/last-movie-slider";
import {fetcherGET} from "@/lib/fetcher";
import {Button} from "@/components/ui/button";
import {MoviesByCategory} from "@/components/movies-by-category";
import {HeroBanner} from "@/components/hero-banner";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Accueil | InstantCiné',
  description: 'InstantCiné, Pour une réservation rapide et instantannée',
}

export default async function Home() {
  
  return (
      <main className="min-h-screen mt-0 lg:mt-12">
        <HeroBanner />

        <div className={"space-y-8"}>
          <div className={"space-y-3"}>
            <div className={"flex justify-between mx-6 items-center"}>
              <h3 className={"text-foreground font-semibold text-xl"}>À l'affiche</h3>
              <Button variant={"outline"} className={"px-2 py-1 h-max"} asChild>
                <Link href={"/movies"}>
                  Tout voir
                </Link>
              </Button>
            </div>

            <div className={"ml-6"}>
              <LastMovieSlider/>
            </div>
          </div>

          <div className={"mx-6 min-h-[400px]"}>
            <h3 className={"text-foreground font-semibold text-xl"}>Par catégorie</h3>
            
            <MoviesByCategory />
          </div>


        </div>
      </main>
  )
}

