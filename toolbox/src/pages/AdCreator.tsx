import Textbox from "../components/Textbox";
import AdCreatorStep from "../components/AdCreatorStep";
import { MenuItem, Select, TextField, Button, FormControl, InputLabel, ImageList, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { useState } from "react";
import { addAd } from "../lib/controller";
import {Ad} from "../types/types";


function writeAdToDatabase(props : Ad) {
    const ad = {
        title: props.title,
        description: props.description,
        category: props.category,
        price: props.price,
        rental: props.rental,
        adress: props.address,
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
        if (localStorage.getItem("username") === null) {
            alert("Du må være logget inn for å opprette en annonse");
            return;
        }
        // check if all fields are filled
        if (title === "" || description === "" || category === "" || price === "" || rental === "" || address === "" || zip === "" || city === "") {
            alert("Alle felt må fylles ut");
            return;
        }

        const adToDatabase = {
            title: title,
            description: description,
            category: category,
            price: parseInt(price),
            rental: rental,
            adress: address,
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
        <div className="flex flex-col w-full">
            <Textbox title="Opprett " title2="anonnse" >
                <br />
                <p>
                    Start utlån allerede i dag. Følg stegene, så er annonsen din oppe og går i løpet av kort tid!
                </p>
                <br />
            </Textbox>
            <div className="flex w-full flex-col justify-center">
                <AdCreatorStep step={1} title="Kategori">
                    <p>Velg en passende kategori så brukere enkelt kan finne annonsen din. Sjekk gjerne at valgt kategori inneholder lignende produkter.</p>
                    <br />
                    <FormControl fullWidth>
                        <InputLabel id="category">Kategori</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Kategori"
                            onChange={(e) => { setCategory(e.target.value as string) }}
                            variant="filled"
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
                </AdCreatorStep>

                <AdCreatorStep step={2} title="Tittel og beskrivelse">
                    <p> Velg en kort og beskrivende tittel. Legg til en mer detaljert beskrivelse så bruker kan få mer informasjon om produktet når de trykker på annonsen. </p>
                    <br />
                    <TextField
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        label="Tittel"
                        variant="filled"
                        fullWidth
                    />
                    <br />
                    <TextField
                        multiline
                        minRows={4}
                        onChange={(e) => { setDescription(e.target.value) }}
                        value={description}
                        label="Beskrivelse"
                        variant="filled"
                        fullWidth
                    />
                </AdCreatorStep>
                <AdCreatorStep step={3} title="Bilder">
                    <p>Vis frem produktet så brukere kan se hva du leier ut. Vi anbefaler 3-5 bilder for best resultat. Trykk på boksene eller bruk knappen.</p>
                    <br />

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
                        className="w-1/3"
                        color="primary"
                        sx={{
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
                </AdCreatorStep>

                <AdCreatorStep step={4} title="Pris">
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        //defaultValue=""
                        onChange={(e) => { setRental(e.target.value as string) }}
                        value={rental}
                    >
                        <FormControlLabel value="utleie" control={<Radio />} label="utleie" />
                        <FormControlLabel value="utlån" control={<Radio />} label="utlån" />
                    </RadioGroup>
                    <br />
                    {/* ønsker å disable text-field dersom utlån er valgt */}
                    <TextField
                        id="pris"
                        label="Velg pris per dag"
                        variant="filled"
                        type="number"
                        fullWidth
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                    />
                </AdCreatorStep>
                <AdCreatorStep step={5} title="Sted"> <TextField
                    label="Gateadresse"
                    variant="filled"
                    fullWidth
                    value={address}
                    onChange={(e) => { setAddress(e.target.value) }}
                />
                    <br />
                    <TextField
                        label="Postnr."
                        variant="filled"
                        className="w-1/2"
                        value={zip}
                        type="number"
                        onChange={(e) => { setZip(e.target.value) }}
                    />
                    <TextField
                        label="Sted"
                        variant="filled"
                        className="w-1/2"
                        value={city}
                        onChange={(e) => { setCity(e.target.value) }}
                    /></AdCreatorStep>
            </div>
            <div className="flex-row ml-20">
                <Button
                    variant="outlined"
                    className="w-1/6"
                    color="primary"
                    sx={{
                        ':hover': {
                            bgcolor: 'black',
                            color: 'white',
                        },
                    }}
                    onClick={() => handleOnClick()}>
                    Publiser annonse
                </Button>
                <Button
                    variant="outlined"
                    className="w-1/6"
                    color="primary"
                    sx={{
                        ':hover': {
                            bgcolor: 'black',
                            color: 'white',
                        },
                    }} >
                        Forhåndsvisning            
                    </Button>    
                    <br />
                    <br />    
                </div>  
            </div>
    );
};

export default AdCreator;