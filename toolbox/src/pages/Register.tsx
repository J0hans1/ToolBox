import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import PEOPLE from '../img/people.svg';

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

const RegisterPage = () => {
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
                            <TextField label="Brukernavn" variant="outlined"/>
                            <TextField label="Passord" variant="outlined"/>                              
                        </div>
                        <div className='mt-10'>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Sted</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="Fredrikstad" control={<Radio />} label="Fredrikstad" />
                                    <FormControlLabel value="Trondheim" control={<Radio />} label="Trondheim" />
                                    <FormControlLabel value="Oslo" control={<Radio />} label="Oslo" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className='mt-10'>   
                            <Button variant="contained">Registrer</Button>
                        </div>
                    </div>  
                </div>
            </div>
        </div>

        
    );
}

export default RegisterPage
