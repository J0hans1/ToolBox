import { useEffect, useState } from "react";
import { getUser } from "../lib/controller";
import { User } from '../types/types';
import { Avatar, Button } from "@mui/material";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import EditUser from "../components/EditUser";
import ProfileSidebar from "../components/ProfileBar";




const ProfilePage = () => {
    let navigate = useNavigate();
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
        <div className='flex w-screen h-auto text-current flex-wrap flex-row gap-20 bg-slate-100'>
            <div className="flex flex-col">
                    {user?.map((user) => (
                    <ProfileSidebar user={user} key={user.id} />
                ))}
            </div>
            <div className="pt-60 text-left flex flex-col gap-10 pb-10">
                <div>
                    <Title heading="Min " span="profil" size="text-7xl"/>

                </div>
                <div className="flex flex-row">
                    <div>
                        {user?.map((user) => (
                            <EditUser key={user.id} user={user} /> 
                        ))}
                    </div>                     
                </div>
            </div>
        </div> 
    );
}

export default ProfilePage