import { Button, TextField } from '@mui/material';

const LoginPage = () => {
    return(
        <div className='flex w-screen justify-center mt-10'>
            <div className='flex flex-col w-1/2 justify-between h-60' >
                <TextField label="Brukernavn" variant="outlined"/>
                <TextField label="Passord" variant="outlined"/>
                <Button variant="contained">Login</Button>
            </div>
        </div>
        
    );
}

export default LoginPage