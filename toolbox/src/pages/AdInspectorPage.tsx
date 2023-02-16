import AdUserInfo from "../components/AdUserInfo";
import Title from "../components/Title";
import {AdIconAndText} from "../components//Ad";
import { getUser, getAd, getUserFromAdId } from "../lib/controller";
import { Ad, User } from "../types/types";
import { useEffect, useState } from "react";


const AdInspectorPage = () => {

    const [user, setUser] = useState<User[]>([]);
    const [ad, setAd] = useState<Ad[]>([]);

    
    // Get user from database
    async function getUserFromDatabase() {
        const adFromSessionStorage = sessionStorage.getItem("ADID");
        if (adFromSessionStorage != null) {
            // sets sessionstorage for user
            await getUserFromAdId(adFromSessionStorage).then( () => {
               console.log("getUserFromDatabase 1 " + sessionStorage.getItem("userIDFromAd"))
            });
        }
        
    }

    async function setUserFromDatabase() {
        const userIDFromAd = sessionStorage.getItem("userIDFromAd")
        console.log("setUserFromDatabase 2 " + userIDFromAd)
        if (userIDFromAd != null) {
            const userFromDatabase = await getUser(userIDFromAd).then((doc) => {
                return { id: doc.id, ...doc.data() }
            });
            setUser([userFromDatabase]);
        }
    }

    async function getAdFromDatabase() {
        const adFromSessionStorage = sessionStorage.getItem("ADID");
        const userIDFromAd = sessionStorage.getItem("userIDFromAd")
        console.log("getAdFromDatabase 3 " + userIDFromAd)
        if (adFromSessionStorage != null && userIDFromAd != null) {
            const adFromDatabase = await getAd(adFromSessionStorage, userIDFromAd).then((doc) => {
                return { id: doc.id, ...doc.data() }
            });
            setAd([adFromDatabase]);
        }
    }

    useEffect(() => {
        
        getUserFromDatabase();

        setTimeout(() => {
            setUserFromDatabase();
            getAdFromDatabase();
        }, 300); // 300ms delay 
        // Todo: Find a better way to do this.


    }, []);
        
    //TODO: Mapper flere ganger nedover. Fungerer for nå, men må fikses.
    return (
    <div className="pt-40 pb-40 flex flex-col px-60">

        <div 
            className="bg-cover h-96 bg-slate-100 rounded-md bg-center relative" 
            style={{ 
                backgroundImage: `url("https://static.bb.se/wcsstore/CAS/PIM/Luna/imgs/1151376.jpg")`
            
            }}
        >
            <div id="c_wrapper" className='w-auto justify-center bg-white rounded-tl-xl absolute right-0 bottom-0 '>
            {ad?.map((ad) => (
                <Title size={"text-7xl ml-5 mr-5"} heading={ad.title} description={""} span={""} key={ad.title} ></Title> 
            ))}
            </div>
        </div>

        <div className="w-full">
        {ad?.map((ad) => (
            <div className="flex flex-row p-10 h-32 w-full justify-between">
                <AdIconAndText icon="https://img.icons8.com/ios/512/calendar--v1.png" key={69}  text={"Dato"} iconSize="h-full" textSize="text-4xl" />
                <AdIconAndText icon="https://img.icons8.com/ios/50/000000/price-tag-euro.png"  key={ad.price} text={ad.price?.toString()} iconSize="h-full" textSize="text-4xl" />
                <AdIconAndText icon="https://img.icons8.com/material-sharp/256/map-marker.png" key={ad.city} text={ad.city} iconSize="h-full" textSize="text-4xl" />
                </div>    
            ))}    
        </div>

        <div className="flex flex-row">
            <div className='pt-24 w-1/2'>
               {user?.map((user) => (
                    <AdUserInfo name={user.firstname} email={user.email} phone={user.phone} avatar={""} key={user.id} />
                ))} 
                
            </div>

            <div className="p-10 text-2xl w-1/2 text-left" >
            {ad?.map((ad) => (
                <p key={ad.description}>
                    {ad.description} 
                </p>
            ))}
            </div>
        </div>
    </div>
    
    );
};

export default AdInspectorPage;



