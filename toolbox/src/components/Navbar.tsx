import { Button, TextField } from '@mui/material';

const NavButtons = () => {
    return(
        <nav className="flex w-5/6 ml-2">
            <div className='flex w-full justify-between'>
                <div className='flex w-2/6 justify-evenly'>
                    {/* <Button href="/login" variant="text">Om oss</Button> */}
                    <Button color="secondary" href="/#/ads" variant="text">Anonnser</Button>
                </div>
                <div className='flex w-2/6 justify-evenly'>
                    
                    <Button href="/#/login" variant="contained">Login</Button>
                    <Button color="secondary" href="/#/register" variant="outlined">Registrer</Button>
                </div>
                <div className='flex w-2/6 justify-evenly'>
                    {/* Knapp som viser brukernavnet man er logget inn på. Når en klikker på knapper refreshes siden, og brukernavnet kommer opp. */}
                    <Button color="secondary" variant="outlined" onClick={() => window.location.reload()} > {sessionStorage.getItem("username")} </Button> {/* Oppdateres kun på refresh */}
                </div>
            </div>
        </nav>  
    );
}


const Navbar = () => {
    return(
        <div className="absolute w-screen p-4 flex items-center justify-center">
            <div className='w-2/3 flex bg-black rounded-2xl p-3 justify-between'>
                <a href="/#/" className="text-4xl text-white">ToolBox</a>
                <NavButtons/>
            </div>
        </div>
    );
}

export default Navbar;