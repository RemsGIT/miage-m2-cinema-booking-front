export interface Movie {
    id: number
    name: string
    description: string
    release: Date
    duration: number
    image: string
    categories: Category[]
    releaseDate: string
}

export interface Category {
    id: number,
    name: string
}

export interface Session {
    id: number,
    date: Date,
    type: Type,
    room: Room
}

export interface Type {
    id: number,
    name: string,
    price: string
}

export interface Room {
    id: number,
    name: string,
    capacity: number
}