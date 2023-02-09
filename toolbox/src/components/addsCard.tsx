import { Adds } from "../types/users";


interface AProps{
    adds: Adds;
}

export default function Information({adds}: AProps){
    return (
        <div className="addsInfo">
            <h2>{adds.price}</h2>
            <h2>{adds.title}</h2>
        </div>
    )
}