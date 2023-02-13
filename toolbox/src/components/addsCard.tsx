import { deleteAdd } from "../lib/controller";
import { Adds } from "../types/types";


interface AddsProps{
    adds: Adds;
}

function deleteAddButton(add: string){

    if (add != null){
        const x = deleteAdd(add);
        console.log(x);
    } 
}

export default function InformationAdds(props: AddsProps){
    return (
        <div className="addsInfo">
            <br />
            <h2>{props.adds.price}</h2>
            <h2>{props.adds.title}</h2>

            <button onClick={() => deleteAddButton(props.adds.id)}>Delete add above</button>
        </div>
    )
}