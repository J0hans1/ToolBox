import { useEffect } from "react";
import ProfileSidebar from "../components/ProfileBar";
import Title from "../components/Title";
import { useAuth } from "../context/AuthContext";
import { getMyReviews } from "../lib/controller";


const MyReviews = () => {
    const { currentUser } = useAuth();

    // TODO: mappe ut alle reviews som er laget av brukeren

    // get reviews from controller
    useEffect(() => {
        if (currentUser?.id != null) {
            getMyReviews(currentUser.id);
        }
    }, []);



    return (
        <div className='flex w-screen h-auto text-current flex-wrap flex-row gap-20 bg-slate-100'>
            <div className="flex flex-col">
                <ProfileSidebar />
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



