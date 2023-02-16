import AdInspector from "../components/AdInspector";
import AdUserInfo from "../components/AdUserInfo";
import Textbox from "../components/Textbox";

const AdInspectorPage = () => {
    return (
        <div className="pt-40"> 
            <div id="c_container" className='flex mr-auto ml-auto mt-auto mb-auto w-1/3 max-w-7xl justify-center'>
                <img className="h-1/4 w-auto p-10 justify-center " src="https://static.bb.se/wcsstore/CAS/PIM/Luna/imgs/1151376.jpg" alt="ad" />
            </div>
            <div id="c_wrapper" className='w-1/4 justify-center bg-black rounded-lg'>
                <h1 className='text-7xl mb-4 p-5'>Tittel<span className="bg-yellow-300"> her</span></h1>
            </div>        <div className='w-full flex flex-col bg-slate-100 pt-40'>
                <div className='flex flex-row w-full mx-20'>
                    <div className='pt-24'>
                        <AdUserInfo name={"Anne Olderheim"} email={"anne@gmail.com"} phone={"824914783190"} avatar={""} />

                    </div>


                    <div className="flex flex-col w-2/3">
                        <div className="">
                            <AdInspector icon={""} location={"Oslo"} date={"12.01"} price={"100"} />
                        </div>
                        <div className="">
                            <div className="p-10">
                                <p>Dette er en fortsettelse av den korte beskrivelse.
                                    Her kan jeg utfolde mine meninger om hvorfor  DeWalt er
                                    et bra merke. Dette er en fortsettelse av den korte beskrivelse.
                                    Her kan jeg utfolde mine meninger om hvorfor
                                    DeWalt er et bra merke. Dette er en fortsettelse av den
                                    korte beskrivelse. Her kan jeg utfolde mine meninger om
                                    hvorfor DeWalt er et bra merke. </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdInspectorPage;