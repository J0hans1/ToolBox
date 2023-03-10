import { updateUser, deleteUser } from "../lib/controller";
import { GoogleUser } from "../types/types";
import { TextField, Button } from '@mui/material';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snack, SnackbarContext } from "../context/SnackbarContext";
import { useAuth } from "../context/AuthContext";


export default function EditUser() {
    let navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const { setSnack } = useContext(SnackbarContext);
    const { currentUser, setCurrentUser, logout } = useAuth();
    const [displayName, setDisplayName] = useState(currentUser?.displayName);
    const [phone, setPhone] = useState(currentUser?.phoneNumber);

    async function deleteUserButton() {
        const confirm = window.confirm("Er du sikker på at du vil slette brukeren din? Dette kan ikke angres!");
        if (confirm) {
            if (currentUser?.id != null) {
                await deleteUser(currentUser?.id).then(async () => {
                    await logout().then(() => {
                        setSnack(new Snack({ message: 'Brukeren ble slettet!', color: 'success', autoHideDuration: 5000, open: true }))
                        navigate("/");
                    }).catch((err) => {
                        setSnack(new Snack({ message: 'Noe gikk galt!', color: 'error', autoHideDuration: 5000, open: true }))
                    })
                    
                }).catch((err) => {
                    setSnack(new Snack({ message: 'Noe gikk galt!', color: 'error', autoHideDuration: 5000, open: true }))
                }
                )
            }
        }
    }

    function updateUserButton() {
        if (currentUser?.id != null) {
            const user2: GoogleUser = {
                id: currentUser?.id,
                uid: currentUser?.uid,
                displayName: displayName,
                email: currentUser?.email,
                phoneNumber: phone,
                photoURL: currentUser?.photoURL,
                myAds: currentUser?.myAds,
                savedAds: currentUser?.savedAds,
                myReviews: currentUser?.myReviews,
            }
            updateUser(currentUser?.id, user2);
            editMode ? setEditMode(false) : setEditMode(true);
            setSnack(new Snack({ message: 'Bruker er oppdatert!', color: 'success', autoHideDuration: 5000, open: true }))
            // update context 
            if (user2 !== null && user2 !== undefined && setCurrentUser !== undefined) {
                setCurrentUser(user2);
            }
        }
    }

    return (
        <div className="flex gap-2 flex-col">

            <div id="PERSONAL_INFO" className='flex flex-col my-5'>
                <div className='flex flex-col w-full gap-2'>
                    <TextField  variant="outlined" value={currentUser?.email} disabled={true} />
                </div>
            </div>
            <div id="PERSONAL_INFO" className='flex flex-col my-5'>
                <div className='flex flex-col w-full gap-2'>
                    <TextField disabled={!editMode} label="Telefon" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
            </div>

            <div id="PERSONAL_INFO" className='flex flex-col my-5'>
                <div className='flex flex-col w-full gap-2'>
                    <TextField disabled={!editMode} label="Navn" variant="outlined" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
            </div>

            <div className="flex flex-row gap-2" >
                <Button
                    sx={{ p: 2 }}
                    onClick={
                        () => setEditMode(!editMode)
                    }
                    variant='contained'
                >
                    {editMode ? 'Avbryt endring' : 'Endre brukerinfo'}
                </Button>

                <div style={{ display: editMode ? 'block' : 'none' }}>
                    <Button
                        sx={{ p: 2 }}
                        onClick={
                            () => updateUserButton()
                        }
                        variant="outlined"
                    >
                        Lagre endringer
                    </Button>
                </div>

                <div style={{ display: editMode ? 'block' : 'none' }}>
                    <Button
                        sx={{ p: 2 }}
                        onClick={
                            async () => await deleteUserButton()
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