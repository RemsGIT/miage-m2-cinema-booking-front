import { Metadata } from "next"
import {LastMovieSlider} from "@/components/last-movie-slider";
import {fetcherGET} from "@/lib/fetcher";
import {Button} from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'Accueil | InstantCiné',
  description: 'InstantCiné, Pour une réservation rapide et instantannée',
}

export default async function Home() {

  const demoMovie: Array<{
    id: number
    title: string
    description: string
    duration: number
    poster: string
    trailer: string
    director: string
    actors: string[]
    genres: string[]
    releaseDate: string
  }>
      = [
    {
      "id": 1,
      "title": "Le Roi Lion",
      "description": "Le lion Mufasa, roi des animaux, et son épouse Sarabi donnent naissance à Simba, un futur héritier. Mais Scar, le frère de Mufasa, voyant diminuer ses chances d'accéder au trône, incite le lionceau à s'aventurer dans un cimetière des éléphants situé au-delà des frontières du royaume...",
      "duration": 118,
      "poster": "https://fr.web.img6.acsta.net/pictures/19/07/11/10/55/3959497.jpg",
      "trailer": "https://www.youtube.com/watch?v=4CbLXeGSDxg",
      "director": "Jon Favreau",
      "actors": [
        "Donald Glover",
        "Beyoncé Knowles-Carter",
        "James Earl Jones"
      ],
      "genres": [
        "Animation",
        "Aventure",
        "Drame",
        "Familial"
      ],
      "releaseDate": "2019-07-17T00:00:00.000Z",
    },
    {
      "id": 2,
      "title": "Avengers : Endgame",
      "description": "Thanos ayant anéanti la moitié de l’univers, les Avengers restants resserrent les rangs dans ce vingt-deuxième film des Studios Marvel, grande conclusion d’un des chapitres de l’Univers Cinématographique Marvel.",
      "duration": 181,
      "poster": "https://fr.web.img6.acsta.net/pictures/19/04/16/09/15/2227284.jpg",
      "trailer": "https://www.youtube.com/watch?v=TcMBFSGVi1c",
      "director": "Joe Russo",
      "actors": [
        "Robert Downey Jr.",
        "Chris Evans",
        "Mark Ruffalo"
      ],
      "genres": [
        "Action",
        "Aventure",
        "Science-Fiction"
      ],
      "releaseDate": "2019-04-24T00:00:00.000Z",
    }
  ]

  
  return (
      <main className="min-h-screen mt-12">

        <div className={"space-y-8"}>
          <div className={"space-y-3"}>
            <div className={"flex justify-between mx-6 items-center"}>
              <h3 className={"text-foreground font-semibold text-xl"}>À l'affiche</h3>
              <Button variant={"outline"} className={"px-2 py-1 h-max"}>Tout voir</Button>
            </div>

            <div className={"ml-6"}>
              <LastMovieSlider/>
            </div>
          </div>

          <div className={"mx-6"}>
            <h3 className={"text-foreground font-semibold text-xl"}>Par catégorie</h3>
          </div>


        </div>
      </main>
  )
}

