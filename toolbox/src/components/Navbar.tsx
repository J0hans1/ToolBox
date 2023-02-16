import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavButtons = () => {
    let navigate = useNavigate();
    return(
        <nav className="flex w-5/6 ml-2">
            <div className='flex w-full justify-between'>
                <div className='flex w-2/6 justify-evenly'>
                    {/* <Button href="/login" variant="text">Om oss</Button> */}
                    <Button color="secondary" href="/#/ads" variant="text">Annonser</Button>
                </div>
                <div className='flex w-2/6 justify-evenly'>
                    
                    <Button href="/#/login" variant="contained">Login</Button>
                    <Button color="secondary" href="/#/register" variant="outlined">Registrer</Button>
                </div>
                <div className='flex w-2/6 justify-evenly'>
                    {/* Knapp som viser brukernavnet man er logget inn på. Når en klikker på knapper refreshes siden, og brukernavnet kommer opp. */}
                    <Button color="secondary" variant="outlined" onClick={() => navigate("/profile")} > {sessionStorage.getItem("username")} </Button> {/* Oppdateres kun på refresh */}
                </div>
            </div>
        </nav>  
    );
}


const Navbar = () => {
    return(
        <div className=" w-full flex">
            <div className='w-full flex bg-black rounded-2xl p-3 justify-between'>
                <a href="/#/" className="text-4xl text-white">ToolBox</a>
                <NavButtons/>
            </div>
        </div>
    );
}

export default Navbar;