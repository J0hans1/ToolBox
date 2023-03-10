import { TextField, Button } from '@mui/material/';
import { DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdComponent from '../components/Ad';
import Title from '../components/Title';
import { adsCollection } from '../lib/controller';
import { Ad } from '../types/types';
import SEARCH from '../img/search.png';
import TOOLS from '../img/tools.png';
import VALUE from '../img/value.png';
import AGREEMENT from '../img/agreement.png';
import SALES from '../img/sales.png';
import CHOOSE from '../img/choose.png';
import CLOCK from '../img/clock.png';
import CIRCLES from '../img/circles.png';
import Category from '../components/Category';
import UserStep from '../components/UserStep';
import TitledIcon from '../components/TitledIcon';
import { useDispatch, useSelector } from "react-redux";
import { selectAdFilters, setAdFilter } from "../store/AdFiltersReducer";


const LandingPage = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const filters = useSelector(selectAdFilters);
    const [ads, setAds] = useState<Ad[]>([]);
    const threeAds = ads.slice(0, 3);

    useEffect(
        () =>
            onSnapshot(adsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
                setAds(
                    snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    })
                );
            }),
        []
    );

    return (
        <div>
            <div id="c_section" className='relative flex h-screen content-center gap-10 bg-slate-100 overflow-hidden'>
                <div id="c_container" className='static flex flex-row m-auto w-full max-w-7xl p-10'>
                    <div id="c_wrapper" className='max-w-3xl text-left mt-64 mb-32 z-10 flex-row'>
                        <img src={CIRCLES} alt="decorative circles" className=' w-14 h-14 mb-' />
                        <Title
                            size="text-7xl"
                            heading='Verktøyene du'
                            span='trenger'
                            mid=','
                            span2='når'
                            tail=' du trenger dem.'
                            description='Hos oss får du enkelt tilgang på verktøyet du trenger, når du trenger det. Lei verktøyet du ønsker, så lenge du trenger det, kun ved et par tastetrykk.'
                        />

                        <div className="flex place-content-between justify-between gap-5 my-5 w-11/12">
                            <TextField fullWidth id="outlined-search" label="Søk i våre annonser!" type="search" value={filters.search} onChange={(event: any) => {
                                dispatch(setAdFilter({ field: "search", value: event.target.value }));
                            }} />
                            <Button sx={{ px: 5 }} variant='contained' onClick={() => navigate("/ads")}>Søk</Button>
                        </div>

                        <div className='mt-20 flex w-3/4 justify-end'>
                            <img src={CIRCLES} alt="decorative circles" className='w-20 h-20' />
                        </div>
                    </div>
                </div>

                <div className='bg-cover bg-center absolute top-0 right-0 w-4/12 h-full'
                    style={{
                        backgroundImage: `url("https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")`
                    }}
                >
                </div>

                <div className='absolute right-0 bottom-0 w-1/2 h-28 bg-pu-gray'></div>

                <div id="c_section" className='absolute bottom-0 right-0 flex h-auto w-full content-center bg-pu-gul'>
                    <div id="c_container" className='flex flex-col m-auto w-full max-w-7xl p-5'>
                        <div className='flex flex-row w-full gap-20 align-middle pl-5'>
                            <TitledIcon icon={CHOOSE} iconSize='h-11' text='Enkelt' textSize='text-lg' />
                            <TitledIcon icon={CLOCK} iconSize='h-11' text='Effektivt' textSize='text-lg' />
                            <TitledIcon icon={SALES} iconSize='h-11' text='Bærekraftig' textSize='text-lg' />
                        </div>
                    </div>
                </div>
            </div>

            <div id="c_section" className='flex h-auto content-center'>
                <div id="c_container" className='flex flex-col m-auto w-full max-w-7xl p-10'>
                    <div id="c_wrapper" className='max-w-3xl text-left z-10'>
                        <Title size='text-5xl' heading='Inspirasjon' description='La deg inspirere av noen av våre mange annonser. Våre brukere låner ut produkter innen en rekke kategorier som: ' />

                        <div className='flex flex-row flex-wrap gap-1 mb-3'>
                            <Category name={'Håndverktøy'} outlineColor={'border-black'} textColor={'text-pu-gray'} />
                            <Category name={'Hage'} outlineColor={'border-black'} textColor={'text-pu-gray'} />
                            <Category name={'Henger'} outlineColor={'border-black'} textColor={'text-pu-gray'} />
                            <Category name={'Elektronikk'} outlineColor={'border-black'} textColor={'text-pu-gray'} />
                            <Category name={'Bil & Motorsykkel'} outlineColor={'border-black'} textColor={'text-pu-gray'} />
                            <Category name={'Sykkel'} outlineColor={'border-black'} textColor={'text-pu-gray'} />
                            <Category name={'Stige'} outlineColor={'border-black'} textColor={'text-pu-gray'} />
                            <Category name={'Maskineri'} outlineColor={'border-black'} textColor={'text-pu-gray'} />
                            <Category name={'Rør'} outlineColor={'border-black'} textColor={'text-pu-gray'} />
                            <Category name={'Arbeidskraft'} outlineColor={'border-black'} textColor={'text-pu-gray'} />
                            <Category name={'Mystery Box'} outlineColor={'border-black'} textColor={'text-pu-gray'} />
                        </div>
                    </div>

                    <div className='flex flex-row w-full h-auto gap-2 '>
                        {threeAds?.map((ad) => (
                            <AdComponent key={ad.id} ad={ad} />
                        ))}
                    </div>

                </div>
            </div>

            <div id="c_section" className='relative flex h-auto content-center bg-pu-gray text-white overflow-hidden'>
                <div id="c_container" className='flex flex-row mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl p-10'>
                    <div id="l_side" className='w-full relative'>
                        <Title size='text-5xl' heading='Steg-for-steg' description='Hvordan funker det?' />

                        <div className='h-auto flex flex-row w-1/2 text-left gap-1 flex-wrap'>
                            <UserStep icon={SEARCH} span={'01: '} description={'Bruk kategori eller søkefunksjon for å finne verktøyet du leter etter.'} />
                            <UserStep icon={TOOLS} span={'02: '} description={'Finn en passende annonse. Velg leieperioden du ønsker verktøyet.'} />
                            <UserStep icon={AGREEMENT} span={'03: '} description={'Ta kontakt med utleier og fullfør bestillingen. Verktøyet kan hentes hos utleier.'} />
                            <UserStep icon={VALUE} span={'04: '} description={'Bruk verkøyet til å fullføre ditt prosjekt, og lever tilbake når ferdig.'} />
                        </div>

                    </div>
                </div>
                <div className='absolute top-0 right-0 z-0 w-1/2 h-full bg-pu-gul'></div>
            </div>

            <div id="c_section" className='flex h-auto content-center bg-black text-white overflow-hidden'>
                <div id="c_container" className='flex flex-row mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl p-10'>
                    <div id="c_wrapper" className='max-w-3xl text-left z-10 flex-row'>
                        <Title size='text-5xl' heading='Hvorfor oss?' description='Med 16 år i bransjen er vi en gammel spiller i et ungt game. Hos oss er du garantert en enkel og smidig utlånsopplevelse. Gjør som 69 andre og prøv oss ut i dag. Enten du ønsker å låne eller leie ut verktøy!' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;