import { Avatar } from "@mui/material";
import { amber } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";

interface Mail{
    mailto: string;
    label: string;
}

const ButtonMailto = (props: Mail) => {
    return (
        <Link
            to='#'
            onClick={(e) => {
                window.location.href = props.mailto;
                e.preventDefault();
            }}
        >
            {props.label}
        </Link>
    );
};


interface Info {
    name: string;
    email: string;
    phone: string;
    avatar: string;
}

const AdUserInfo = (props: Info) => {
    return (
        <div className='rounded-lg w-1/3 h-96 shadow-lg overflow-hidden hover:shadow-2xl active:scale-100 duration-200 m-3'>

            <div className="flex flex-row w-3/4 h-1/4 ml-10 gap-10 mt-5 p-8" >
                <Avatar sx={{ bgcolor: amber[500], width: 70, height: 70 }}>TH</Avatar>
                <div className="text-left justify-start">
                    <h2 className="text-5xl mt-2 font-bold flex flex-row">{props.name}</h2>
                </div>
            </div>
            <br/>
            <br/>
            <p className="font-bold">Kontakt utleier for å avtale leie eller utlån: </p>

            <br />
            <div className="flex flex-row font-bold ">
                <img className="h-10 ml-5" src="https://img.icons8.com/ios/512/message-squared.png" />
                <ButtonMailto label="Kontakt på mail" mailto="mailto:no-reply@example.com" />
                <img className="h-10 ml-5" src="https://img.icons8.com/ios/512/phone.png" />
                <p className="ml-5">Kontakt på telefon</p>

            </div>


        </div>
    )
}

export default AdUserInfo;