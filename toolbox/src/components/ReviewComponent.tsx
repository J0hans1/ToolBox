import StaticRatingStars from "./StaticRatingStars";
import { GoogleUser } from "../types/types";
import { useEffect, useState } from "react";


interface Review {
    id?: string;
    user?: GoogleUser;
    adId?: string;
    rating?: number;
    comment?: string;
}





export default function ReviewComponent(props: Review) {

    const [image, setImage] = useState<string>("");

    useEffect(() => {
        if (props.user?.photoURL) {
            setImage(props.user?.photoURL);
        }
    }, [props.user?.photoURL]);

    return (
        <div className=" p-5 rounded-md mt-2 shadow">
            <div className="flex flex-row justify-between">
                <img src={image} alt="User profile" style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '8px' }} />
                <div className="w-full p-3">
                    {props.user?.displayName}
                    <div className="m-3 aligin-right text-right content-end">
                        <StaticRatingStars value={Number(props.rating)} />
                        <div className="mt-5">
                            {props.comment}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

};



