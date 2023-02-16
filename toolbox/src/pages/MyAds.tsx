import {Ad} from "../types/types";
import { useEffect, useState } from "react";
import { collection, DocumentData, getFirestore, onSnapshot, QuerySnapshot } from "firebase/firestore";
import AdFB from "../components/AdFB";
import { app } from "../lib/firebase";

const firestore = getFirestore(app);

const MyAds = () => {
    const [myAds, setAds] = useState<Ad[]>([]);
    const userID = sessionStorage.getItem("userID");
    const myAdsCollection = collection(firestore, `users/${userID}/ads`); // MY ADS COLLECTION

    useEffect(
        () =>
            onSnapshot(myAdsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
                setAds(
                    snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    })
                );
            }),
        []
    );

    return (
        <div className='w-full flex flex-col bg-slate-100 pt-40'>
            <div className='flex flex-row w-full mx-20'>
                <p>Mine annonser</p>
                <section className='flex flex-col h-auto'>
                    <div className='flex m-auto w-full max-w-7xl p-10 text-current flex-wrap flex-row justify-center'>
                        {myAds?.map((myAd) => (
                            <AdFB key={myAd.id} ad={myAd} />
                        ))}
                    </div> 
                </section>                
            </div>
        </div>
    );
}

export default MyAds;