import Textbox from "../components/Textbox";
import AdCreatorStep from "../components/AdCreatorStep";
import { MenuItem, Select, TextField, Button, FormControl, InputLabel, ImageList } from "@mui/material";
import { useEffect, useState } from "react";
import { addAd } from "../lib/controller";
import { NewAd } from "../types/types";
import Title from "../components/Title";
import Step from "../components/Step";
import { validateAddress, validateCity, validateDescription, validatePrice, validateTitle, validateZip } from "../lib/validation";


function writeAdToDatabase(props: NewAd) {
    const ad = {
        title: props.title,
        description: props.description,
        category: props.category,
        price: props.price,
        rental: props.rental,
        address: props.address,
        zip: props.zip,
        city: props.city
    }
    console.log(ad)
    addAd(ad); // Add ad to database
    alert("Annonse opprettet");
}

const AdCreator = () => {

    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [rental, setRental] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");


    const handleOnClick = () => {
        // check if user is logged in
        if (sessionStorage.getItem("username") === null) {
            alert("Du må være logget inn for å opprette en annonse");
            return;
        }
        // check if all fields are filled
        if (title === "" || description === "" || category === "" || price === "" || address === "" || zip === "" || city === "") {
            alert("Alle felt må fylles ut");
            return;
        }
        if (!validateTitle(title)){
            alert("Ikke gyldig tittel!");
            return;
        }
        if (!validateDescription(description)){
            alert("Ikke en gyldig beksrivelse!");
            return;
        }
        if (!validateAddress(address)){
            alert("Ikke en gyldig adresse!");
            return;
        }
        if (!validateZip(zip)){
            alert("Ikke et gyldig postnummer!");
            return;
        }
        if (!validateCity(city)){
            alert("Ikke gyldig navn på by!");
            return;
        }
        if (!validatePrice(price)){
            alert("Pris kan ikke være tom!");
            return;
        }
        
        const adToDatabase = {
            title: title,
            description: description,
            category: category,
            price: parseInt(price),
            rental: rental,
            address: address,
            zip: parseInt(zip),
            city: city
        }
        writeAdToDatabase(adToDatabase);

        // set states to default
        setTitle("");
        setDescription("");
        setCategory("");
        setPrice("");
        setRental("");
        setAddress("");
        setZip("");
        setCity("");
    }




    return (
        <div>
            <div id="c_section" className='flex w-full h-full content-center bg-slate-100 overflow-hidden z-10'>
                <div id="c_container" className='static flex flex-row mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl p-10 gap-10 justify-center bg-white'>
                    {/* <div className='flex flex-col justify-between w-1/4 bg-yellow-400 h-full'></div> */}
                    <div className='flex flex-col w-10/12 text-left pt-32 mb-10'>

                        <Title size={'text-7xl'} heading={'Opprett '} span={'annonse'} description={'Start utlån allerede i dag! Følg stegene, så er annonsen din oppe og går i løpet av kort tid!'} />


                        <div id="CATEGORY" className='flex flex-col my-5'>
                            <Step nr={'01'} title={'Velg kategori'} />
                            <p>Velg en passende kategori så brukere enkelt kan finne annonsen din. Sjekk gjerne at valgt kategori inneholder lignende produkter.</p>

                            <div className='flex flex-row w-full gap-2 mt-5 my-2'>
                                <FormControl fullWidth>
                                    <InputLabel id="category">Kategori</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        label="Kategori"
                                        onChange={(e) => { setCategory(e.target.value as string) }}
                                        variant="outlined"
                                    >
                                        <MenuItem value="Håndverktøy">Håndverktøy</MenuItem>
                                        <MenuItem value="Hage">Hage</MenuItem>
                                        <MenuItem value="Henger">Henger</MenuItem>
                                        <MenuItem value="Elektronikk">Elektronikk</MenuItem>
                                        <MenuItem value="Bil">Bil og Motorsykkel</MenuItem>
                                        <MenuItem value="Sykkel">Sykkel</MenuItem>
                                        <MenuItem value="Stiger">Stiger</MenuItem>
                                        <MenuItem value="Maskineri">Maskineri</MenuItem>
                                        <MenuItem value="Rør">Rør</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                        </div>


                        <div id="TITLE_DESC" className='flex flex-col my-5'>
                            <Step nr={'02'} title={'Tittel og beskrivelse'} />
                            <p> Velg en kort og beskrivende tittel. Legg til en mer detaljert beskrivelse så bruker kan få mer informasjon om produktet når de trykker på annonsen. </p>

                            <div className='flex flex-col w-full mt-5 gap-2 my-2'>
                                <TextField fullWidth label="Tittel" variant="outlined" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                                <TextField fullWidth multiline minRows={4} label="Beskrivelse" variant="outlined" value={description} onChange={(e) => { setDescription(e.target.value) }} />                                
                            </div>

                        </div>

                        <div id="IMAGES" className='flex flex-col my-5'>
                            <Step nr={'03'} title={'Last opp bilder'} />
                            <p>Vis frem produktet så brukere kan se hva du leier ut. Vi anbefaler 3-5 bilder for best resultat. Trykk på boksene eller bruk knappen.</p>

                            <div className='flex flex-col w-full mt-5 gap-2'>
                                <ImageList sx={{ width: 500, height: "auto" }} cols={3} rowHeight={164}>
                                    {/* {itemData.map((item) => (
                                        <ImageListItem key={item.img}>
                                        <img
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                                    />
                                    </ImageListItem>
                                ))} */}
                                </ImageList>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    color="primary"
                                    sx={{p: 2,
                                        ':hover': {
                                            bgcolor: 'black',
                                            color: 'white',
                                        },
                                    }}>Last opp bilder <input
                                        accept="image/"
                                        type="file"
                                        hidden
                                        id="select-image"
                                    // onChange={e => setSelectedImage(e.target.files[0])}
                                    /></Button>
                            </div>
                        </div>

                        <div id="ADDRESS_INFO" className='flex flex-col my-5'>
                            <Step nr={'04'} title={'Sted og addresse'} />
                            <p> Gi produktet en adresse. Dette vil gjøre annonsen din synlig for brukere i nærheten, og vil gi kjøpere mulighet til å hente produktet hos deg. Merk: adressen din blir kun synlig for andre brukere etter at utlån er avtalt og godkjent av deg.</p>
                            
                            <div className='flex flex-col w-full mt-5 gap-2'>
                                <TextField label="Hjemmeadresse" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />

                                <div className='flex flex-row w-full gap-2'>
                                    <TextField label="Postnummer" variant="outlined" value={zip} onChange={(e) => setZip(e.target.value)} />
                                    <TextField fullWidth label="By" variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>

                            </div>
                        </div>

                        <div id="PRICE" className='flex flex-col my-5'>
                            <Step nr={'05'} title={'Velg pris'} />
                            <p>Vi anbefaler at du sjekker prisen til tilsvarende produkter. En passende pris øker sannsynligheten for utlån.</p>

                            <div className='flex flex-col w-full mt-5 gap-2'>
                                <TextField label="Pris" type="number" InputLabelProps={{shrink: true,}} value={price} onChange={(e) => { setPrice(e.target.value) }} />
                            </div>
                        </div>

                        <div className='flex flex-col w-full gap-2 my-2'>                              
                            <Button variant="contained" color="primary"  sx={{p:2}} onClick={() => handleOnClick()}> Publiser annonse </Button>
                            <Button variant="outlined" color="primary" sx={{p:2,':hover': {bgcolor: 'black',color: 'white',},}}> Forhåndsvisning </Button>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdCreator;