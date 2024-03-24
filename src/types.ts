export interface Movie {
    id: number
    name: string
    description: string
    release: Date
    duration: number
    image: string
    categories: Category[]
}

export interface Category {
    id: number,
    name: string
}

export interface Session {
    id: number,
    movie: Movie
    type: Type,
    room: Room
    date: Date,
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

export interface Ticket {
    id: number,
    seat: number,
    amount: number,
    client: Client
    
}

export interface Client {
    id: number,
    firstname: string,
    lastname: string,
    email: string
}