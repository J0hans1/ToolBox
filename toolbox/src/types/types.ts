//import { Timestamp } from "@firebase/firestore";

export interface User{
    id: string;
    location?: string;
    password?: string;
    username?: string;
    Ads?: [Ad];
}

// slette denne?
/* export interface Adds{
    id: string;
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    fromDate?: Timestamp;
    toDate?: Timestamp;
    picture?: string;
    location?: string;
} */


export interface Ad{
    id?: string;
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    rental?: string;
    address?: string;
    zip?: number;
    city?: string;
    pictures?: string[];
}

export interface NewUser{
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    address: string;
    zip: string;
    city: string;
}

