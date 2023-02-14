import {AdIconAndText} from "./Ad";


interface Header {
    title: string;
    image: string;
}

interface IconText {
    icon: string;
    location: string;
    date: string;
    price: string;
}

const AdInspector = (props: IconText) => {
    return (

      <div className="flex flex-row h-auto w-3/4 justify-center">
                <div className="flex flex-row gap-5 p-10 w-full justify-between">
                    <AdIconAndText icon="https://img.icons8.com/ios/512/calendar--v1.png"  text={props.date} iconSize="h-1/6" textSize="text-6xl" />
                    <AdIconAndText icon="https://img.icons8.com/ios/50/000000/price-tag-euro.png"   text={props.price} iconSize="h-1/6" textSize="text-6xl" />
                    <AdIconAndText icon="https://img.icons8.com/material-sharp/256/map-marker.png" text={props.location} iconSize="h-1/6" textSize="text-6xl" />
                </div>
            </div>
    )
}

export default AdInspector;