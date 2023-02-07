import Textbox from "../components/Textbox";
import AdCreatorStep from "../components/AdCreatorStep";
import { MenuItem, Select, TextField, Button, FormControl, InputLabel } from "@mui/material";

const AdCreator = () => {
    return (
        <div className="flex flex-col w-full">
            <Textbox title="Ad Creator">
                <p>
                    Lorem ipsum er opprinnelig et lettere redigert 
                    utdrag fra De finibus bonorum et malorum 
                    (Om det høyeste mål for godt og ondt) av Cicero.
                    Opprinnelig begynte avsnittet: Neque porro quisquam 
                    est qui dolorem ipsum quia dolor sit amet, consectetur, 
                    adipisci velit («Ingen liker smerte for smertens skyld, 
                    eller søker den og ønsker den, bare fordi den er smerte…»).
                </p>
            </Textbox>

            <div>
                <AdCreatorStep step={1} title="Tittel">
                    <TextField 
                        label="Tittel" 
                        variant="filled" 
                        fullWidth
                    />
                </AdCreatorStep>

                <AdCreatorStep step={2} title="Beskrivelse">
                    <TextField 
                        multiline 
                        minRows={4} 
                        label="Beskrivelse" 
                        variant="filled"
                        fullWidth
                    />
                </AdCreatorStep>

                <AdCreatorStep step={3} title="Kategori">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={}
                            label="Kategori"
                            // onChange={handleChange}
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
            </div>

            <Button 
                variant="contained"
                className="w-1/6"
                color="primary"
            >
                Publiser annonse
            </Button>
        </div>
    );
};

export default AdCreator;