const Footer = () => {
    return(
        <div className="w-full h-auto text-left">
            <h1 className="text-4xl mb-5">Toolbox</h1>
            <div className="flex flex-row w-full gap-20 mb-10">
                <div id="ROW_LEFT" className="flex flex-col text-left max-w-1/2">
                    <h2 className="text-2xl mb-2">Kontakt oss:</h2>
                    <p>Adressegaten 23B, 7069, Trondheim</p>
                    <p>Mail: kontakt@toolbox.no</p>
                    <p>Telefon: +47 412 36 689</p>
                </div>

                <div id="ROW_RIGHT" className="flex flex-col text-left max-w-1/2">
                    <h2 className="text-2xl mb-2">Sider:</h2>
                    <a href="/#/Ads">Annonser</a>
                    <a href="url">Om oss</a> {/* //TODO: Link til om oss */}
                    <a href="/#/Profile">Min side</a>
                    <a href="/#/AdCreator">Opprett annonse</a>
                    <a href="/#/Login">Logg inn</a>
                    <a href="/#/Register">Registrer bruker</a>
                </div>
            </div>

            <p>© ToolBox AS 2022</p>

        </div>
    );
}

export default Footer;