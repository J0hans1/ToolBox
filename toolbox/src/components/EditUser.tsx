import { updateUser, deleteUser, removeFromSessionStorage } from "../lib/controller";
import { User } from "../types/types";
import {TextField, Button} from '@mui/material';
import { useState } from "react";
import { validateSimilarPasswords } from "../lib/validation";
import { useNavigate } from "react-router-dom";

interface IProps{
    user: User;
}

export default function EditUser({user}: IProps){
    let navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);

    // states for all the textfields
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [zip, setZip] = useState(user.zip);
    const [city, setCity] = useState(user.city);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [password2, setPassword2] = useState(user.password);

    function deleteUserButton(){
        const userIDFromSessionStorage = sessionStorage.getItem("userID");
        if (userIDFromSessionStorage != null){
            deleteUser(userIDFromSessionStorage);
            removeFromSessionStorage();
            alert("Brukeren ble slettet");
            navigate("/");
        }
    }


    function updateUserButton(){
        if (firstname != null && lastname != null && email != null && phone != null && address != null && zip != null && city != null && username != null && password != null && password2 != null){
            if (!validateSimilarPasswords(password, password2)){
                alert("Passordene er ikke like!");
                return;
            }
            validateSimilarPasswords(password, password2);
            const userIDFromSessionStorage = sessionStorage.getItem("userID");

            if (userIDFromSessionStorage != null){
                const user2 = {
                    id: userIDFromSessionStorage,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    phone: phone,
                    address: address,
                    zip: zip,
                    city: city,
                    username: username,
                    password: password
                }
                updateUser(userIDFromSessionStorage, user2);
                alert("Brukeren ble oppdatert");
                editMode ? setEditMode(false) : setEditMode(true);
            }
        }
    }


    return (
        <div className="flex gap-2 flex-col">
           
            <div id="PERSONAL_INFO" className='flex flex-col my-5'>
            <div className='flex flex-row w-full gap-2 my-2'>
                <TextField disabled={!editMode} fullWidth label="Fornavn" value={firstname} variant="outlined" onChange={(e) => setFirstname(e.target.value)} />
                <TextField disabled={!editMode} fullWidth label="Etternavn" variant="outlined" value={lastname} onChange={(e) => setLastname(e.target.value)} />
            </div>
            <div className='flex flex-col w-full gap-2'>
                <TextField disabled={!editMode} label="E-post" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField disabled={!editMode} label="Telefon" variant="outlined" value ={phone} onChange={(e) => setPhone(e.target.value)}/>
            </div>
        </div>

        <div id="ADDRESS_INFO" className='flex flex-col my-5'>
            <div className='flex flex-col w-full gap-2'>
                <TextField disabled={!editMode} label="Hjemmeadresse" variant="outlined" value ={address} onChange={(e) => setAddress(e.target.value)}/>
                <div className='flex flex-row w-full gap-2'>
                    <TextField disabled={!editMode} label="Postnummer" type="number" variant="outlined" value ={zip} onChange={(e) => setZip(e.target.value)}/>
                    <TextField disabled={!editMode} fullWidth label="By" variant="outlined" value ={city} onChange={(e) => setCity(e.target.value)}/>
                </div>

            </div>
        </div>

        <div id="USER_INFO" className='flex flex-col my-5'>
            <div className='flex flex-col w-full gap-2'>
                <TextField disabled={!editMode} label="Brukernavn" variant="outlined" value ={username} onChange={(e) => setUsername(e.target.value)}/>
                <TextField disabled={!editMode} label="Passord" type="password" value ={password} onChange={(e) => setPassword(e.target.value)}/>
                <div
                    style={
                    {display: editMode ? 'block' : 'none'}
                }>
                    <TextField disabled={!editMode} label="Passord" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                </div>
            </div>
        </div>
 
            <div className="flex flex-row gap-2" > 
                <Button 
                    sx={{p:2}}
                    onClick={
                        () => setEditMode(!editMode)
                    } 
                    variant='contained'
                >
                    {editMode ? 'Avbryt endring' : 'Endre brukerinfo'}
                </Button>

                <div style={{display: editMode ? 'block' : 'none'}}>
                    <Button 
                        sx={{p:2}}
                        onClick={
                            () => updateUserButton()
                        } 
                        variant="outlined"
                    >
                        Lagre endringer
                    </Button>
                </div>

                <div style={{display: editMode ? 'block' : 'none'}}>
                    <Button 
                        sx={{p:2}}
                        onClick={
                            () => deleteUserButton()
                        } 
                        variant="outlined"
                    >
                        Slett bruker
                    </Button>
                </div>
            </div>
        </div>
    );
}

            