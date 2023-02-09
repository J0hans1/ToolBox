import { Button } from '@mui/material';
import { useState } from 'react';

const NavButtons = () => {
    return(
        <nav className="flex w-5/6 ml-2">
            <div className='flex w-full justify-between'>
                <div className='flex w-2/6 justify-evenly'>
                    {/* <Button href="/login" variant="text">Om oss</Button> */}
                    <Button href="/#/ads" variant="text">Anonnser</Button>
                </div>
                <div className='flex w-2/6 justify-evenly'>
                    <Button href="/#/login" variant="contained">Login</Button>
                    <Button href="/#/register" variant="outlined">Registrer</Button>
                </div>
            </div>
        </nav>  
    );
}


const Navbar = () => {
    return(
        <div className="w-screen p-4 flex items-center justify-center">
            <div className='w-2/3 flex bg-black rounded-2xl p-3 justify-between'>
                <a href="/#/" className="text-4xl text-white">ToolBox</a>
                <NavButtons/>
            </div>
        </div>
    );
}

export default Navbar;