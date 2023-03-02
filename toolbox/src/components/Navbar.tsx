import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectFilters, setFilter } from "../store/FiltersReducer";


const Navbar = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);

    return (
        <div id="c_section" className='fixed top-0 bg-white text-black w-screen h-auto content-center z-20 shadow-md'>
            <div id="c_container" className='relative flex flex-col m-auto w-full max-w-7xl pt-5 px-10 justify-between'>
                <div className='flex flex-row justify-between'>
                    <a href="/#/" className="text-4xl p-3">ToolBox</a>

                    <div className='flex flex-col w-4/5'>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row gap-1 w-3/5'>
                                <TextField fullWidth label={'Søk'} type={'search'} value={filters.search} onChange={(event: any) => {
                                    dispatch(setFilter({ field: "search", value: event.target.value }));
                                }} />
                                <Button color="primary" variant="contained" sx={{ p: 2 }} onClick={() => navigate("/ads")} > Søk </Button> 
                            </div>

                            <div className='flex flex-row gap-1 w-auto'>
                                <Button href="/#/login" variant="contained">Logg inn</Button>
                                <Button color="primary" href="/#/register" variant="outlined">Registrer</Button>
                                <Button color="primary" variant="outlined" onClick={() => navigate("/profile")} > {sessionStorage.getItem("username")} </Button>
                            </div>
                        </div>

                        <div className='flex flex-row m-auto w-full max-w-7xl gap-10 my-4 text-gray-800'>
                            <a href="/#/">Om oss</a>
                            <a href="/#/Ads">Annonser</a>
                            <a href="/#/profile">Min side</a>
                            <a href="/#/">Kategorier</a>
                            <a href="/#/">Avtalevilkår</a>
                        </div>
                    </div>
                </div>

            </div>
            <div className='h-1 bg-pu-gul'> </div>
            {/* <div className="relative w-full p-4 flex items-center justify-center">
                <div className='w-full flex bg-black rounded-2xl p-3 justify-between'>
                </div>
            </div> */}
        </div>
    );
}

export default Navbar;