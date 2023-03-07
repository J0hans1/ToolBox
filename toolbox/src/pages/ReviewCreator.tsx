import { TextField, Button } from "@mui/material";
import { useContext, useState } from "react";
import { addReview, checkReview } from "../lib/controller";
import Title from "../components/Title";
import Step from "../components/Step";
import { useNavigate } from "react-router-dom";
import { NewReview } from "../types/types";
import { Snack, SnackbarContext } from "../context/SnackbarContext";


const ReviewCreator = () => {
    let navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const {setSnack} = useContext(SnackbarContext);


    const handleOnClick = async () => {
        if (sessionStorage.getItem("username") === null) {
            setSnack(new Snack({message: 'Du må være logget inn for å opprette en annonse!', color:'warning', autoHideDuration:5000, open: true}));
            return;
        }
        const adId = sessionStorage.getItem("ADID");
        if (adId === null) {
            setSnack(new Snack({message: 'Noe gikk galt, prøv igjen senere', color:'warning', autoHideDuration:5000, open: true}));  
            return;
        }

        if (review === "") {
            setSnack(new Snack({message: 'Alle felt må fylles ut', color:'warning', autoHideDuration:5000, open: true}));
            return;
        }

        const userId = sessionStorage.getItem("userID");
        if (userId !== null) {
            // check if the user has already reviewed the ad
            if (await checkReview(userId, adId) === true) {
                setSnack(new Snack({message: 'Du har allerede anmeldt denne annonsen', color:'warning', autoHideDuration:5000, open: true}));
                return;
            }


            const newReview: NewReview = {
                userId: userId,
                adId: adId,
                rating: rating,
                comment: review,
            }
            const res = await addReview(newReview);
            if (res === true) {
                setSnack(new Snack({message: 'Anmeldelse lagt til', color:'warning', autoHideDuration:5000, open: true}));
                navigate("/adinspector/" + adId);
            } else {
                setSnack(new Snack({message: 'Noe gikk galt, prøv igjen senere', color:'warning', autoHideDuration:5000, open: true}));
            }

        }
    }


    //TODO add rating stars from mui, with max and min value
    return (
        <div>
            <div id="c_section" className='flex w-full h-full content-center bg-slate-100 overflow-hidden z-10'>
                <div id="c_container" className='static flex flex-row mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl p-10 gap-10 justify-center bg-white'>
                    <div className='flex flex-col w-10/12 text-left pt-32 mb-10'>

                        <Title size={'text-7xl'} heading={'Opprett '} span={'anmeldelse'} description={'Gi en tilbakemelding på produktet du har lånt!'} />

                        <div id="RATING" className='flex flex-col my-5'>
                            <Step nr={'01'} title={'Velg fra 0-5'} />
                            <p>Velg en passende rating på produktet.</p>

                            <div className='flex flex-col w-full mt-5 gap-2'>
                                <TextField label="Rating" type="number" InputLabelProps={{ shrink: true, }} value={rating} onChange={(e) => { setRating(parseInt(e.target.value)) }} />
                            </div>
                        </div>

                        <div id="REVIEW" className='flex flex-col my-5'>
                            <Step nr={'02'} title={'Anmeldelse'} />
                            <p> Skriv en anmeldelse av produktet. </p>
                            <div className='flex flex-col w-full mt-5 gap-2 my-2'>
                                <TextField fullWidth multiline minRows={5} label="Anmeldelse" variant="outlined" value={review} onChange={(e) => { setReview(e.target.value) }} />
                            </div>
                        </div>

                        <div className='flex flex-col w-full gap-2 my-2'>
                            <Button variant="contained" color="primary" sx={{ p: 2 }} onClick={() => handleOnClick()}> Publiser anmeldelse </Button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCreator;