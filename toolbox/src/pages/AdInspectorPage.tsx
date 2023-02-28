import AdUserInfo from "../components/AdUserInfo";
import Title from "../components/Title";
import { AdIconAndText } from "../components//Ad";
import { getUser, getAd, isSaved, isOwned, removeAdFromUser, saveAdToUser } from "../lib/controller";
import { Ad, User } from "../types/types";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";


const AdInspectorPage = () => {

    const [user, setUser] = useState<User[]>([]);
    const [ad, setAd] = useState<Ad[]>([]);
    const [isOwnedAd, setIsOwnedAd] = useState(false);
    const [isAdSaved, setIsAdSaved] = useState(false);


    // check if ad is owned by user, if so, show edit button and delete button instead of save button
    const handleEditAd = async () => {
        // TODO: Add button for redirect to edit ad page 
    };

    const handleDeleteAd = async () => {
        // TODO: delete ad from database
    };

    const handleSaveAd = async () => {
        const userIDFromSessionStorage = sessionStorage.getItem("userID");
        const adIDFromSessionStorage = sessionStorage.getItem("ADID");
        if (userIDFromSessionStorage != null && adIDFromSessionStorage != null) {
            const isSavedAd = await isSaved(userIDFromSessionStorage, adIDFromSessionStorage);
            if (!isSavedAd) {
                await saveAdToUser(userIDFromSessionStorage, adIDFromSessionStorage);
                alert("Annonse lagret til lagrede annonser");
                setIsAdSaved(true);
            } 
        }
    };


    async function getAdFromDatabase() {
        const adFromSessionStorage = sessionStorage.getItem("ADID");
        if (adFromSessionStorage != null) {
            const adFromDatabase = await getAd(adFromSessionStorage).then((doc) => {
                return { id: doc.id, ...doc.data() }
            });
            setAd([adFromDatabase]);
        }
    }

    async function getUserFromDatabase() {
        const userIDFromAd = sessionStorage.getItem("userIDFromAd");
        console.log("setUserFromDatabase 2 " + userIDFromAd);
        if (userIDFromAd != null) {
            const userFromDatabase = await getUser(userIDFromAd).then((doc) => {
                return { id: doc.id, ...doc.data() }
            });
            setUser([userFromDatabase]);
        }
    }

    const handleRemoveAd = async () => {
        const userIDFromSessionStorage = sessionStorage.getItem("userID");
        const adIDFromSessionStorage = sessionStorage.getItem("ADID");
        if (userIDFromSessionStorage != null && adIDFromSessionStorage != null) {
            const isSavedAd = await isSaved(userIDFromSessionStorage, adIDFromSessionStorage);
            if (isSavedAd) {
                await removeAdFromUser(userIDFromSessionStorage, adIDFromSessionStorage);
                alert("Annonse fjernet fra lagrede annonser");
                setIsAdSaved(false);
            } 
        }
    };

    const renderAdControls = () => {
        if (isOwnedAd) {
            return (
                <div className="flex flex-row">
                    <Button variant="contained" color="primary" onClick={handleEditAd}>
                        Rediger annonse
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDeleteAd}>
                        Slett annonse
                    </Button>
                </div>
            );
        } else {
            return (
                <div>
                  {isAdSaved ? (
                    <Button onClick={handleRemoveAd}>Fjern annonse fra lagrede annonser</Button>
                  ) : (
                    <Button onClick={handleSaveAd}>Lagre annonse</Button>
                  )}
                </div>
              );
        }
    };

    const checkIfAdIsSaved = async () => {
        const userID = sessionStorage.getItem("userID");
        const adID = sessionStorage.getItem("ADID");
        if (userID && adID) {
            const result = await isSaved(userID, adID);
            return result;
        }
        return false;
    };

    useEffect(() => {
        getAdFromDatabase().then(() => {
            getUserFromDatabase().then(() => {
                const checkIsOwned = async () => {
                    const userID = sessionStorage.getItem("userID");
                    const adID = sessionStorage.getItem("ADID");
                    if (userID && adID) {
                        const result = await isOwned(userID, adID);
                        setIsOwnedAd(result);
                    }
                };
                checkIsOwned().then(async () => {
                    const saved = await checkIfAdIsSaved();
                    setIsAdSaved(saved);
                });
            });
        });
    }, []);


    //Todo: Component for slideshow of pictures
    return (
        <div className="pt-40 pb-40 flex flex-col px-60">
            {ad?.map((ad) => (
                <div key={ad.id} className="flex flex-col">
                    <div
                        className="bg-cover h-52 bg-slate-100 rounded-md bg-center relative"
                        style={{
                            backgroundImage: `url(http://www.sitech.co.id/assets/img/products/default.jpg)`

                        }}
                    >
                        <div id="c_wrapper" className='w-auto justify-center bg-white rounded-tl-xl absolute right-0 bottom-0 '>

                            <Title size={"text-4xl ml-5 mr-5"} heading={ad.title} description={""} span={""} key={ad.title} ></Title>

                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex flex-row p-10 h-32 w-full justify-between">
                            <AdIconAndText icon="https://img.icons8.com/ios/512/calendar--v1.png" key={69} text={"Dato"} iconSize="h-full" textSize="text-3xl" />
                            <AdIconAndText icon="https://img.icons8.com/ios/50/000000/price-tag-euro.png" key={ad.price} text={ad.price?.toString() + " kr/dag"} iconSize="h-full" textSize="text-3xl" />
                            <AdIconAndText icon="https://img.icons8.com/material-sharp/256/map-marker.png" key={ad.city} text={ad.city} iconSize="h-full" textSize="text-3xl" />

                        </div>
                        <div className="flex flex-col items-center">
                            {/* Render ad details */}
                            {renderAdControls()}
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <div className='pt-0 w-1/2'>
                            {user?.map((user) => (
                                <AdUserInfo name={user.firstname} email={user.email} phone={user.phone} avatar={""} key={user.id} />
                            ))}
                        </div>

                        <div className="p-10 text-2xl w-1/2 text-left" >

                            <p key={ad.description}>
                                {ad.description}
                            </p>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdInspectorPage;



