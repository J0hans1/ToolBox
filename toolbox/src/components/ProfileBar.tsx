import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";


const ProfileBar = () => {
    let navigate = useNavigate();
    const { currentUser } = useAuth();
    const [image, setImage] = useState<string>("");

    useEffect(() => {
        if (currentUser?.photoURL !== null && currentUser?.photoURL !== undefined) {
            setImage(currentUser?.photoURL);
        }
    }, [currentUser]);

    return (
        <div className="bg-white h-full flex flex-col gap-20 p-10 justify-start pt-64">
            <div className="flex flex-col justify-center gap-5">
                <img className="h-40 w-full " src={image} alt="" />
                <div className="flex flex-col justify-start text-left">
                    <h1 className="font-bold text-lg">{currentUser?.displayName}</h1>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Button variant="contained" sx={{ p: 2 }} onClick={() => navigate("/profile")}>Min profil</Button>
                <Button variant="contained" sx={{ p: 2 }} onClick={() => navigate("/myads")}>Mine annonser</Button>
                <Button variant="contained" sx={{ p: 2 }} onClick={() => navigate("/savedads")}>Lagrede annonser</Button>
                <Button variant="contained" sx={{ p: 2 }} onClick={() => navigate("/myReservations")}>Mine reservasjoner</Button>

            </div>
        </div>
    );
}

export default ProfileBar;