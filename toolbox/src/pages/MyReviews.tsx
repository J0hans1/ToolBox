import {Ad, User} from "../types/types";
import { useEffect, useState } from "react";
import AdFB from "../components/Ad";
import { getUser, getUserAds } from "../lib/controller";
import ProfileSidebar from "../components/ProfileBar";
import Title from "../components/Title";



const MyReviews = () => {

    // TODO: mappe ut alle reviews som er laget av brukeren

    /* const [myAds, setAds] = useState<Ad[]>([]);
    
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

    const [user, setUser] = useState<User[]>([]);
    const userIDFromSessionStorage = sessionStorage.getItem("userID");
    
    // Get user from database
    async function getUser2() {
        if (userIDFromSessionStorage != null) {
            const userFromDatabase = await getUser(userIDFromSessionStorage).then((doc) => {
                return { id: doc.id, ...doc.data() }
            });
            setUser([userFromDatabase]);
        }
    }
    
    // Call getUser2() when site is loaded
    useEffect(() => {
        getUser2();
    }, []);
 */
    return (
        <div className='flex w-screen h-auto text-current flex-wrap flex-row gap-20 bg-slate-100'>
            <div className="flex flex-col">
{/*                     {user?.map((user) => (
                    <ProfileSidebar user={user} key={user.id} />
                ))} */}
            </div>
            <div className="pt-60 text-left flex flex-col gap-10 pb-10">
                <div>
                    <Title heading="Mine " span="anmeldelser" size="text-7xl"/>
                </div>
                 <section className='flex flex-col h-auto'>
                    <div className='flex m-auto w-full max-w-7xl p-10 text-current flex-wrap flex-row justify-center'>
{/*                         {myAds?.map((myAd) => (
                            <AdFB key={myAd.id} ad={myAd} />
                        ))} */}
                    </div> 
                </section>  
            </div>
        </div> 
    );
}

export default MyReviews;



