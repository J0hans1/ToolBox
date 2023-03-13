import { Review, GoogleUser } from "../types/types";
import { useEffect, useState } from "react";
import { getAdReviews, getUser, getUserFromUid } from "../lib/controller";
import { useAuth } from "../context/AuthContext";
import ReviewComponent from "./ReviewComponent";

//TODO: koble hver review til riktig bruker

function ReviewList() {

    const [reviewsList2, setReview] = useState<Review[]>([]);
    const [users, setUsers] = useState<GoogleUser>();
    const { currentUser } = useAuth();



    async function getReviews() {
        const adID = sessionStorage.getItem("ADID");
        if (adID != null) {
            const reviewFromDatabase = await getAdReviews(adID);
            setReview(reviewFromDatabase);
        }
    }

    useEffect(() => {
        getReviews()
    },
        []);

    async function getUser() {
        const userID = sessionStorage.getItem("USERID");
        if (userID != null) {
            const user = await getUserFromUid(userID);
            setUsers(user);
        }
    }



    useEffect(() => {
        getUser()
    },
        []);


        



    return (
        <div className="">
            <div className="text-3xl text-gray-500 p-2">
                Vurderinger av annonsen
            </div>

            <div className=" flex flex-col overflow-y-auto max-h-60">
                <div className=' w-full text-current justify-center flex-col '>
                    {reviewsList2.map((review) => (
                        <ReviewComponent user={currentUser} adId={review.adId} rating={review.rating} comment={review.comment} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReviewList;



