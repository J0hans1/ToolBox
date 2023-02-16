import { Avatar } from "@mui/material";
import { amber } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Ad } from "../types/types";


interface AdProps {
    ad: Ad;
}

export default function AdFB({ad}: AdProps){
    let navigate = useNavigate();

    const handleClick = () => {
        sessionStorage.removeItem("ADID");
        sessionStorage.setItem("ADID", ad.id);

        if (ad.id !== null) {
            navigate(`/adinspector/${ad.id}`)
        }
        
    }

    return (

        <div className='rounded-lg w-80 h-80 shadow-lg overflow-hidden relative hover:scale-105 hover:shadow-2xl active:scale-100 duration-200 m-3' onClick={() => handleClick()}>
        <div className="flex h-full w-full overflow-hidden bg-cover ">
            <img className="h-full w-full " src="https://static.bb.se/wcsstore/CAS/PIM/Luna/imgs/1151376.jpg" alt="ad" />
        </div>

        <div className="flex flex-row">

            <div className="flex flex-row bg-white rounded-lg h-auto absolute bottom-0 p-4 justify-between w-full">
                <div className="w-1/5">
                    <Avatar sx={{bgcolor: amber[500]}}>TH</Avatar>
                </div>
                <div className="flex flex-col w-4/5">
                    <h2 className="text-md font-bold">{ad.title}</h2>
                    <p className="text-sm my-2">{ad.description}</p>
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-row h-5">
                            <img alt="bilde" className="h-full" src="https://img.icons8.com/ios/50/000000/price-tag-euro.png" />
                            <p className="text-xs ml-1">{ad.price}kr/dag</p>
                        </div>
                        <div className="flex flex-row h-5">
                            <img alt="bilde" className="h-full" src="https://img.icons8.com/material-sharp/256/map-marker.png" />
                            <p className="text-xs ml-1">{ad.city}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    )
}