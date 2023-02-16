import { useEffect, useState } from "react";
import { getUser } from "../lib/controller";
import { User } from '../types/types';
import InformationUser from "../components/information";
import { Avatar, Button } from "@mui/material";
import Title from "../components/Title";


const ProfilePage = () => {

    const [user, setUser] = useState<User[]>([]);
    const userIDFromSessionStorage = sessionStorage.getItem("userID");
    
    // Get user from database
    async function getUser2() {
        if (userIDFromSessionStorage != null) {
            const userFromDatabase = await getUser(userIDFromSessionStorage).then((doc) => {
                return { id: doc.id, ...doc.data() }
            });
            setUser([userFromDatabase]);
        }
    }
    
    // Call getUser2() when site is loaded
    useEffect(() => {
        getUser2();
    }, []);
    
    return (
        <div className='flex h-screen w-screen text-current flex-wrap flex-row gap-20 bg-slate-100'>
                {user?.map((user) => (
                    <InformationUser key={user.id} user={user} />
                ))}

                <div className="bg-white h-full flex flex-col gap-20 p-10 justify-center">
                    <div className="flex flex-col justify-center gap-5">
                        <Avatar 
                            sx={{
                                width: 128,
                                height: 128,
                                m : 0, 
                                bgcolor: 'primary.main',
                            }}>
                                FE
                        </Avatar>
                        <div className="flex flex-col justify-start text-left">
                            <h1 className="font-bold text-lg">Fornavn Etternavn</h1>
                            <p className="font-thin">@brukernavn</p>                            
                        </div>
              
                    </div>
                    <div className="flex flex-col gap-5">
                        <Button variant="contained" >Mine anonnser</Button>
                        <Button variant="contained" >Likte anonnser</Button>
                        <Button variant="contained" >Rediger profil</Button>
                    </div>
                </div>

                <div className="pt-60 text-left flex flex-col gap-10">
                    <div>
                        <Title heading="Min " span="profil" size="text-7xl"/>
                    </div>
                    <div>
                        <h1 className="text-2xl">subpage title</h1>
                        <div>
                            {/* <AdContainer /> her kommer mine ads, eller annet content */}
                        </div>                        
                    </div>
                </div>
            </div> 
        );
}

export default ProfilePage