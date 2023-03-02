import FilterModule from './atoms/FilterModule';
import { ReactElement } from "react"
import { Checkbox, TextField, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { selectFilters, setFilter } from "../store/FiltersReducer";

interface TitledChildren {
    title: string
    margin: string
    children?: ReactElement<any>
}

    const Filter = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);

    return ( 
        <div className="m-4 h-auto rounded-2xl border-2 w-fit bg-white p-5 shadow-lg" >
            <FilterModule title="Kategori" margin="mt-4" >
                <RadioGroup value={filters.category || ""} >
                    <Button onClick={() => dispatch(setFilter({ field: "category", value: "" }))}>Fjern kategori</Button>

                    <FormControlLabel sx={{ m: -1 }} control={<Radio />} label="Elektronikk" value="Elektronikk" onChange={(event: any) => {
                        dispatch(setFilter({ field: "category", value: "Elektronikk" }));
                    }} />
                    <FormControlLabel sx={{ m: -1 }} control={<Radio />} label="Hage" value="Hage" onChange={(event: any) => {
                        dispatch(setFilter({ field: "category", value: "Hage" }));
                    }} />
                    <FormControlLabel sx={{ m: -1 }} control={<Radio />} label="Håndverktøy" value="Håndverktøy" onChange={(event: any) => {
                        dispatch(setFilter({ field: "category", value: "Håndverktøy" }));
                    }} />
                    <FormControlLabel sx={{ m: -1 }} control={<Radio />} label="Maskineri" value="Maskineri" onChange={(event: any) => {
                        dispatch(setFilter({ field: "category", value: "Maskineri" }));
                    }} />
                    <FormControlLabel sx={{ m: -1 }} control={<Radio />} label="Bil og motorsykkel" value="Bil og motorsykkel" onChange={(event: any) => {
                        dispatch(setFilter({ field: "category", value: "Bil og motorsykkel" }));
                    }} />
                    <FormControlLabel sx={{ m: -1 }} control={<Radio />} label="Sykkel" value="Sykkel" onChange={(event: any) => {
                        dispatch(setFilter({ field: "category", value: "Sykkel" }));
                    }} />
                    <FormControlLabel sx={{ m: -1 }} control={<Radio />} label="Henger" value="Henger" onChange={(event: any) => {
                        dispatch(setFilter({ field: "category", value: "Henger" }));
                    }} />
                    <FormControlLabel sx={{ m: -1 }} control={<Radio />} label="Rør" value="Rør" onChange={(event: any) => {
                        dispatch(setFilter({ field: "category", value: "Rør" }));
                    }} />
                    <FormControlLabel sx={{ m: -1 }} control={<Radio />} label="Stiger" value="Stiger" onChange={(event: any) => {
                        dispatch(setFilter({ field: "category", value: "Stiger" }));
                    }} />
                </RadioGroup>
            </FilterModule>

            <FilterModule title="Pris" margin="mt-6">
                <div className="mt-5 flex flex-col justify-between h-auto gap-2">
                    <TextField label="Min pris" type="number" variant="outlined" value={filters.minPrice} onChange={(event: any) => {
                        dispatch(setFilter({ field: "minPrice", value: event.target.value }));
                    }} />
                    <TextField label="Max pris" type="number" variant="outlined" value={filters.maxPrice} onChange={(event: any) => {
                        dispatch(setFilter({ field: "maxPrice", value: event.target.value }));
                    }} />
                </div>
            </FilterModule>

            <FilterModule title="Område" margin="my-8">
                <FormControl>
                    <FormGroup>
                        <FormControlLabel sx={{ m: -1 }} value="Bergen" control={<Checkbox />} label="Bergen" />
                        <FormControlLabel sx={{ m: -1 }} value="Oslo" control={<Checkbox />} label="Oslo" />
                        <FormControlLabel sx={{ m: -1 }} value="Fredrikstad" control={<Checkbox />} label="Fredrikstad" />
                        <FormControlLabel sx={{ m: -1 }} value="Trondheim" control={<Checkbox />} label="Trondheim" />
                    </FormGroup>
                </FormControl>
            </FilterModule>

        </div>
    );
}

export default Filter;
