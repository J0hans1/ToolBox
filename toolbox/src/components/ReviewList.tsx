import { Review, GoogleUser } from "../types/types";
import ReviewComponent from "./ReviewComponent";

interface Props {
    reviews: Review[];
    users: GoogleUser[];
  }

function ReviewList(props: Props) {

    return (
        <div className="">
            <div className="text-3xl text-gray-500 p-2">
                Vurderinger av annonsen
            </div>

            <div className=" flex flex-col overflow-y-auto max-h-60">
                <div className=' w-full text-current justify-center flex-col '>
                    {props.reviews.map((review, index) => (
                        <ReviewComponent user={props.users[index]} adId={review.adId} rating={review.rating} comment={review.comment} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReviewList;



