import { ReactElement } from "react"
import { Checkbox, TextField, Radio, FormControl, RadioGroup, FormControlLabel, FormGroup } from '@mui/material';


interface TitledChildren {
    title: string
    margin: string
    children?: ReactElement<any>
}

const FilterModuler = (props: TitledChildren) => {
    return (
        <div className={`h-auto w-fit ${props.margin}`}>
            <h1 className="font-bold text-lg mb-3">{props.title}</h1>
            {props.children}
        </div>
    );
}

const AdFilter = () => {
    return (
        <div className="m-4 h-auto rounded-2xl border-2 w-fit bg-white p-5 shadow-lg">
            <FilterModuler title="Kategori" margin="mt-4">
                <FormGroup>
                    <FormControlLabel sx={{ m: -1 }} control={<Checkbox />} label="Elektronikk" />
                    <FormControlLabel sx={{ m: -1 }} control={<Checkbox />} label="Bygg" />
                    <FormControlLabel sx={{ m: -1 }} control={<Checkbox />} label="Hageredskap" />
                    <FormControlLabel sx={{ m: -1 }} control={<Checkbox />} label="Håndverktøy" />
                    <FormControlLabel sx={{ m: -1 }} control={<Checkbox />} label="Maskineri" />
                    <FormControlLabel sx={{ m: -1 }} control={<Checkbox />} label="Bil" />
                    <FormControlLabel sx={{ m: -1 }} control={<Checkbox />} label="Sykkel" />
                </FormGroup>
            </FilterModuler>

            <FilterModuler title="Pris" margin="mt-6">
                <div className="mt-5 flex flex-col justify-between h-auto gap-2">
                    <TextField label="Min pris" type="number" variant="outlined"/>
                    <TextField label="Max pris" type="number" variant="outlined"/>
                </div>
            </FilterModuler>

            <FilterModuler title="Område" margin="my-8">
                <FormControl>
                    <RadioGroup>
                        <FormControlLabel sx={{ m: -1 }} value="Bergen" control={<Radio />} label="Bergen" />
                        <FormControlLabel sx={{ m: -1 }} value="Oslo" control={<Radio />} label="Oslo" />
                        <FormControlLabel sx={{ m: -1 }} value="Fredrikstad" control={<Radio />} label="Fredrikstad" />
                        <FormControlLabel sx={{ m: -1 }} value="Trondheim" control={<Radio />} label="Trondheim" />
                    </RadioGroup>
                </FormControl>
            </FilterModuler>

        </div>
    );
}




export default AdFilter;
