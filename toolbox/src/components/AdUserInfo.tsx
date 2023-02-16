import { Avatar } from "@mui/material";
import { amber } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";

interface Mail{
    mailto?: string;
    label?: string;
}

const ButtonMailto = (props: Mail) => {
    return (
        <Link
            to='#'
            onClick={(e) => {
                if (props.mailto !== undefined) {
                window.location.href = props.mailto;
                e.preventDefault();
            }
            }}
        >
            {props.label}
        </Link>
    );
};


interface Info {
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
}

const AdUserInfo = (props: Info) => {
    return (
        <div className='rounded-lg w-auto h-96 shadow-lg hover:shadow-2xl justify-center'>

            <div className="flex flex-row w-3/4 h-1/4 ml-10 gap-10 mt-5 p-8" >
                <Avatar sx={{ bgcolor: amber[500], width: 70, height: 70 }}>AO</Avatar>
                <div className="text-left justify-start pb-5 ">
                    <h2 className="text-5xl mt-2 font-bold">{props.name}</h2>
                </div>
            </div>

           <div className="font-bold text-left p-8 pt-20 flex-wrap justify-center">
            <p>Kontakt utleier for å avtale leie eller utlån: </p>
            </div>
            <div className="flex flex-row font-bold ">
                <img className="h-10 ml-5" src="https://img.icons8.com/ios/512/message-squared.png" />
                <ButtonMailto label="Kontakt på mail" mailto={props.email} />
                <img className="h-10 ml-5" src="https://img.icons8.com/ios/512/phone.png" />
                <p className="ml-5 pr-5">Kontakt på telefon: {props.phone} </p>

            </div>


        </div>
    )
}

export default AdUserInfo;