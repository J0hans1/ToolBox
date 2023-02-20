import AdUserInfo from "../components/AdUserInfo";
import Title from "../components/Title";
import {AdIconAndText} from "../components//Ad";
import { getUser, getAd } from "../lib/controller";
import { Ad, User } from "../types/types";
import { useEffect, useState } from "react";


const AdInspectorPage = () => {

    const [user, setUser] = useState<User[]>([]);
    const [ad, setAd] = useState<Ad[]>([]);


    async function getAdFromDatabase() {
        const adFromSessionStorage = sessionStorage.getItem("ADID");
        if (adFromSessionStorage != null ) {
            const adFromDatabase = await getAd(adFromSessionStorage).then((doc) => {
                return { id: doc.id, ...doc.data() }
            });
            setAd([adFromDatabase]);
        }
    }

    async function getUser2() {
      // userIDFromAd is set in getAd() in controller
      const userIDFromAd = sessionStorage.getItem("userIDFromAd");
      console.log("setUserFromDatabase 2 " + userIDFromAd);
      if (userIDFromAd != null) {
        const userFromDatabase = await getUser(userIDFromAd).then((doc) => {
          return { id: doc.id, ...doc.data() }
        });
        setUser([userFromDatabase]);
      }
    }

    useEffect(() => {
      getAdFromDatabase().then(() => {
        getUser2()
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
                        <AdIconAndText icon="https://img.icons8.com/ios/512/calendar--v1.png" key={69}  text={"Dato"} iconSize="h-full" textSize="text-3xl" />
                        <AdIconAndText icon="https://img.icons8.com/ios/50/000000/price-tag-euro.png"  key={ad.price} text={ad.price?.toString()+" kr/dag"} iconSize="h-full" textSize="text-3xl" />
                        <AdIconAndText icon="https://img.icons8.com/material-sharp/256/map-marker.png" key={ad.city} text={ad.city} iconSize="h-full" textSize="text-3xl" />
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



