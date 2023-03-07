import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    let navigate = useNavigate();
    return (
        <div className="w-full h-auto text-left">
            <h1 className="text-4xl mb-5">Toolbox</h1>
            <div className="flex flex-row w-full gap-20 mb-10">
                <div id="ROW_LEFT" className="flex flex-col text-left max-w-1/2">
                    <h2 className="text-2xl mb-2">Kontakt oss:</h2>
                    <p>Adressegaten 23B, 7069, Trondheim</p>
                    <p>Mail: kontakt@toolbox.no</p>
                    <p>Telefon: +47 412 36 689</p>
                </div>

                <div id="ROW_RIGHT" className="flex flex-col text-center max-w-1/2" text-white>
                    <h2 className="text-2xl mb-2">Sider:</h2>
                    <Button onClick={() => navigate("/ads")} style={{ color: "white" }}>Annonser</Button>
                    <Button onClick={() => navigate("/")} style={{ color: "white" }}>Om oss</Button>
                    <Button onClick={() => navigate("/profile")} style={{ color: "white" }}>Min side</Button>
                    <Button onClick={() => navigate("/adcreator")} style={{ color: "white" }}>Opprett annonse</Button>
                    <Button onClick={() => navigate("/login")} style={{ color: "white" }}>Logg inn</Button>
                    <Button onClick={() => navigate("/register")} style={{ color: "white" }}>Registrer bruker</Button>
                </div>
            </div>

            <p>© ToolBox AS 2022</p>

        </div>
    );
}

export default Footer;