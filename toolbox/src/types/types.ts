import { Timestamp } from "@firebase/firestore";

export interface User{
    id: string;
    location?: string;
    password?: string;
    username?: string;
    Adds?: [Adds];
}

// slette denne?
export interface Adds{
    id: string;
    category?: string;
    description?: string;
    price?: number;
    fromDate?: Timestamp;
    toDate?: Timestamp;
    picture?: string;
    title?: string;
    location?: string;
}

/* interface adValues {
    adObject : ad
} */

export interface Ad{
    title: string;
    description: string;
    category: string;
    price: number;
    rental: string;
    adress: string;
    zip: number;
    city: string;
}

export interface NewUser{
    username: string;
    password: string;
    location: string;
}

