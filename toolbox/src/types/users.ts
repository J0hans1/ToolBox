import { Timestamp } from "@firebase/firestore";

export interface User{
    id: string;
    location?: string;
    password?: string;
    username?: string;
    Adds?: [Adds];
}

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

export interface NewUser{
    username: string;
    password: string;
    location: string;
}