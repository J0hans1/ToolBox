import { useState } from "react";
import { User } from '../types/types';
import { useNavigate } from "react-router-dom";
import InformationUser2 from "../components/userInf";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface IProps{
    user: User;
}



const EditProfile = () => { //TODO: bytte til function og legge til user som props



    let navigate = useNavigate();
    const [user2, setUser] = useState<User[]>([]);

/*     const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [zip, setZip] = useState(user.zip);
    const [city, setCity] = useState(user.city); */

    function saveChanges(){
        //TODO: Save changes to database
    }

    return (
        <div className='flex h-screen w-screen text-current flex-wrap flex-row gap-20 bg-slate-100'>

{/*         <br />
        <TextField color="primary" label="Brukernavn" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value) } disabled={true}/>
        <br />
        <TextField color="primary" label="Passord" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <TextField color="primary" label="Fornavn" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        <br />
        <TextField color="primary" label="Etternavn" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        <br />
        <TextField color="primary" label="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)}  />
        <br />
        <TextField color="primary" label="Epost" value={email} onChange={(e) => setEmail(e.target.value)}  />
        <br />
        <TextField color="primary" label="Adresse" value={address} onChange={(e) => setAddress(e.target.value)} />
        <br />
        <TextField color="primary" label="Postnummer" value={zip} onChange={(e) => setZip(e.target.value)}  />
        <br />
        <TextField color="primary" label="Poststed" value={city} onChange={(e) => setCity(e.target.value)}  /> 
        <br />
        <Button variant="contained" onClick={() => saveChanges()}>Rediger profil</Button> */}
        </div>

    );
}   

export default EditProfile;