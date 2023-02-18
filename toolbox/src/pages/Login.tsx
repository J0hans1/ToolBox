import { Button, TextField } from '@mui/material';
import PEOPLE from '../img/people.svg';
import { useNavigate } from "react-router-dom";
import { removeFromSessionStorage, validateUser } from '../lib/controller';
import { useState } from 'react';
import Title from '../components/Title';


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

const LoginPage = () => {

    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    return (
        <div className="w-screen h-screen" >

            <div id="c_section" className='flex w-full h-full content-center bg-slate-100 overflow-hidden z-10'>
                <div id="c_container" className='static flex flex-row h-screen m-auto w-full max-w-7xl p-10 gap-10 justify-center bg-white'>
                    {/* <div className='flex flex-col justify-between w-1/4 bg-yellow-400 h-full'></div> */}
                    <div className='flex flex-col w-10/12 text-left pt-32 mb-10'>
                        <div>
                            <img src={PEOPLE} className='h-10' alt="People icon" />
                        </div>

                        <Title size={'text-7xl'} heading={'Logg '} span={'inn'} description={''} />


                        <div id="LOGIN_USER" className='flex flex-col my-5'>
                            <div className='flex flex-col w-full gap-2'>
                                <TextField color="primary" label="Brukernavn" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <TextField color="primary" label="Passord" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                                <Button
                                    variant="contained"
                                    sx={{ p: 2 }}
                                    onClick={async () => {
                                        if (await validation(username, password)) {
                                            alert("Du er nå logget inn på bruker: " + username);
                                            navigate("/");  /* navigerer fra loginpage til hovedsiden */
                                        }
                                    }}>Logg inn
                                </Button>

                                <Button
                                    color="info"
                                    variant="contained"
                                    sx={{ p: 2 }}
                                    href="/#/Register">Registrer bruker
                                </Button>



                                <Button
                                    variant="outlined"
                                    sx={{ p: 2 }}
                                    onClick={() => {
                                        removeFromSessionStorage(); // fjerner brukernavn og brukerID fra session storage
                                        console.log("Logged out");
                                        alert("Du er nå logget ut");
                                    }}>Logg ut
                                </Button>
                            </div>
                        </div>



                    </div>
                </div>

            </div>

        </div>


    );
}

export default LoginPage