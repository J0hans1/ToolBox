import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/types";

interface IProps{
    user: User;
}

export default function InformationUser2({user}: IProps){
    let navigate = useNavigate();

    return (
        <div >

            <h1 className="font-bold text-lg">Username: {user.username}</h1>
            <h1 className="font-bold text-lg">Password: {user.password}</h1>
            <h1 className="font-bold text-lg">First name: {user.firstname}</h1>
            <h1 className="font-bold text-lg">Last name: {user.lastname}</h1>
            <h1 className="font-bold text-lg">Phone: {user.phone}</h1>
            <h1 className="font-bold text-lg">Email: {user.email}</h1>
            <h1 className="font-bold text-lg">Address: {user.address}</h1>
            <h1 className="font-bold text-lg">Zip: {user.zip}</h1>
            <h1 className="font-bold text-lg">City: {user.city}</h1>

            <Button variant="contained" onClick={() => navigate("/editprofile")}>Rediger profil</Button>
        </div>
        
        
    )
}