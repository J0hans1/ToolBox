import AdInspector from "../components/AdInspector";
import AdUserInfo from "../components/AdUserInfo";

const AdInspectorPage = () => {
    return (
        <div className=" ">
            <div className="pt-32">
            <AdInspector icon={""} location={"Oslo"} date={"12.01"} price={"100"}/>
            </div>
            <div className="flex flex-row">

            <div>
            <AdUserInfo name={"Anne"} email={"anne@gmail.com"} phone={"824914783190"} avatar={""} />
            </div>
            <div className=" flex jusify-end w-1/3 p-10">
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
    );
};

export default AdInspectorPage;