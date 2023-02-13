import Ad from '../components/Ad';
import AdFilter from '../components/AdFilter';
import { Button, TextField } from '@mui/material';




const Ads = () => {
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
                        <Button color="info" variant="contained" href="/#/postAd">+</Button>
                    </div>

                    <div className='flex m-auto w-full max-w-7xl p-10 text-current flex-wrap flex-row justify-center'>
                        <Ad 
                            src="https://static.bb.se/wcsstore/CAS/PIM/Luna/imgs/1151376.jpg"
                            title="Bor"
                            description="Dritbra bor som lager høl"
                            location="Fredrikstad"
                            price="200kr/dag"
                            date="07.02.23" 
                        />
                        <Ad 
                            src="https://bynder.sbdinc.com/m/4998dd3ae72d8ca1/Drupal_Large-DCD800D1E1_A5.jpg"
                            title="Drill"
                            description="Kjempe drill"
                            location="Oslo"
                            price="150kr/dag"
                            date="07.02.23" 
                        />
                        <Ad 
                            src="data:image/jpeg;base64,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"
                            title="Hammer og Sigd"
                            description="Felles hammer og sigd"
                            location="Trondheim"
                            price="0kr/dag"
                            date="07.02.23" 
                        />
                        <Ad 
                            src="https://www.highsnobiety.com/static-assets/thumbor/lTOfsDWG-eNNjdZizrtGHXYIQj8=/960x576/www.highsnobiety.com/static-assets/wp-content/uploads/2018/09/20000332/sasuke-bonsai-scissors-video-000.jpg"
                            title="Bonsai saks"
                            description="Håndlaget bonsai saks fra Japan"
                            location="Oslo"
                            price="1000kr/dag"
                            date="07.02.23" 
                        />
                        <Ad 
                            src="data:image/jpeg;base64,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"
                            title="Hammer"
                            description="Den kan slå ting"
                            location="Fredrikstad"
                            price="100kr/dag"
                            date="07.02.23" 
                        />
                        <Ad 
                            src="https://www.afka.no/wp-content/uploads/2019/09/ATV-hydraulisk-henger-2-scaled.jpg"
                            title="Hengær"
                            description="God hengærn til han Roy Peter"
                            location="Fredrikstad"
                            price="500kr/dag"
                            date="07.02.23" 
                        />
                        <Ad 
                            src="https://static.speedline.dk/ai/800/storage/images/products/2123485-1200Wx1200H.jfif"
                            title="Trykkluft kompressor"
                            description="Bosch kompressor med 50L tank"
                            location="Oslo"
                            price="100kr/dag"
                            date="07.02.23" 
                        />
                        <Ad 
                            src="https://www.klaravik.no/uploads/extrabilder695726_large.jpg"
                            title="Kärcher Høytrykkspyler"
                            description="Velholdt Høytrykkspyler på  2000W"
                            location="Oslo"
                            price="100kr/dag"
                            date="07.02.23" 
                        />
                    </div> 
                </section>                
            </div>
        </div>
    );
}

export default Ads;

