import AdUserInfo from "../components/AdUserInfo";
import Title from "../components/Title";
import {AdIconAndText} from "../components//Ad";
import { getUser, getAd, getUserFromAdId } from "../lib/controller";
import { Ad, User } from "../types/types";
import { useEffect, useState } from "react";


const AdInspectorPage = () => {

    const [user, setUser] = useState<User[]>([]);
    const [ad, setAd] = useState<Ad[]>([]);

    
    // Get user from database
    async function getUserFromDatabase() {
        const adFromSessionStorage = sessionStorage.getItem("ADID");
        if (adFromSessionStorage != null) {
            // sets sessionstorage for user
            await getUserFromAdId(adFromSessionStorage).then( () => {
               console.log("getUserFromDatabase 1 " + sessionStorage.getItem("userIDFromAd"))
            });
        }
    }

    async function setUserFromDatabase() {
        const userIDFromAd = sessionStorage.getItem("userIDFromAd")
        console.log("setUserFromDatabase 2 " + userIDFromAd)
        if (userIDFromAd != null) {
            const userFromDatabase = await getUser(userIDFromAd).then((doc) => {
                return { id: doc.id, ...doc.data() }
            });
            setUser([userFromDatabase]);
        }
    }

    async function getAdFromDatabase() {
        const adFromSessionStorage = sessionStorage.getItem("ADID");
        const userIDFromAd = sessionStorage.getItem("userIDFromAd")
        console.log("getAdFromDatabase 3 " + userIDFromAd)
        if (adFromSessionStorage != null && userIDFromAd != null) {
            const adFromDatabase = await getAd(adFromSessionStorage, userIDFromAd).then((doc) => {
                return { id: doc.id, ...doc.data() }
            });
            setAd([adFromDatabase]);
        }
    }

    useEffect(() => {
        getUserFromDatabase();
        setTimeout(() => {
            setUserFromDatabase();
            getAdFromDatabase();
        }, 500); // 500ms delay 
        // Todo: Find a better way to do this.
    }, []);




    /*         async.series([getUserFromDatabase, setUserFromDatabase, getAdFromDatabase], function(err: any, results: any) {
            console.log(results);
        }); */

/*         async function getUserFromDatabase() {
            const adFromSessionStorage = sessionStorage.getItem("ADID");
            if (adFromSessionStorage != null) {
              await getUserFromAdId(adFromSessionStorage);
              console.log("getUserFromDatabase 1 " + sessionStorage.getItem("userIDFromAd"));
            }
          }
          
          async function setUserAndAdFromDatabase() {
            const userIDFromAd = sessionStorage.getItem("userIDFromAd");
            console.log("setUserAndAdFromDatabase 2 " + userIDFromAd);
            if (userIDFromAd != null) {
              const userFromDatabase = await Promise.all([
                getUser(userIDFromAd)
              ]);
              setUser(userFromDatabase);
              const adFromDatabase = await Promise.all([
                getAdFromDatabase(userIDFromAd)
              ]);
              if (adFromDatabase !== undefined) { // Add this check
                setAd([adFromDatabase]);
              }
            }
          }
          
          async function getAdFromDatabase(userID: string) {
            const adFromSessionStorage = sessionStorage.getItem("ADID");
            console.log("getAdFromDatabase 3 " + userID);
            if (adFromSessionStorage != null && userID != null) {
              //const adFromDatabase = await getAd(adFromSessionStorage, userID);
              const adFromDatabase = await getAd(adFromSessionStorage, userID).then((doc) => {
                return { id: doc.id, ...doc.data() }
            });
              //return adFromDatabase;
            }
          }
          
          useEffect(() => {
            getUserFromDatabase()
              .then(() => setUserAndAdFromDatabase())
              .catch(error => console.log(error));
          }, []);
           */
/*           const [user, setUser] = useState<User[]>([]);
          const [ad, setAd] = useState<Ad[]>([]); */
          
/*           async function getUserFromDatabase() {
            const adFromSessionStorage = sessionStorage.getItem("ADID");
            if (adFromSessionStorage != null) {
              await getUserFromAdId(adFromSessionStorage);
            }
          }
          
          async function setUserFromDatabase() {
            const userIDFromAd = sessionStorage.getItem("userIDFromAd")
            if (userIDFromAd != null) {
              const userFromDatabase = await getUser(userIDFromAd).then((doc) => {
                return { id: doc.id, ...doc.data() }
              });
              setUser([userFromDatabase]);
            }
          }
          
          async function getAdFromDatabase() {
            const adFromSessionStorage = sessionStorage.getItem("ADID");
            const userIDFromAd = sessionStorage.getItem("userIDFromAd")
            if (adFromSessionStorage != null && userIDFromAd != null) {
              const adFromDatabase = await getAd(adFromSessionStorage, userIDFromAd).then((doc) => {
                return { id: doc.id, ...doc.data() }
              });
              setAd([adFromDatabase]);
            }
          }
          
          useEffect(() => {
            async function fetchData() {
              await getUserFromDatabase();
              await setUserFromDatabase();
              await getAdFromDatabase();
            }
            fetchData();
          }, []); */

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



