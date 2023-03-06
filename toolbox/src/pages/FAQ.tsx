
import { SingleAccordion, ControlledAccordions } from "../components/Accordion";
import Title from "../components/Title";
import REQUEST from '../img/request.png';
import USER from '../img/user.png';
import ADVERTISEMENT from '../img/advertisement.png';
import PROPERTY from '../img/property.png';
import PLANET from '../img/planet.png';
import SUPPORT from '../img/support.png';

interface CategoryFAQ {
    title: string;
    icon: string
    children: React.ReactNode;
}

const Category = (props: CategoryFAQ) => {
  return (
      <div className="flex w-1/2 my-7">
        <div className='flex flex-col w-11/12 h-auto text-left'>
            <img src={props.icon} className="w-11 h-11 bg-contain mb-5" alt="decorative icon" />
            <h1 className="text-3xl mb-5">{props.title}</h1>
            {props.children}
        </div>
      </div>
  )
}


const FAQ = () => {
  return (
    <div className="flex h-auto w-screen">
      <section className={'flex flex-col h-auto w-full content-center gap-10 bg-slate-100 overflow-hidden m-20'}>
        <div className='flex m-auto w-full max-w-7xl p-10 text-current'>
          <div className="flex flex-col justify-start w-full h-full my-10 ">

            <Title size={"text-5xl"} heading={"Ofte stilte spørsmål (FAQ)"} description={"Få svar på det du lurer på. Vi har samlet og kategorisert den viktigste informasjonen nedenfor."} />

            <div className="flex flex-row w-full flex-wrap">
              <Category title="Slik fungerer ToolBox" icon={REQUEST}>
                  <ControlledAccordions>
                    <SingleAccordion question={"Hva er ToolBox?"} answer={"ToolBox er en unik plattform der brukere kan registrere seg for å leie eller leie ut verktøy og redskaper. Vårt ønske er å gjøre det så enkelt, effektivt og billig å leie at det blir unødvendig å kjøpe nytt. Med 16 år i bransjen er vi en gammel spiller i et ungt game."} panel={"panel1"}/>
                    <SingleAccordion question={"Hvilket ansvar har utleier?"} answer={"Utleier har ansvar for at produktet overleveres til kunde i annonsert tilstand."} panel={"panel2"}/>
                    <SingleAccordion question={"Kan jeg kansellere reservasjoner?"} answer={"Nei. Vi har foreløpig ikke støtte for det. Reservasjoner er derfor bindende."} panel={"panel2"}/>
                    <SingleAccordion question={"Hva koster det å bruke ToolBox?"} answer={"ToolBox er en gratis tjeneste for alle som ønsker å enten låne eller leie ut utstyr."} panel={"panel2"}/>
                  </ControlledAccordions>
              </Category>

              <Category title="Din konto" icon={USER}>
                  <ControlledAccordions>
                    <SingleAccordion question={"Vurderinger"} answer={"Utleiere og leietakere kan vurdere leien etter at leien er over. Det hjelper andre som leier/leier ut å få en ide om hva de kan forvente seg i et leieforhold med denne individen. Det gir også initiativ for å gi bedre service og for å behandle leide ting med større forsiktighet. Per dags dato setter man en vurdering på en skala fra 1 (sur gubbe) til 5 (glad gubbe). De aller fleste av dem som legger igjen vurdering, velger faktisk å gi en 5, noe som tilsvarer at de er veldig fornøyd med leien og at det gikk bra uten problemer. Det ligger i vår backlog å gjøre om hele vårt vurderingssystem slik at det blir mye mer detaljert og bedre kan gi et fullt bilde av hele opplevelsen man har hatt ved et leieforhold."} panel={"panel1"}/>
                    <SingleAccordion question={"Kan jeg opprette en bedriftskonto for utleie?"} answer={"Nei. Vi har foreløpig ikke støtte for det."} panel={"panel2"}/>
                    <SingleAccordion question={"Hvordan opprette konto?"} answer={"For å opprette konto trykker du på 'Registrer'-knappen øverst til høyre på hjemsiden. Der fyller du ut personlig informasjon, sted og adresse og lager et brukernavn og passord. Avslutt med å trykke på 'Registrer'-knappen."} panel={"panel2"}/>
                    <SingleAccordion question={"Hvordan slette konto?"} answer={"Du kan slette kontoen din ved å gå på 'Min profil' -> 'Endre brukerinfo' -> 'Slett bruker'"} panel={"panel2"}/>
                  </ControlledAccordions>
              </Category>

              <Category title="Annonser" icon={ADVERTISEMENT}>
                  <ControlledAccordions>
                  <SingleAccordion question={"Hvordan kan jeg opprette en annonse?"} answer={"Du kan opprette en annonse ved å trykke på 'Annonser' i navigasjonsbaren, deretter trykke på 'Opprette annonse'-knappen til høyre for søkefeltet. "} panel={"panel1"}/>
                  <SingleAccordion question={"Hvordan kan jeg slette en annonse?"} answer={"Du kan slette en annonse ved å gå inn på 'Min profil', trykke på 'Mine annonser' i margen til venste. Der velger du annonsen du ønsker å slette, og trykker på 'Slett annonse'"} panel={"panel1"}/>
                  </ControlledAccordions>
              </Category>
              
              <Category title="Utleie" icon={PROPERTY}>
                  <ControlledAccordions>
                    <SingleAccordion question={"Kan jeg redigere profilinformasjon?"} answer={"Ja, det kan du. Dette gjør du ved å gå inn på 'Min profil' og trykke på 'Endre brukerinfo' under opplysningene dine.  "} panel={"panel1"}/>
                  </ControlledAccordions>
              </Category>

              
              <Category title="Hvorfor du bør bruke ToolBox?" icon={PLANET}>
                  <ControlledAccordions>
                    <SingleAccordion question={"De fleste utleiere svarer veldig raskt"} answer={"Svartid på forespørsler gjennom ToolBox er i gjennomsnitt 15 minutter. Det vil naturligvis variere fra person til person, og fra tilfelle til tilfelle. En utleier som er på ferie kan for eksempel svare saktere enn vanlig."} panel={"panel1"}/>
                    <SingleAccordion question={"Ting nære deg"} answer={"40% av de som leier via ToolBox synes at det viktigste er at tingen er i nærheten. De fleste av ToolBoxs leieforhold skjer innen 1 km radius, men det varierer litt avhengig av kategori."} panel={"panel2"}/>
                    <SingleAccordion question={"ToolBox er bra for miljøet"} answer={"Ved å dele mer på de tingene vi allerede har så minsker vi behovet for produksjon av nye ting og med det letter vi på miljøbelastningene. I tillegg til tradisjonelt kjøp-og-salg så finnes det et stort potensiale for å utnytte det man allerede har mer, ved å for eksempel leie ut tingene."} panel={"panel2"}/>
                  </ControlledAccordions>
              </Category>

              <Category title="Kundeservice" icon={SUPPORT}>
                  <ControlledAccordions>
                    <SingleAccordion question={"Hvordan ta kontakt med kundeservice?"} answer={"Vi svarer på supporthenvendelser hovedsakelig mandag-fredag kl. 08.00-17.00. Du vil kunne finne svar på de fleste av spørsmålene dine i vår FAQ. Ønsker du å komme i kontakt med oss? Åpningstider kundeservice: Hverdager 8-17. E-post: hei@toolbox.no"} panel={"panel1"}/>
                    <SingleAccordion question={"Hva skjer ved forsinket tilbakelevering?"} answer={"Dersom utleid ting ikke blir returnert til avtalt tid, så er det første du bør gjøre å kontakte leietaker for å finne en løsning på når tingen kan leveres tilbake til deg. Kommer dere ikke fram til noen løsning, eller om du ikke får kontakt med leietaker, kontakter du oss slik at vi kan hjelpe deg. Vår høyeste prioritet er selvfølgelig at du skal få tilbake tingen. Avhengig av årsak til sen retur og hvor lang forsinkelsen er, så kan vi komme til å kreve leietaker for ekstra leie."} panel={"panel1"}/>
                    <SingleAccordion question={"Hva skjer hvis gjenstanden er skadet ved retur"} answer={"Skader skal rapporteres til Omocom så snart forsikrede er blitt informert om skaden. Dette gjør du via en lenke du mottar fra ToolBox. Kontakt kundeservice på hei@toolbox.no for å få din unike lenke til skadeskjemaet. Vennligst inkluder bestillingsnummer for leien hvor skaden oppsto når du kontakter oss da vi trenger dette for å kunne gi deg rett lenke."} panel={"panel2"}/>
                  </ControlledAccordions>
              </Category>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default FAQ;