//import Ad from '../components/Ad';
import AdFilter from '../components/AdFilter';
import { Button, TextField } from '@mui/material';
import { Adds } from '../types/types';
import { useState, useEffect } from 'react';
import { DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { addsCollection } from '../lib/controller';
import AdFB from '../components/AdFB';

const Ads = () => {
    const [ads, setAds] = useState<Adds[]>([]);

    useEffect(
        () =>
            onSnapshot(addsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
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
        <div className='w-full flex flex-col bg-slate-100 pt-40'>


            <div className='flex flex-row w-full mx-20'>

                <div className='pt-24'>
                    <AdFilter/>
                </div>            

                <section className='flex flex-col h-auto'>

                    <div className='w-full flex flex-row justify-center gap-5'>
                        <div className='h-full gap-1 flex flex-row'>
                            <TextField variant="filled" label="Ønsket produkt" />
                            <Button variant="contained">Søk</Button>
                        </div>
                        <Button color="info" variant="contained" href="/#/adcreator">+</Button>
                    </div>

                    <div className='flex m-auto w-full max-w-7xl p-10 text-current flex-wrap flex-row justify-center'>
                        {/* Not in use but can be used as testdata
                        <Ad 
                            src="https://static.bb.se/wcsstore/CAS/PIM/Luna/imgs/1151376.jpg"
                            title="Bor"
                            description="Dritbra bor som lager høl"
                            location="Fredrikstad"
                            price="200kr/dag"
                            date="07.02.23" 
                        />
                        */}
                        {ads?.map((ad) => (
                            <AdFB key={ad.id} ad={ad} />
                        ))}
                    </div> 
                </section>                
            </div>
        </div>
    );
}

export default Ads;

