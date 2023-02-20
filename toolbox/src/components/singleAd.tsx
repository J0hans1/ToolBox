import { Avatar } from "@mui/material";
import { amber } from "@mui/material/colors";
import { AdIconAndText } from "./Ad";
import AdUserInfo from "./AdUserInfo";
import Title from "./Title";
import { Ad } from "../types/types";


const singleAd = (props: Ad) => {
    return (
        <div className="pt-40 pb-40 flex flex-col px-60">
    
{/*             <div 
                className="bg-cover h-96 bg-slate-100 rounded-md bg-center relative" 
                style={{ 
                    backgroundImage: `url("https://static.bb.se/wcsstore/CAS/PIM/Luna/imgs/1151376.jpg")`
                
                }}
            >
                <div id="c_wrapper" className='w-auto justify-center bg-white rounded-tl-xl absolute right-0 bottom-0 '>
                        
                    <Title size={"text-7xl ml-5 mr-5"} heading={ad.title} description={""} span={""} ></Title>
                    
                    </div>
            </div>
    
            <div className="w-full">
                <div className="flex flex-row p-10 h-32 w-full justify-between">
                    <AdIconAndText icon="https://img.icons8.com/ios/512/calendar--v1.png"  text={ad.date} iconSize="h-full" textSize="text-4xl" />
                    <AdIconAndText icon="https://img.icons8.com/ios/50/000000/price-tag-euro.png"   text={ad.price} iconSize="h-full" textSize="text-4xl" />
                    <AdIconAndText icon="https://img.icons8.com/material-sharp/256/map-marker.png" text={ad.location} iconSize="h-full" textSize="text-4xl" />
                </div>        
            </div>
    
            <div className="flex flex-row">
                <div className='pt-24 w-1/2'>
                    <AdUserInfo name={user.firstname} email={user.email} phone={user.phone} avatar={""} />
                </div>
    
                <div className="p-10 text-2xl w-1/2 text-left" >
                    <p>
                        {ad.description}
                    </p>
                </div>
            </div> */}
        </div>
        );
}

export default singleAd

