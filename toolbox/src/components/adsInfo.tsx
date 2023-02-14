import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Ad } from "../types/types";
import { Button } from "@mui/material"
import { adsCollection } from "../lib/controller";
/* import AdsCard from "./adsCard"; */

/* export default function AdsInfo(){
    const [ads, setAds] = useState<Ad[]>([]);

    useEffect(
        () => 
            onSnapshot(adsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
                setAds(
                    snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    })
                );
                console.log(ads);
            }),
        []
    );

    return(
        <div className="fakk">
            <div>
                <Button 
                    variant="text" 
                    onClick={() => {
                        ads.map((ad => (
                        <AdsCard key={ad.id} ad = {ad} />
                    )))}}
                    > 
                    log ads 
                </Button>
            </div>
            <div>
                {ads.map((ad) => (
                    <AdsCard key={ad.id} ad = {ad} />
                ))}

            </div>
        </div>
    )
} */