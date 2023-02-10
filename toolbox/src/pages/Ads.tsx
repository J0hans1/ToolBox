import Ad from '../components/Ad';

const Ads = () => {
    return (
        <div className='w-full flex flex-row bg-slate-100'>
            <div className='w-1/4 bg-slate-200 flex justify-center items-center'>
                <div className='w-80 h-80 bg-teal-500'>

                </div>
            </div>
            
            <section className={'flex content-center h-auto'}>
                <div className='flex m-auto w-full max-w-7xl p-10 text-current flex-wrap flex-row mt-20'>
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
                        price="100kr/dag"
                        date="07.02.23" 
                    />
                    <Ad 
                        src="https://bynder.sbdinc.com/m/4998dd3ae72d8ca1/Drupal_Large-DCD800D1E1_A5.jpg"
                        title="Drill"
                        description="Kjempe drill"
                        location="Oslo"
                        price="100kr/dag"
                        date="07.02.23" 
                    />
                    <Ad 
                        src="https://bynder.sbdinc.com/m/4998dd3ae72d8ca1/Drupal_Large-DCD800D1E1_A5.jpg"
                        title="Drill"
                        description="Kjempe drill"
                        location="Oslo"
                        price="100kr/dag"
                        date="07.02.23" 
                    />
                    <Ad 
                        src="https://bynder.sbdinc.com/m/4998dd3ae72d8ca1/Drupal_Large-DCD800D1E1_A5.jpg"
                        title="Drill"
                        description="Kjempe drill"
                        location="Oslo"
                        price="100kr/dag"
                        date="07.02.23" 
                    />
                    <Ad 
                        src="https://bynder.sbdinc.com/m/4998dd3ae72d8ca1/Drupal_Large-DCD800D1E1_A5.jpg"
                        title="Drill"
                        description="Kjempe drill"
                        location="Oslo"
                        price="100kr/dag"
                        date="07.02.23" 
                    />
                    <Ad 
                        src="https://bynder.sbdinc.com/m/4998dd3ae72d8ca1/Drupal_Large-DCD800D1E1_A5.jpg"
                        title="Drill"
                        description="Kjempe drill"
                        location="Oslo"
                        price="100kr/dag"
                        date="07.02.23" 
                    />
                    <Ad 
                        src="https://bynder.sbdinc.com/m/4998dd3ae72d8ca1/Drupal_Large-DCD800D1E1_A5.jpg"
                        title="Drill"
                        description="Kjempe drill"
                        location="Oslo"
                        price="100kr/dag"
                        date="07.02.23" 
                    />
                </div> 
            </section>
        </div>
    );
}

export default Ads;