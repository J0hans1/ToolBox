import Title from "../components/Title";
import TitledIcon from "../components/TitledIcon";
import { getUser, getAd, isSaved, isOwned, removeAdFromUser, saveAdToUser, deleteAd } from "../lib/controller";
import { Ad, User } from "../types/types";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { amber } from "@mui/material/colors";
import LinkButton from "../components/LinkButton";
import Map from "../components/Map";



interface Info {
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;

}

const AdUserInfo = (props: Info) => {
    return (
        <div className='rounded-lg w-auto h-72 shadow-lg hover:shadow-2xl justify-center'>

            <div className="flex flex-row w-3/4 h-1/4 ml-2 gap-10 mt-5 p-8" >
                <Avatar sx={{ bgcolor: amber[500], width: 70, height: 70 }}>AO</Avatar>
                <div className="text-left justify-start pb-5 flex-wrap">
                    <h2 className="text-3xl mt-2 font-bold">{props.name}</h2>
                </div>
            </div>

            <div className="font-bold text-left p-8 pt-20 flex-wrap justify-center">
                <p>Kontakt utleier for å avtale leie eller utlån: </p>
            </div>
            <div className="flex flex-row font-bold ">
                <LinkButton label={props.email} href={props.email} type="mail" />
                <LinkButton label={props.phone} href={props.phone} type="phone" />
            </div>
            <div className="flex h-1/3">

            </div >

        </div>
    )
}

const AdInspectorPage = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User[]>([]);
    const [ad, setAd] = useState<Ad[]>([]);
    const [isOwnedAd, setIsOwnedAd] = useState(false);
    const [isAdSaved, setIsAdSaved] = useState(false);


    const handleEditAd = async () => {
        const adIDFromSessionStorage = sessionStorage.getItem("ADID");
        navigate(`/editadpage/${adIDFromSessionStorage}`)
    };

    const handleDeleteAd = async () => {
        const adIDFromSessionStorage = sessionStorage.getItem("ADID");
        if (adIDFromSessionStorage != null) {
            await deleteAd(adIDFromSessionStorage);
            alert("Annonse slettet");
            navigate("/ads");
        }
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
                            <TitledIcon icon="https://img.icons8.com/ios/512/calendar--v1.png" key={69} text={"Dato"} iconSize="h-full" textSize="text-3xl" />
                            <TitledIcon icon="https://img.icons8.com/ios/50/000000/price-tag-euro.png" key={ad.price} text={ad.price?.toString() + " kr/dag"} iconSize="h-full" textSize="text-3xl" />
                            <TitledIcon icon="https://img.icons8.com/material-sharp/256/map-marker.png" key={ad.city} text={ad.city} iconSize="h-full" textSize="text-3xl" />
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


                    <div className="w-50 h-50 flex flex-col justify-center">

                        <div className="ml-0  bg-white text-3xl w-full">
                                {`${ad.address} ${ad.zip} ${ad.city}`}
                            </div>
                            <a href={`https://www.google.com/maps/dir/?api=1&destination=${ad.address} ${ad.zip} ${ad.city}`} target="_blank" rel="noopener noreferrer">

                            <div className=" ml-56 text-4xl absolute w-auto pt-40 z-10  opacity-80">
                                Trykk her for veibeskrivelse
                            </div>
                            
                            <div className="opacity-50 justify-center relative z-0 ">
                                <Map address={`${ad.address} ${ad.zip} ${ad.city}`} />
                            </div>


                        </a>
                    </div>


                </div>
            ))}
        </div>
    );
};

export default AdInspectorPage;



