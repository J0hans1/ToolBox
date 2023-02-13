/* import InformationAdds from "../components/addsCard"; */
import { deleteAdd } from "../lib/controller";

import InformationAdds from "../components/addsCard";
import AddsInfo from "../components/addsInfo";


const LandingPage = () => {
    return (
        <div>
            <h1>Landing Page</h1>
            <AddsInfo />
        </div>
    );
};

export default LandingPage;