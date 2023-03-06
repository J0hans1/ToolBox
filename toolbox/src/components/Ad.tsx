import { Avatar } from "@mui/material";
import { amber } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ad } from "../types/types";


interface AdProps {
    ad: Ad;
}

export default function AdComponent({ad}: AdProps){

    let navigate = useNavigate();
    const [picture, setPicture] = useState<string>("");

    function truncate(str: any ) {
        return (str.length > 30) ? str.substring(0, 30 - 1) + '...' : str;
    };

    const handleClick = () => {
        sessionStorage.removeItem("ADID");
        sessionStorage.setItem("ADID", ad.id);
        if (ad.id !== null) {
            navigate(`/adinspector/${ad.id}`)
        }
    }

    function getAdPicture() {
        if (ad.pictures !== undefined && ad.pictures.length > 0) {
            setPicture(ad.pictures[0]);
            return ad.pictures[0];
        } else {
            return "https://img.icons8.com/ios/50/000000/price-tag-euro.png";
        }
    }

    useEffect(() => {
        getAdPicture();
    }, [])


    return (
        <div onClick={() => handleClick()} className='rounded-lg w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 shadow-lg overflow-hidden relative hover:scale-105 hover:shadow-2xl active:scale-100 duration-200 m-3'>
        <div className="flex h-full w-full overflow-hidden bg-cover bg-center" style={{backgroundImage: `url(${picture})`}}>
            <img className="h-40 w-full " src={picture} alt="AdPicture" /> {/* med h-full vil deler av bildet bli dekket av tekst */}
        </div>

        <div className="flex flex-row">

        <div className="flex flex-row bg-white rounded-lg h-auto absolute bottom-0 p-4 justify-between w-full shadow-inner ">

                <div className="w-1/5 hidden md:block">
                    <Avatar sx={{bgcolor: amber[500]}}>TH</Avatar>
                </div>
                <div className="flex flex-col w-4/5">
                    <div className="flex justify-between">
                        <h2 className="text-md font-bold">{ad.title}</h2>

                        <div className="flex flex-row h-5 lg:hidden">
                            <img alt="bilde" className="h-full" src="https://img.icons8.com/ios/50/000000/price-tag-euro.png" />
                            <p className="md:text-lg text-pu-ghost ml-1">{ad.price}kr/dag</p>
                        </div>

                    </div>
                    <p className="text-sm text-left my-2 hidden lg:block">{truncate(ad.description)}</p>
                    <div className=" flex-row gap-5 hidden lg:flex">

                        <div className="flex flex-row h-5">
                            <img alt="bilde" className="h-full" src="https://img.icons8.com/ios/50/000000/price-tag-euro.png" />
                            <p className="text-xs text-pu-ghost ml-1">{ad.price}kr/dag</p>
                        </div>
                        
                        <div className="flex flex-row h-5">
                            <img alt="bilde" className="h-full" src="https://img.icons8.com/material-sharp/256/map-marker.png" />
                            <p className="text-xs text-pu-ghost ml-1">{ad.city}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}