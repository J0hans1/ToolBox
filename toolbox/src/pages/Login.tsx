import { Button, TextField } from '@mui/material';
import PEOPLE from '../img/people.svg';
import { useNavigate } from "react-router-dom";
import { addToSessionStorage, removeFromSessionStorage, validateUser } from '../lib/controller';
import { useState } from 'react';


// Check for valid input on Login
async function validation(username: string, password: string) {
    // Check if user is already logged in
    if (sessionStorage.getItem("username") !== null) {
        alert("Du er allerede logget inn");
        return false;
    }
    // Check if username and password is longer than 3 characters
    if (username.length < 3 || password.length < 3) {
        alert("Brukernavn og passord må være lengre enn 3 tegn");
        return false;
    }
    // Check if user exists in database
    if (await validateUser(username, password)) {
        return true;
    } else {
        alert("Brukernavn eller passord er feil");
        return false; 
    }
}


const Header = () => {
    return (
        <div id="c_section" className='flex h-1/4 content-center'>
            <div id="c_container" className='flex mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl'>
                <div id="c_wrapper" className='max-w-3xl text-left'>
                    <h1 className='text-7xl mb-4'>Logg <span className="bg-yellow-300">inn</span></h1>
                </div>
            </div>
        </div>
    );
}

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    return(
        <div className="h-screen" >
            <div className='flex h-full'>
                <div className='flex flex-col justify-between w-1/4 bg-yellow-400 h-full'></div>
                <div className='flex flex-col w-2/4 p-6 pt-40' >
                    <div>
                        <img src={PEOPLE} className='h-10' alt="People icon"/>
                    </div>
                    <Header/>
                    <div className='flex flex-col h-3/4'>
                        <div className='flex justify-between h-32 flex-col'>
                            <TextField color="primary" label="Brukernavn" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <TextField color="primary" label="Passord" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>                              
                        </div>
                        
                        <div className='mt-10'>   
                            <Button 
                            color="primary" 
                            variant="contained" 
                            onClick={async () => {
                                if (await validation(username, password)) {
                                    navigate("/");  /* navigerer fra loginpage til hovedsiden */
                            }}}>Login</Button>
                            <Button 
                            color="primary" 
                            variant="contained" 
                            onClick={() => {
                                removeFromSessionStorage(); // fjerner brukernavn og brukerID fra session storage
                                console.log("Logged out");
                                }}>Logout</Button>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default LoginPage