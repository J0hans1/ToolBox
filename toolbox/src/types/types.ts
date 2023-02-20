//import { Timestamp } from "@firebase/firestore";

export interface User{
    id: string;
    username?: string;
    password?: string;
    password2?: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    email?: string;
    address?: string;
    zip?: string;
    city?: string;
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
    id: string;
    userid?: string;
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

export interface NewAd{
    id?: string;
    userid?: string;
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

