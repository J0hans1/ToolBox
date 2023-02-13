import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useState } from 'react';
import { addToSessionStorage, addUser, removeFromSessionStorage, validateUsername } from "../lib/controller"
import PEOPLE from '../img/people.svg';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    return (
        <div id="c_section" className='flex h-1/4 content-center'>
            <div id="c_container" className='flex mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl'>
                <div id="c_wrapper" className='max-w-3xl text-left'>
                    <h1 className='text-7xl mb-4'>Registrer <span className="bg-yellow-300"> Konto</span></h1>
                </div>
            </div>
        </div>
    )
}


async function validation(username: string, password: string, location: string) {
    if (sessionStorage.getItem("username") !== null) {
        removeFromSessionStorage(); // logger ut fra bruker man er pålogget som
    }
    // Check if the username exists in the database
    if (await validateUsername(username)) {
        alert("Brukernavn er allerede i bruk");
        return false;
    }
    if (username.length < 3) {
        alert("Brukernavn må være lengre enn 3 tegn");
        return false;
    }
    if (password.length < 3) {
        alert("Passord må være lengre enn 3 tegn");
        return false;
    }
    if (location === "") {
        alert("Du må velge et sted");
        return false;
    }
    return true;
}



const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");

    let navigate = useNavigate();

    const addNewUser = () => {
        addUser({
            username,
            password,
            location,
        })
    }

    return(
        <div className="h-screen" >
            <div className='flex h-full'>
                <div className='flex flex-col justify-between w-1/4 bg-yellow-400 h-full'></div>
                <div className='flex flex-col w-2/4 p-6' >
                    <div>
                        <img src={PEOPLE} className='h-10' alt="People icon"/>
                    </div>
                    <Header/>
                    <div className='flex flex-col h-3/4'>
                        <div className='flex justify-between h-32 flex-col'>
                            <TextField label="Brukernavn" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <TextField label="Passord" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>                                                    
                        </div>
                        <div className='mt-10'>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Sted</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                                    <FormControlLabel value="Fredrikstad" control={<Radio />} label="Fredrikstad" />
                                    <FormControlLabel value="Trondheim" control={<Radio />} label="Trondheim" />
                                    <FormControlLabel value="Oslo" control={<Radio />} label="Oslo" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className='mt-10'>   
                            <Button 
                            variant="contained" 
                            onClick={async () => {  
                                if (await validation(username, password, location)) {
                                    addNewUser();
                                    addToSessionStorage(username); // lagrer brukernavn og brukerID til session storage
                                    navigate("/"); /* navigerer fra registrersiden til hovedsiden */
                                }
                            }}>Registrer</Button>
                        </div>
                    </div>  
                </div>
            </div>
        </div>

        
    );
}

export default RegisterPage
