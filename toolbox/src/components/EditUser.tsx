import { deleteUser } from "../lib/controller";
import { User } from "../types/types";
import Step from "./Step";
import {TextField, Button} from '@mui/material';
import react from "react";
import { useState } from "react";



interface IProps{
    user: User;
}

function deleteUserButton(user: string){
    if (user != null)
        deleteUser(user);
}

export default function EditUser({user}: IProps){
    const [editMode, setEditMode] = useState(false);

    return (
        <div className="flex gap-2 flex-col">
           
            <div id="PERSONAL_INFO" className='flex flex-col my-5'>
            <div className='flex flex-row w-full gap-2 my-2'>
                <TextField disabled={!editMode} fullWidth label="Fornavn" defaultValue={user.firstname} variant="outlined"  />
                <TextField disabled={!editMode} fullWidth label="Etternavn" defaultValue={user.lastname} variant="outlined"  />
            </div>
            <div className='flex flex-col w-full gap-2'>
                <TextField disabled={!editMode} label="E-post" defaultValue={user.email} variant="outlined"/>
                <TextField disabled={!editMode} label="Telefon" defaultValue={user.phone} variant="outlined" />
            </div>
        </div>

        <div id="ADDRESS_INFO" className='flex flex-col my-5'>
            <div className='flex flex-col w-full gap-2'>
                <TextField disabled={!editMode} label="Hjemmeadresse" defaultValue={user.address} variant="outlined"/>
                <div className='flex flex-row w-full gap-2'>
                    <TextField disabled={!editMode} label="Postnummer" type="number" defaultValue={user.zip} variant="outlined"/>
                    <TextField disabled={!editMode} fullWidth label="By" defaultValue={user.city} variant="outlined"/>
                </div>

            </div>
        </div>

        <div id="USER_INFO" className='flex flex-col my-5'>
            <div className='flex flex-col w-full gap-2'>
                <TextField disabled={!editMode} label="Brukernavn" defaultValue={user.username} variant="outlined" />
                <TextField disabled={!editMode} label="Passord" defaultValue={user.password} type="password"/>
                <div
                    style={
                    {display: editMode ? 'block' : 'none'}
                }>
                    <TextField disabled={!editMode} label="Passord" defaultValue={user.password} type="password"/>
                </div>
            </div>
        </div>
 
            <div className="flex flex-row gap-2">
                <Button 
                    sx={{p:2}}
                    onClick={
                        () => setEditMode(!editMode)
                    } 
                    variant='contained'
                >
                    {editMode ? 'Lagre endringer' : 'Endre brukerinfo'}
                </Button>

                <div style={{display: editMode ? 'block' : 'none'}}>
                    <Button 
                        sx={{p:2}}
                        onClick={
                            () => setEditMode(!editMode)
                        } 
                        variant="outlined"
                    >
                        Avbryt endring
                    </Button>
                </div>
            </div>
        </div>
    );
}
            