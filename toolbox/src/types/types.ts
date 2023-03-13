
export interface Ad {
    id: string;
    userid?: string;
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    address?: string;
    zip?: number;
    city?: string;
    pictures?: string[];
    reviews?: string[];
    review?: number;
}

export interface UpdateAd {
    id?: string;
    userid?: string;
    title: string;
    description: string;
    category: string;
    price: number;
    address: string;
    zip: number;
    city: string;
    pictures: string[];
    reviews: string[];
}

export interface NewAd {
    id?: string;
    userid?: string;
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    address?: string;
    zip?: number;
    city?: string;
    pictures?: string[];
    reviews?: string[];
}

export interface Review{
    id: string;
    userId?: string;
    adId?: string;
    rating?: number;
    comment?: string;
}

export interface NewReview{
    id?: string;
    userId: string;
    adId: string;
    rating?: number;
    comment?: string;
}

export interface NewGoogleUser {
    uid: string;
    phoneNumber?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
    email?: string | null;
    myAds?: string[];
    savedAds?: string[];
    myReviews?: string[];
}

export interface GoogleUser {
    id: string;
    uid?: string;
    phoneNumber?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
    email?: string | null;
    myAds?: string[];
    savedAds?: string[];
    myReviews?: string[];
}
