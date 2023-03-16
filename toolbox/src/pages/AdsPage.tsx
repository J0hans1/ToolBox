import Filter from '../components/Filter';
import { Button, TextField } from '@mui/material';
import { Ad } from '../types/types';
import { useState, useEffect } from 'react';
import AdComponent from '../components/Ad';
import { AdsQuery } from '../lib/controller';
import { useDispatch, useSelector } from "react-redux";
import { selectAdFilters, setAdFilter } from "../store/AdFiltersReducer";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Ads = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const dispatch = useDispatch();
    const AdFilters = useSelector(selectAdFilters);
    let navigate = useNavigate();
    const { currentUser} = useAuth();


    // query backend for ads with filters
    useEffect(() => {
        AdsQuery(
            AdFilters.search,
            AdFilters.category,
            AdFilters.minPrice,
            AdFilters.maxPrice,
            AdFilters.zipCode
        ).then((ads) => {
            setAds(ads);
        });
    }, [AdFilters]);

    return (
        <div className='w-screen flex flex-col bg-pu-grunn pt-40'>
            <div className='flex flex-row w-full lg:mx-10 xl:mx-20'>
                <div className='pt-24 hidden lg:block w-1/5'>
                    <Filter/>
                </div>            
    
                <section className='flex flex-col h-auto w-3/5'>
                {currentUser ? (
                    <div className=' flex flex-row justify-left gap-5'>
                        <div className='lg:hidden block'>
                            <Button variant="contained">Filter</Button>
                        </div>
                        <div className='h-full w-1/5 lg:w-2/5 flex flex-row justify-left'>
                            <TextField sx={{
                                width: '1',
                            }} variant="filled" label="Ønsket produkt" value={AdFilters.search} onChange={(event: any) => {
                                dispatch(setAdFilter({ field: "search", value: event.target.value }));
                            }} />
                        </div>
                        <Button color="info" variant="contained" onClick={() => navigate("/adcreator")}>Opprett annonse</Button>
                    </div>
                ) : (
                    <div className='w-full flex flex-row justify-left gap-5'>
                    <div className='lg:hidden block'>
                        <Button variant="contained">Filter</Button>
                    </div>
                    <div className='h-full w-1/5 lg:w-2/5 flex flex-row justify-left'>
                        <TextField sx={{
                            width: '1',
                        }} variant="filled" label="Ønsket produkt" value={AdFilters.search} onChange={(event: any) => {
                            dispatch(setAdFilter({ field: "search", value: event.target.value }));
                        }} />
                    </div>
                    <Button disabled={true} color="info" variant="contained" onClick={() => navigate("/adcreator")}>Opprett annonse</Button>
                </div>
                )}

                    <div className='flex m-2 max-w-7xl pt-10 text-current flex-wrap flex-row justify-left'>
                        {ads?.map((ad) => (
                            <AdComponent key={ad.id} ad={ad} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Ads;

