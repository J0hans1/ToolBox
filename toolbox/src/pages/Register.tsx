import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { addToSessionStorage, addUser, removeFromSessionStorage, validateDuplicateUsername } from "../lib/controller"
import PEOPLE from '../img/people.svg';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Step from '../components/Step'
import { validateAddress, validateCity, validateEmail, validatefirstName, validatelastName, validatePassword, validatePhoneNumber, validateSimilarPasswords, validateUserName, validateZip } from '../lib/validation';


async function validation(firstname: string, lastname: string, 
                            phone: string,email: string, username: string, 
                            password: string, password2: string,
                            address: string, zip: string, city: string) {

    if (!validatefirstName(firstname)){
        alert("Navn kan ikke inneholde tall!");
        return false;
    }
    if (!validatelastName(lastname)){
        alert("Navn kan ikke inneholde tall!");
        return false;
    }
    if (!validatePhoneNumber(phone)){
        alert("Ikke gyldig telefonnummer!");
        return false;
    }
    if (!validateEmail(email)){
        alert("Ikke gyldig epostadresse!");
        return false;
    }
    if (!validateAddress(address)){
        alert("Ikke en gyldig adresse!");
        return false;
    }
    if (!validateZip(zip)){
        alert("Ikke et gyldig postnummer!");
        return false;
    }
    if (!validateCity(city)){
        alert("Ikke en gyldig by!");
        return false;
    }

    if (sessionStorage.getItem("username") !== null) {
        removeFromSessionStorage(); // logger ut fra bruker man er pålogget som
    }
    // Check if the username exists in the database
    if (await validateDuplicateUsername(username)) {
        alert("Brukernavn er allerede i bruk");
        return false;
    }
    if (!validateUserName(username)) {
        alert("Ikke gyldig brukernavn");
        return false;
    }
    if (!validatePassword(password)) {
        alert("Ikke gyldig passord.\nPassord må være minst 4 bokstaver bestående\nav tall, store og små bokstaver!");
        return false;
    }
    if (!validateSimilarPasswords(password, password2)){
        alert("Passordene er ikke like!");
        return false;
    }

    return true;
}

const RegisterPage = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");

    const addNewUser = () => {
        addUser({
            firstname,
            lastname,
            phone,
            email,
            username,
            password,
            address,
            zip,
            city,
            myAds: [],
            savedAds: [],
        })
    }

      

    return (

        <div className="w-screen h-auto" >
            <div id="c_section" className='flex w-full h-full content-center bg-slate-100 overflow-hidden z-10'>
                <div id="c_container" className='static flex flex-row mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl p-10 gap-10 justify-center bg-white'>
                    <div className='flex flex-col w-10/12 text-left pt-32 mb-10'>
                        <div>
                            <img src={PEOPLE} className='h-10' alt="People icon" />
                        </div>

                        <Title size={'text-7xl'} heading={'Registrer '} span={'konto'} description={'Opprett en profil for mulighet til å legge ut annonser eller kontakte utleiere for utlån av verktøy.'} />

                        <div id="PERSONAL_INFO" className='flex flex-col my-5'>
                            <Step nr={'01'} title={'Personlig informasjon'} />
                            <div className='flex flex-row w-full gap-2 my-2'>
                                <TextField fullWidth label="Fornavn" variant="outlined" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                <TextField fullWidth label="Etternavn" variant="outlined" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                            </div>
                            <div className='flex flex-col w-full gap-2'>
                                <TextField label="E-post" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <TextField label="Telefon" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        </div>

                        <div id="ADDRESS_INFO" className='flex flex-col my-5'>
                            <Step nr={'02'} title={'Sted og addresse'} />
                            <div className='flex flex-col w-full gap-2'>
                                <TextField label="Hjemmeadresse" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />
                                <div className='flex flex-row w-full gap-2'>
                                    <TextField label="Postnummer" variant="outlined" value={zip} onChange={(e) => setZip(e.target.value)} />
                                    <TextField fullWidth label="By" variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>

                            </div>
                        </div>

                        <div id="USER_INFO" className='flex flex-col my-5'>
                            <Step nr={'03'} title={'Brukernavn og passord'} />
                            <div className='flex flex-col w-full gap-2'>
                                <TextField label="Brukernavn" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <TextField label="Passord" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <TextField label="Bekreft passord" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                            </div>
                        </div>

                        <Button
                            variant="contained"
                            sx={{p: 2}}
                            onClick={async () => {
                                if (await validation(firstname,lastname,phone,
                                        email, username, password, password2,
                                        address, zip, city)) {
                                            addNewUser();
                                            addToSessionStorage(username); // lagrer brukernavn og brukerID til session storage
                                            alert("Du er nå registrert og logget inn som " + username)
                                            navigate("/"); /* navigerer fra registrersiden til hovedsiden */
                                }
                            }}>Registrer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage