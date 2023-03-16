import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectAdFilters, setAdFilter } from "../store/AdFiltersReducer";
import { useAuth } from '../context/AuthContext';
import { Snack, SnackbarContext } from '../context/Context';
import { useState, useContext, useEffect } from 'react';

const Navbar = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const AdFilters = useSelector(selectAdFilters);
    const { currentUser, logout, login } = useAuth();
    const { setSnack } = useContext(SnackbarContext);
    const [disableButton, setDisableButton] = useState(false);
    const [image, setImage] = useState<string>("");

    useEffect(() => {
        if (currentUser?.photoURL !== null && currentUser?.photoURL !== undefined) {
            setImage(currentUser?.photoURL);
        }
    }, [currentUser]);

    const handleClickLogin = async () => {
        setDisableButton(true);
        await login().then((res) => {
            setDisableButton(true);
            if (res) {
                navigate('/');
                setSnack(new Snack({ message: 'Du har logget inn!', color: 'success', autoHideDuration: 5000, open: true }));
            }
        }).catch((err) => {
            setDisableButton(false);
            setSnack(new Snack({ message: 'Noe gikk galt!', color: 'error', autoHideDuration: 5000, open: true }));
        });
        setDisableButton(false);
    };

    const handleClickLogout = async () => {
        await logout().then((res) => {
            setDisableButton(true);
            navigate('/');
            setSnack(new Snack({ message: 'Du har logget ut!', color: 'success', autoHideDuration: 5000, open: true }));

        }).catch((err) => {
            setDisableButton(false);
            setSnack(new Snack({ message: 'Noe gikk galt!', color: 'error', autoHideDuration: 5000, open: true }));
        });
        setDisableButton(false);
    };

    return (
        <div id="c_section" className='fixed top-0 bg-white text-black w-screen h-auto content-center z-20 shadow-md'>
            <div id="c_container" className='relative flex flex-col m-auto w-full max-w-7xl pt-5 px-10 justify-between'>
                <div className='flex flex-row justify-between'>
                    <Button onClick={() => navigate("/")} className="text-4xl p-3">ToolBox</Button>

                    <div className='flex flex-col w-4/5'>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row gap-1 w-3/5'>
                                <TextField fullWidth label={'Søk etter produkt'} type={'search'} value={AdFilters.search} onChange={(event: any) => {
                                    dispatch(setAdFilter({ field: "search", value: event.target.value }));
                                }} />
                                <Button color="primary" variant="contained" sx={{ p: 2 }} onClick={() => navigate("/ads")} > Søk </Button>
                            </div>

                            <div className='flex flex-row gap-1 w-auto'>
                                {currentUser ? (
                                    // if user is logged in, render logout button
                                    <div className='flex flex-row gap-1 w-auto'>
                                        <Button disabled={disableButton} onClick={handleClickLogout} variant="contained">
                                            Logg ut
                                        </Button>
                                        <Button color="primary" variant="outlined" onClick={() => navigate("/profile")} >
                                            <img src={image} alt="User profile" style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px' }} />
                                            {currentUser?.displayName}
                                        </Button>
                                    </div>
                                ) : (
                                    // if user is not logged in, render login button
                                    <Button disabled={disableButton} onClick={handleClickLogin} variant="contained">Logg inn</Button>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-row m-auto w-full max-w-7xl gap-10 my-4 text-gray-800'>
                            {currentUser ? (
                                // if user is logged in, render logout button
                                <div className='flex flex-row gap-1 w-auto'>
                                    <Button onClick={() => navigate("/")}>Om oss</Button>
                                    <Button onClick={() => navigate("/ads")}>Annonser</Button>
                                    <Button onClick={() => navigate("/profile")} >Min side</Button>
                                    <Button onClick={() => navigate("/FAQ")}>FAQ</Button>
                                </div>
                            ) : (
                                <div className='flex flex-row gap-1 w-auto'>
                                    <Button onClick={() => navigate("/")}>Om oss</Button>
                                    <Button onClick={() => navigate("/ads")}>Annonser</Button>
                                    <Button onClick={() => navigate("/FAQ")}>FAQ</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
            <div className='h-1 bg-pu-gul'> </div>
        </div>
    );
}

export default Navbar;
