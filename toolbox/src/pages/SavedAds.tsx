import {Ad, User} from "../types/types";
import { useEffect, useState } from "react";
import AdFB from "../components/AdFB";
import { getUser, getSavedAdsFromUser } from "../lib/controller";
import ProfileSidebar from "../components/ProfileSidebar";
import Title from "../components/Title";


const SavedAds = () => {

    const [savedAds, setSavedAds] = useState<Ad[]>([]);
    
    async function getSavedAds() {
        const userID = sessionStorage.getItem("userID");
        if (userID != null) {
            const adsFromDatabase = await getSavedAdsFromUser(userID); // TODO - get saved ads
            setSavedAds(adsFromDatabase);
        }
    }


    useEffect( () => {
        getSavedAds();
        },
    []);

    const [user, setUser] = useState<User[]>([]);
    const userIDFromSessionStorage = sessionStorage.getItem("userID");
    
    // Get user from database
    async function getUserFromDatabase() {
        if (userIDFromSessionStorage != null) {
            const userFromDatabase = await getUser(userIDFromSessionStorage).then((doc) => {
                return { id: doc.id, ...doc.data() }
            });
            setUser([userFromDatabase]);
        }
    }
    
    // Call getUserFromDatabase() when site is loaded
    useEffect(() => {
        getUserFromDatabase();
    }, []);

    return (
        <div className='flex w-screen h-auto text-current flex-wrap flex-row gap-20 bg-slate-100'>
            <div className="flex flex-col">
                    {user?.map((user) => (
                    <ProfileSidebar user={user} key={user.id} />
                ))}
            </div>
            <div className="pt-60 text-left flex flex-col gap-10 pb-10">
                <div>
                    <Title heading="Lagrede " span="annonser" size="text-7xl"/>
                </div>
                 <section className='flex flex-col h-auto'>
                    <div className='flex m-auto w-full max-w-7xl p-10 text-current flex-wrap flex-row justify-center'>
                        {savedAds?.map((savedAds) => (
                            <AdFB key={savedAds.id} ad={savedAds} />
                        ))}
                    </div> 
                </section>  
            </div>
        </div> 
    );
}

export default SavedAds;



