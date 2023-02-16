import { TextField, Button } from '@mui/material/';
import { DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdFB from '../components/AdFB';
import Title from '../components/Title';
import { adsCollection } from '../lib/controller';
import { Ad } from '../types/types';

interface StepContent {
    icon: string
    span: string
    description: string
}

const Step = (props: StepContent) => {
    return (
        <div className='w-80 h-auto p-5 bg-slate-700'>
            <h2 className='mb-3'>{props.icon}</h2>
            <p><span className='text-yellow-300'>{props.span}</span>{props.description}</p>
        </div>
    )
}

const LandingPage = () => {
    let navigate = useNavigate();
    const [ads, setAds] = useState<Ad[]>([]);
    const threeAds = ads.slice(0, 3);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, 
    []);
      
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
        {/* <div id="c_section" className='fixed top-0 w-screen h-auto content-center z-20'>
            <div id="c_container" className='flex mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl p-10'>
                <div id="NAVBAR" className='w-full h-10 bg-slate-800 z-20'></div>
            </div>
        </div> */}

        <div id="c_section" className='flex h-screen content-center bg-slate-100 overflow-hidden'>
            <div id="c_container" className='static flex flex-row mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl p-10'>

                <div id="c_wrapper" className='max-w-3xl text-left mt-64 mb-32 z-10 flex-row'>
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
                        <TextField fullWidth id="outlined-search" label="Search field" type="search" />
                        <Button sx={{ px: 5 }} variant='contained' onClick={() => navigate("/ads")}>Se annonser</Button>
                    </div>
                </div>

            </div>

            <div className='absolute top-0 right-0 w-5/12 h-full bg-slate-400 bg-cover overflow-hidden'>
                <img className="absolute top-0 left-0 w-full h-full mt-16" src="https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="inside cabin" />
            </div>

        </div>

        <div id="c_section" className='flex h-auto content-center'>
            <div id="c_container" className='flex flex-col m-auto w-full max-w-7xl p-10'>
                <div id="c_wrapper" className='max-w-3xl text-left z-10'>
                    <Title size='text-5xl' heading='Inspirasjon' description='La deg inspirere' />
                </div>

                <div className='flex flex-row w-full h-auto gap-2'>
                    {threeAds?.map((ad) => (
                        <AdFB key={ad.id} ad={ad} />
                    ))}
                </div>

            </div>
        </div>

        <div id="c_section" className='flex h-auto content-center bg-slate-800 text-white overflow-hidden'>
            <div id="c_container" className='flex flex-row mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl p-10'>
                <div id="l_side" className='w-full relative'>
                    <Title size='text-5xl' heading='Steg-for-steg' description='Hvordan funker det?' />

                    <div className='h-auto flex flex-row text-left place-content-between gap-1'>
                        <Step icon={'Fill'} span={'01: '} description={'Bruk kategori eller søkefunksjon for å finne verktøyet du leter etter.'} />
                        <Step icon={'Fill'} span={'02: '} description={'Finn en passende annonse. Velg leieperioden du ønsker verktøyet.'} />
                        <Step icon={'Fill'} span={'03: '} description={'Ta kontakt med utleier og fullfør bestillingen. Verktøyet kan hentes hos utleier.'} />
                        <Step icon={'Fill'} span={'04: '} description={'Bruk verkøyet til å fullføre ditt prosjekt, og lever tilbake når ferdig.'} />
                    </div>

                </div>
            </div>
        </div>

        <div id="c_section" className='flex h-auto content-center bg-yellow-300 text-black overflow-hidden'>
            <div id="c_container" className='flex flex-row mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl p-10'>
                <div id="c_wrapper" className='max-w-3xl text-left z-10 flex-row'>
                    <Title size='text-5xl' heading='Hvorfor oss?' description='Med 16 år i bransjen er vi en gammel spiller i et ungt game' />
                </div>
            </div>
        </div>
    </div>
    )
}

export default LandingPage;