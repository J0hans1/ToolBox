import {Ad} from "../types/types";
import { useEffect, useState } from "react";
import AdFB from "../components/AdFB";
import { getUserAds } from "../lib/controller";



const MyAds = () => {

    const [myAds, setAds] = useState<Ad[]>([]);
    
    async function getMyAds() {
        const userID = sessionStorage.getItem("userID");
        if (userID != null) {
            const adsFromDatabase = await getUserAds(userID);
            setAds(adsFromDatabase);
        }
    }


    useEffect( () => {
            getMyAds();
        },
    []);

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