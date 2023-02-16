import AdUserInfo from "../components/AdUserInfo";
import Textbox from "../components/Textbox";
import Title from "../components/Title";
import {AdIconAndText} from "../components//Ad";



interface AdProps {
    title: string;
    description: string;
    src: string;
    location: string;
    price: string;
    date: string;
}

interface UserProps {
    name: string;
    phone: string;
    email: string;
}


const AdInspectorPage = (props: AdProps, prop: UserProps) => {
    return (
    <div className="pt-40 pb-40 flex flex-col px-60">

        <div 
            className="bg-cover h-96 bg-slate-100 rounded-md bg-center relative" 
            style={{ 
                backgroundImage: `url("https://static.bb.se/wcsstore/CAS/PIM/Luna/imgs/1151376.jpg")`
            
            }}
        >
            <div id="c_wrapper" className='w-auto justify-center bg-white rounded-tl-xl absolute right-0 bottom-0 '>
                <Title size={"text-7xl ml-5 mr-5"} heading={props.title} description={""} span={""} ></Title>
            </div>

        </div>


        <div className="w-full">
        <div className="flex flex-row p-10 h-32 w-full justify-between">
            <AdIconAndText icon="https://img.icons8.com/ios/512/calendar--v1.png"  text={props.date} iconSize="h-full" textSize="text-4xl" />
            <AdIconAndText icon="https://img.icons8.com/ios/50/000000/price-tag-euro.png"   text={props.price} iconSize="h-full" textSize="text-4xl" />
            <AdIconAndText icon="https://img.icons8.com/material-sharp/256/map-marker.png" text={props.location} iconSize="h-full" textSize="text-4xl" />
        </div>        </div>

        <div className="flex flex-row">
            <div className='pt-24 w-1/2'>
                <AdUserInfo name={prop.name} email={prop.email} phone={prop.phone} avatar={""} />
            </div>

            <div className="p-10 text-2xl w-1/2 text-left" >
                <p>
                      {props.description}
                </p>
            </div>
        </div>

        
    </div>
    );
};

export default AdInspectorPage;