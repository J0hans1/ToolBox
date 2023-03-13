import Title from "../components/Title";
import TitledIcon from "../components/TitledIcon";
import { getAd, isSaved, isOwned, removeAdFromUser, saveAdToUser, deleteAd } from "../lib/controller";
import { Ad } from "../types/types";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import { Snack, SnackbarContext } from "../context/Context";
import Map from "../components/Map";
import StaticRatingStars from "../components/StaticRatingStars"
import { getAdRating } from "../lib/controller";
import ReviewList from "../components/ReviewList";
import { useAuth } from "../context/AuthContext";
import Calendar from "../components/Calendar";
import { EndDateContext, StartDateContext } from "../context/Context";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";




interface Info {
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
}

const AdUserInfo = (props: Info) => {
    const { currentUser } = useAuth();

    const [image, setImage] = useState<string>("");

    useEffect(() => {
        if (currentUser?.photoURL !== null && currentUser?.photoURL !== undefined) {
            setImage(currentUser?.photoURL);
        }
    }, [currentUser]);
    return (
        <div className='rounded-lg w-auto h-72 shadow-lg hover:shadow-2xl justify-center'>

            <div className="flex flex-row w-3/4 h-1/4 ml-2 gap-10 mt-5 p-8" >
                <img src={image} alt="User profile" style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px' }} />
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
    const { currentUser } = useAuth();
    const [ad, setAd] = useState<Ad[]>([]);
    const [isOwnedAd, setIsOwnedAd] = useState(false);
    const [isAdSaved, setIsAdSaved] = useState(false);
    const { setSnack } = useContext(SnackbarContext);
    const { startDate} = useContext(StartDateContext);
    const { endDate} = useContext(EndDateContext);


    const handleEditAd = async () => {
        const adIDFromSessionStorage = sessionStorage.getItem("ADID");
        navigate(`/editadpage/${adIDFromSessionStorage}`)
    };

    const handleDeleteAd = async () => {
        const adIDFromSessionStorage = sessionStorage.getItem("ADID");
        if (adIDFromSessionStorage != null) {
            await deleteAd(adIDFromSessionStorage);
            setSnack(new Snack({ message: 'Annonse er slettet!', color: 'success', autoHideDuration: 5000, open: true }))
            navigate("/ads");
        }
    };

    

    const handleSaveAd = async () => {
        const adIDFromSessionStorage = sessionStorage.getItem("ADID");
        if (currentUser?.id != null && adIDFromSessionStorage != null) {
            const isSavedAd = await isSaved(currentUser?.id, adIDFromSessionStorage);
            if (!isSavedAd) {
                await saveAdToUser(currentUser?.id, adIDFromSessionStorage);
                setSnack(new Snack({ message: 'Annonse er lagret til lagrede annonser!', color: 'success', autoHideDuration: 5000, open: true }));

                setIsAdSaved(true);
            }
        } else {
            setSnack(new Snack({ message: 'Du må være logget inn for å lagre annonser!', color: 'warning', autoHideDuration: 5000, open: true }));
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

    const handleRemoveAd = async () => {
        const adIDFromSessionStorage = sessionStorage.getItem("ADID");
        if (currentUser?.id != null && adIDFromSessionStorage != null) {
            const isSavedAd = await isSaved(currentUser?.id, adIDFromSessionStorage);
            if (isSavedAd) {
                await removeAdFromUser(currentUser?.id, adIDFromSessionStorage);
                setSnack(new Snack({ message: 'Annonse er fjernet fra lagrede annonser!', color: 'success', autoHideDuration: 5000, open: true }));
                setIsAdSaved(false);
            }
        }
    };

    const handleRedirect = () => {
        const adIDFromSessionStorage = sessionStorage.getItem("ADID");
        if (currentUser?.id != null && adIDFromSessionStorage != null) {
            navigate(`/reviewad`);
        } else {
            setSnack(new Snack({ message: 'Du må være logget inn for å gi en tilbakemelding!', color: 'warning', autoHideDuration: 5000, open: true }));
        }
    };

    const checkIfAdIsSaved = async () => {
        const adID = sessionStorage.getItem("ADID");
        if (currentUser?.id && adID) {
            const result = await isSaved(currentUser?.id, adID);
            return result;
        }
        return false;
    };

    useEffect(() => {
        getAdFromDatabase().then(() => {
            const checkIsOwned = async () => {
                const adID = sessionStorage.getItem("ADID");
                if (currentUser?.id && adID) {
                    const result = await isOwned(currentUser?.id, adID);
                    setIsOwnedAd(result);
                }
            };
            checkIsOwned().then(async () => {
                const saved = await checkIfAdIsSaved();
                setIsAdSaved(saved);
            });
        });
    }, []);

    function handleReserve(){
        
    }



    const renderPageControll = () => {
        if (isOwnedAd) {
            return (
                <div className="flex flex-row items-center">
                    <div className="flex flex-row gap-1 w-4/5">
                        <Button variant="contained" onClick={handleEditAd}>
                            Rediger annonse
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleDeleteAd}>
                            Slett annonse
                        </Button>
                    </div>
                    <div className="p-10 text-2xl text-left" >
                        {ad?.map((ad) =>
                            <div>
                                <Title size={"text-4xl ml-5 mr-5"} heading={ad.title} description={""} span={""} key={ad.title} ></Title>
                                <p key={ad.description}>
                                    {ad.description}
                                </p>

                                <div className="flex flex-row p-10 h-28 w-full justify-between">
                                    <TitledIcon icon="https://img.icons8.com/ios/512/calendar--v1.png" key={69} text={"Dato"} iconSize="h-full" textSize="text-3xl" />
                                    <TitledIcon icon="https://img.icons8.com/ios/50/000000/price-tag-euro.png" key={ad.price} text={ad.price?.toString() + " kr/dag"} iconSize="h-full" textSize="text-3xl" />
                                    <TitledIcon icon="https://img.icons8.com/material-sharp/256/map-marker.png" key={ad.city} text={ad.city} iconSize="h-full" textSize="text-3xl" />
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            )
        }
        else {
            return (
                <div className="flex flex-row items-center">
                    <div className="flex flex-row gap-1 w-4/5 text-center">
                        <h2>Placeholder for calendar</h2>
                    </div>

                    <div className="p-10 text-2xl text-left" >
                        {ad?.map((ad) =>
                            <div>
                                <Title size={"text-4xl"} heading={ad.title} description={""} span={""} key={ad.title} ></Title>
                                <p key={ad.description}>
                                    {ad.description}
                                </p>

                                <div className="flex flex-row h-28 w-full justify-between text-left">
                                    <TitledIcon icon="https://img.icons8.com/ios/512/calendar--v1.png" key={69} text={"Dato"} iconSize="h-full" textSize="text-3xl" />
                                    <TitledIcon icon="https://img.icons8.com/ios/50/000000/price-tag-euro.png" key={ad.price} text={ad.price?.toString() + " kr/dag"} iconSize="h-full" textSize="text-3xl" />
                                    <TitledIcon icon="https://img.icons8.com/material-sharp/256/map-marker.png" key={ad.city} text={ad.city} iconSize="h-full" textSize="text-3xl" />
                                </div>

                                <div className="flex flex-col">
                                    <div className="bg-white text-3xl">{`${ad.address} ${ad.zip} ${ad.city}`}</div>
                                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${ad.address} ${ad.zip} ${ad.city}`}>
                                        <div className="absolute pt-40 text-center pl-7">
                                            Trykk her for veibeskrivelse

                                        </div>
                                        <div className="opacity-50 flex relative">
                                            <Map address={`${ad.address} ${ad.zip} ${ad.city}`} />
                                        </div>
                                    </a>
                                </div>
                               
                                Annonsens gjennomsnittlige vurdering:
                                {/* stjerner for å vise gjennomsnittsrating til annonsen */}
                                <StaticRatingStars value={Number(getAdRating(ad.id))} />
                                <ReviewList/>
                            </div>

                        )}

                        <div className="flex flex-row gap-1 w-4/5">
                            <div>
                                {isAdSaved ? (
                                    <IconButton onClick={() => handleRemoveAd()}>
                                    <Favorite className="text-red-500 cursor-pointer" fontSize="large" />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={() => handleSaveAd()} >
                                    <FavoriteBorder className="text-red-500" fontSize="large"/>
                                    </IconButton>)}


                                
                            </div>
                            <Button variant="outlined" color="primary" >
                                Kontakt utleier
                            </Button>
                            <Button onClick={handleRedirect} variant="outlined" color="primary">
                                Skriv en anmeldelse
                            </Button>
                        </div>
                        <div className="items-center mt-10">
                            <h2>Reserver produkt</h2>
                            <div className="flex flex-row mt-5">
                                <Calendar/>
                            </div>
                            <Button variant="contained" onClick={handleReserve}>Reserver produkt</Button>
                            
                        </div>
                       
                    </div>
                </div>
            )
        }
    }




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

                    </div>

                    <div className="w-full">
                        {/* <div className="flex flex-row p-10 h-32 w-full justify-between">
                            <TitledIcon icon="https://img.icons8.com/ios/512/calendar--v1.png" key={69} text={"Dato"} iconSize="h-full" textSize="text-3xl" />
                            <TitledIcon icon="https://img.icons8.com/ios/50/000000/price-tag-euro.png" key={ad.price} text={ad.price?.toString() + " kr/dag"} iconSize="h-full" textSize="text-3xl" />
                            <TitledIcon icon="https://img.icons8.com/material-sharp/256/map-marker.png" key={ad.city} text={ad.city} iconSize="h-full" textSize="text-3xl" />
                        </div> */}


                        <div>
                            {/* Render ad details */}
                            {renderPageControll()}
                        </div>
                    </div>

                    {/* <div className="flex flex-row">
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
                    </div> */}
                </div>
            ))}
        </div>
    );
};

export default AdInspectorPage;



