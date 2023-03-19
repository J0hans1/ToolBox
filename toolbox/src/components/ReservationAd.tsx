import { Avatar } from "@mui/material";
import { amber } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAd } from "../lib/controller";
import { Reservation, UpdateAd } from "../types/types";


interface ReservationProps {
    reservation: Reservation;
}

export default function ReservationAd(props: ReservationProps){

    let navigate = useNavigate();
    const [picture, setPicture] = useState<string>("");

    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [city, setCity] = useState("");
    const [pictures, setPictures] = useState<string[]>([]);

    function truncate(str: any ) {
        return (str.length > 30) ? str.substring(0, 30 - 1) + '...' : str;
    };

    const handleClick = () => {
        if (props.reservation.adId !== null && props.reservation.adId) {
            sessionStorage.removeItem("ADID");
            sessionStorage.setItem("ADID", props.reservation.adId);
            navigate(`/adinspector/${props.reservation.adId}`)
        }
    }

    async function getAdFromDatabase(adID: string): Promise<UpdateAd | undefined> {
        const doc = await getAd(adID)
        if (doc === undefined || doc === null) return undefined;
        const adFromDatabase = { id: doc.id, ...doc.data() } as UpdateAd;
        return adFromDatabase;
    }

    useEffect(() => {
        async function fetchAd() {
            const adId = props.reservation.adId;
            if (adId){
                const adFromDatabase = await getAdFromDatabase(adId);
                if (adFromDatabase !== undefined){
                    setDescription(adFromDatabase.description);
                    setTitle(adFromDatabase.title);
                    setPrice(adFromDatabase.price.toString());
                    setCity(adFromDatabase.city);
                    setPictures(adFromDatabase.pictures);
                }
            }
        }
        fetchAd();
    }, []);

    useEffect(() => {
        function getAdPicture() {
            if (pictures !== undefined && pictures.length > 0) {
                setPicture(pictures[0]);
                return pictures[0];
            }
            else {
                return "https://img.icons8.com/ios/50/000000/price-tag-euro.png";
            }
        }
        getAdPicture();
    },[pictures]);

    return (
        <div className="flex flex-col">
            <p>{props.reservation.startDate} - {props.reservation.endDate}</p>
            <div onClick={() => handleClick()} className='rounded-lg w-32 h-32 md:w-60 md:h-60 lg:w-80 lg:h-80 shadow-lg overflow-hidden relative hover:scale-105 hover:shadow-2xl active:scale-100 duration-200 m-3'>
                <div className="flex h-full w-full overflow-hidden bg-cover bg-center" style={{backgroundImage: `url(${picture})`}}>
                    {/* <img className="h-32 w-full " src={picture} alt="AdPicture" /> med h-full vil deler av bildet bli dekket av tekst */}
                </div>

            <div className="flex flex-row">

            <div className="flex flex-row bg-white rounded-lg h-auto absolute bottom-0 p-4 justify-between w-full shadow-inner ">

                    <div className="w-1/5 hidden md:block">
                        <Avatar sx={{bgcolor: amber[500]}}>TH</Avatar>
                    </div>
                    <div className="flex flex-col w-4/5">
                        <div className="flex justify-between">
                            <h2 className="text-md font-bold">{title}</h2>

                            <div className="flex flex-row h-5 lg:hidden">
                                <img alt="bilde" className="h-full" src="https://img.icons8.com/ios/50/000000/price-tag-euro.png" />
                                <p className="md:text-lg text-pu-ghost ml-1">{price}kr/dag</p>
                            </div>

                        </div>
                        <p className="text-sm text-left my-2 hidden lg:block">{truncate(description)}</p>
                        <div className=" flex-row gap-5 hidden lg:flex">

                            <div className="flex flex-row h-5">
                                <img alt="bilde" className="h-full" src="https://img.icons8.com/ios/50/000000/price-tag-euro.png" />
                                <p className="text-xs text-pu-ghost ml-1">{price}kr/dag</p>
                            </div>
                            
                            <div className="flex flex-row h-5">
                                <img alt="bilde" className="h-full" src="https://img.icons8.com/material-sharp/256/map-marker.png" />
                                <p className="text-xs text-pu-ghost ml-1">{city}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}