import Title from "../components/Title";
import TitledIcon from "../components/TitledIcon";
import { getAd, isSaved, isOwned, removeAdFromUser, saveAdToUser, deleteAd, getAdReviews, getUser} from "../lib/controller";
import { Ad, GoogleUser, Review } from "../types/types";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Snack, SnackbarContext } from "../context/Context";
import { Avatar, Slide } from "@mui/material";
import { amber } from "@mui/material/colors";
import Wrapper from "../components/Wrapper";
import IconButton from '@mui/material/IconButton';

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import styles from '../styles/Home.module.scss'

import Map from "../components/Map";
import StaticRatingStars from "../components/StaticRatingStars"
import { getAdRating, getNumReviews } from "../lib/controller";
import ReviewList from "../components/ReviewList";
import { useAuth } from "../context/AuthContext";
import Calendar from "../components/Calendar";
import { EndDateContext, StartDateContext } from "../context/Context";
import { FavoriteBorder, Favorite } from "@material-ui/icons";




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
        <div className='relative p-10'>

            {/* <div className="flex w-full mb-5 justify-end absolute top-6 right-0">
                <div className="flex w-11 h-11 justify-center bg-white rounded-full">
                    <IconButton aria-label="save" >
                        <img className="h-5 w-auto" src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="" />
                    </IconButton>
                </div>
            </div> */}

            <div className="flex flex-col gap-3 mb-5">
                <div className="w-1/4">
                    <Avatar sx={{ bgcolor: amber[500], width: 70, height: 70 }}>{props.avatar}</Avatar>
                </div>

                <div className="w-full">
                    <h2 className="text-3xl mt-2">{props.name}</h2>
                    <p className=" text-gray-500">@kingdingsoir</p>
                    <p className="mt-3">Rating goes here</p>
                </div>
            </div>

            {/* <div className="flex flex-row w-3/4 h-1/4 ml-2 gap-10 mt-5 p-8" >
                <img src={image} alt="User profile" style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px' }} />
 
            </div> */}

            <div className="flex flex-row w-full gap-1">
                <Button variant="contained" sx={{ px: 5 }} href={`mailto: ${props.email}`}>E-post</Button>
                <Button variant="outlined" sx={{ px: 5 }} href={`tel: ${props.phone}`}>Telefon</Button>
            </div>

        </div>
    )
}

interface Slides {
    slides: string[];
}

const ImageSlider = (props: Slides) => {
    return (
        <div className={styles.container}>
            <Swiper
                // style={{
                //     "--swiper-navigation-color": "#fff",
                //     "--swiper-pagination-color": "#fff",
                // }}
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                speed={500}
                slidesPerView={1}
                loop
                className={styles.swiper1}
            >
                {props.slides.map((slide) =>
                    <SwiperSlide>
                        <img src={slide} alt="image" />
                    </SwiperSlide>
                )}

            </Swiper>
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
    const { startDate } = useContext(StartDateContext);
    const { endDate } = useContext(EndDateContext);
    const [avgrating, setAvgrating] = useState<number>(-1);
    const [numReviews, setNumReviews] = useState<number>(-1);


    const handleEditAd = async () => {
        const adIDFromSessionStorage = sessionStorage.getItem("ADID");
        navigate(`/editadpage/${adIDFromSessionStorage}`)
    };

    const handleDeleteAd = async () => {
        const confirmDelete = window.confirm('Er du sikker på at du vil slette annonsen din?');
        if (confirmDelete) {
            const adIDFromSessionStorage = sessionStorage.getItem("ADID");
            if (adIDFromSessionStorage != null) {
                await deleteAd(adIDFromSessionStorage);
                setSnack(new Snack({ message: 'Annonse er slettet!', color: 'success', autoHideDuration: 5000, open: true }))
                navigate("/ads");
            }
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
            const doc = await getAd(adFromSessionStorage)
            if (doc === undefined || doc === null) return undefined;
            const adFromDatabase = { id: doc.id, ...doc.data() }
            setAd([adFromDatabase]);
            mapPictures(adFromDatabase)
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
    }

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
                await getAverageRating();
                await getReviews();
                await getNumberOfRatings();
            });
        });
    }, []);


    async function getAverageRating() {
        const adID = sessionStorage.getItem("ADID");
        if (adID !== null) {
            const averageRating = Number(await getAdRating(adID));
            console.log(averageRating);
            setAvgrating(averageRating);
        }

    }

    async function getNumberOfRatings() {
        const adID = sessionStorage.getItem("ADID");
        if (adID !== null) {
            const numReviews = Number(await getNumReviews(adID));
            console.log(numReviews);
            setNumReviews(numReviews);
        }

    }

    function handleReserve() {

    }



    // reviews
    const [reviewsList2, setReviewList2] = useState<Review[]>([]);
    const [users2, setUsers2] = useState<GoogleUser[]>([]);

    async function getUser2(userId: string) {
        const userFromDatabase = await getUser(userId);
        return userFromDatabase;
    }

    async function getReviews() {
        const adID = sessionStorage.getItem("ADID");
        if (adID != null) {
            const reviewFromDatabase = await getAdReviews(adID);
            setReviewList2(reviewFromDatabase);
            mapUsers(reviewFromDatabase);
        }
    }

    async function mapUsers(reviews: Review[]) {
        const userIds = reviews.map((review) => review.userId);
        const uniqueUserIds = [...new Set(userIds)].filter((userId) => userId !== undefined);
        const usersFromDatabase = await Promise.all(uniqueUserIds.map((userId) => getUser2(userId!)));
        const usersData = usersFromDatabase.filter((user) => user !== null && user !== undefined);
        const userList = usersData.map((user) => ({ id: user!.id, ...user!.data() }));
        setUsers2(userList);
    }

    const renderPageControll = () => {
        if (isOwnedAd) {
            return (
                <div className="w-full h-auto">
                    {ad?.map((ad) =>
                        <div className="w-full h-auto text-left">
                            <div className="flex flex-row w-full h-96 mt-32 mb-5 content-start">
                                <div className="w-2/3 h-96">
                                    <ImageSlider slides={pictures} />
                                </div>

                                <div className="flex flex-row w-1/3 bg-slate-100">
                                    {/* {user?.map((user) => (
                                        <AdUserInfo name={`${user.firstname} ${user.lastname}`} email={user.email} phone={user.phone} avatar={`${user.firstname?.charAt(0)}${user.lastname?.charAt(0)}`} key={user.id} username={`@${user.username}`} />
                                    ))} */}

                                    <AdUserInfo name={'Torgeir Dingsøyr'} email={'tdingsoir@hotmale.com'} phone={'+47 966 99 669'} avatar={'TD'} key={'kingdingsoir'} />
                                </div>

                            </div>

                            <div className="w-full h-auto flex flex-row">
                                <div className="flex flex-col w-1/2 pr-10">
                                    <div className="flex flex-row justify-between">
                                        <Title size={"text-5xl"} heading={ad.title} key={ad.title} />
                                    </div>
                                    <p className="break-words" key={ad.description}>
                                        {ad.description}
                                    </p>

                                    <div className="flex flex-row h-28 w-full justify-start gap-10">
                                        <TitledIcon icon="https://cdn-icons-png.flaticon.com/512/567/567600.png" key={ad.price} text={ad.price?.toString() + " kr/dag"} iconSize="h-full" textSize="" />
                                        <TitledIcon icon="https://cdn-icons-png.flaticon.com/512/3037/3037821.png" key={ad.city} text={`${ad.address}, ${ad.zip}, ${ad.city}`} iconSize="h-full" textSize="" />
                                    </div>

                                    <div className="flex flex-row gap-1">
                                        <Button sx={{p:1.5, px:5}} variant="contained" color="primary" onClick={handleEditAd}>Rediger annonse</Button>
                                        <Button sx={{p:1.5, px:5}} variant="contained" color="error" onClick={handleDeleteAd}>Slett annonse</Button>
                                    </div>
                                </div>

                                <div className="flex flex-col w-1/2 bg-pu-svart text-white h-80">

                                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${ad.address} ${ad.zip} ${ad.city}`}>
                                        <div className="absolute pt-40 text-center pl-7">
                                            Trykk her for veibeskrivelse
                                        </div>
                                        <div className="flex relative">
                                            <Map address={`${ad.address} ${ad.zip} ${ad.city}`} />
                                            <div className="flex absolute top-0 right-0 py-2 px-5 bg-pu-svart z-10">
                                                <p>Trykk på kartet for veibeskrivelse!</p>
                                            </div>
                                        </div>
                                    </a>
                                    {/* <Map address={`${ad.address} ${ad.zip} ${ad.city}`} /> */}

                                </div>
                            </div>

                            <div className="flex flex-row w-full h-auto mt-5">

                                <div className="flex flex-col w-1/2 pr-5">
                                    <div className="mb-5">
                                        <h2 className="text-2xl mb-5">Anmeldelser</h2>
                                        <p>Les hva andre brukere mener om produktet og utleier. Ikke fornøyd med ratingen? Skjerp deg.</p>
                                    </div>

                                    <h1 className="text-xl font-light mb-2">Totalvurdering:</h1>
                                    <div className="flex flex-row gap-3">
                                        <p className="text-5xl font-light">{avgrating}</p>
                                        <div className="flex flex-col gap-1 mb-5">
                                            <StaticRatingStars value={avgrating} />
                                            <p>{`Antall anmeldelser: ${numReviews}`}</p>
                                        </div>

                                    </div>

                                    <ReviewList reviews={reviewsList2} users={users2} />

                                </div>

                                <div className="flex flex-col w-1/2">
                                    <h2 className="text-2xl mb-5">Reservasjon</h2>
                                    <Calendar key={ad.id} ad={ad} />
                                </div>

                            </div>

                        </div>

                    )}
                </div>
            )
        }

        else {
            return (
                <div className="w-full h-auto">
                    {ad?.map((ad) =>
                        <div className="w-full h-auto text-left">
                            <div className="flex flex-row w-full h-96 mt-32 mb-5 content-start">
                                <div className="w-2/3 h-96">
                                    <ImageSlider slides={pictures} />
                                </div>

                                <div className="flex flex-row w-1/3 bg-slate-100">
                                    {/* {user?.map((user) => (
                                        <AdUserInfo name={`${user.firstname} ${user.lastname}`} email={user.email} phone={user.phone} avatar={`${user.firstname?.charAt(0)}${user.lastname?.charAt(0)}`} key={user.id} username={`@${user.username}`} />
                                    ))} */}
                                    <AdUserInfo name={'Torgeir Dingsoir'} email={'tdingsoir@hotmale.com'} phone={'+47 966 99 669'} avatar={'TD'} key={'kingdingsoir'} />
                                </div>
                            </div>

                            <div className="w-full h-auto flex flex-row">
                                <div className="flex flex-col w-1/2 pr-10">
                                    <div className="flex flex-row justify-between">
                                        <Title size={"text-5xl"} heading={ad.title} key={ad.title} />

                                        <div>
                                            {isAdSaved ? (
                                                <IconButton sx={{ p: 1.5 }} onClick={() => handleRemoveAd()}>
                                                    <Favorite className="text-black cursor-pointer" fontSize="large" />
                                                </IconButton>
                                            ) : (
                                                <IconButton sx={{ p: 1.5 }} onClick={() => handleSaveAd()} >
                                                    <FavoriteBorder className="text-black" fontSize="large" />
                                                </IconButton>)}

                                        </div>
                                    </div>
                                    <p className="break-words" key={ad.description}>
                                        {ad.description}
                                    </p>


                                    <div className="flex flex-row h-28 w-full justify-start gap-10">
                                        <TitledIcon icon="https://cdn-icons-png.flaticon.com/512/567/567600.png" key={ad.price} text={ad.price?.toString() + " kr/dag"} iconSize="h-full" textSize="" />
                                        <TitledIcon icon="https://cdn-icons-png.flaticon.com/512/3037/3037821.png" key={ad.city} text={`${ad.address}, ${ad.zip}, ${ad.city}`} iconSize="h-full" textSize="" />
                                    </div>
                                </div>

                                <div className="flex flex-col w-1/2 bg-pu-svart text-white h-80">

                                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${ad.address} ${ad.zip} ${ad.city}`}>
                                        <div className="absolute pt-40 text-center pl-7">
                                            Trykk her for veibeskrivelse
                                        </div>
                                        <div className="flex relative">
                                            <Map address={`${ad.address} ${ad.zip} ${ad.city}`} />
                                            <div className="flex absolute top-0 right-0 py-2 px-5 bg-pu-svart z-10">
                                                <p>Trykk på kartet for veibeskrivelse!</p>
                                            </div>
                                        </div>
                                    </a>
                                    {/* <Map address={`${ad.address} ${ad.zip} ${ad.city}`} /> */}

                                </div>
                            </div>

                            <div className="flex flex-row w-full h-auto mt-5">

                                <div className="flex flex-col w-1/2 pr-5">
                                    <div className="mb-5">
                                        <h2 className="text-2xl mb-5">Anmeldelser</h2>
                                        <p>Les hva andre brukere mener om produktet og utleier. Lyst til å dele hvordan din opplevelse av utleier og produkt? Legg igjen en anmeldelse da vel!</p>
                                    </div>

                                    <h1 className="text-xl font-light mb-2">Totalvurdering:</h1>
                                    <div className="flex flex-row gap-3">
                                        <p className="text-5xl font-light">{avgrating}</p>
                                        <div className="flex flex-col gap-1 mb-5">
                                            <StaticRatingStars value={avgrating} />
                                            <p>{`Antall anmeldelser: ${numReviews}`}</p>
                                        </div>

                                    </div>

                                    <div className="mb-5">
                                        <Button fullWidth onClick={handleRedirect} sx={{p:1.5}} variant="outlined" color="primary">Skriv en anmeldelse</Button>

                                    </div>

                                    <ReviewList reviews={reviewsList2} users={users2} />

                                </div>

                                <div className="flex flex-col w-1/2">
                                    <h2 className="text-2xl mb-5">Reservasjon</h2>
                                    <Calendar key={ad.id} ad={ad} />
                                </div>

                            </div>

                        </div>

                    )}
                </div>

            )
        }
    }

    // const renderMap = () => {
    //     return (
    //         <StaticDateRangePicker
    //         defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
    //         sx={{
    //           [`.${pickersLayoutClasses.contentWrapper}`]: {
    //             alignItems: 'center',
    //           },
    //         }}
    //       />
    //     )
    // }



    const [pictures, setImage] = useState<string[]>([]);
    function mapPictures(newAd: Ad) {
        console.log(newAd);
        if (newAd.pictures !== undefined) {

            setImage(newAd.pictures)
        }
        else {
            setImage(['http://www.sitech.co.id/assets/img/products/default.jpg'])
        }
        console.log("pics:" + pictures)

    }

    return (
        <Wrapper height={"h-auto"} bg_color={"bg-white"} text_fill={"text-black"} direction={"flex-col"}>
            {ad?.map((ad) => (
                <div key={ad.id} className="flex flex-col">

                    <div className="w-full">
                        <div>
                            {/* Render ad details */}
                            {renderPageControll()}
                        </div>
                    </div>
                </div>
            ))}

            <div className="pt-40 pb-40 flex flex-col px-60">

            </div>

        </Wrapper>
    );
};


export default AdInspectorPage;