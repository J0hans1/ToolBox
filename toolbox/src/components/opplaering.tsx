import React from "react"
import { ReactElement } from "react"

//typing interface. Ryddig måte å definere typing på
interface TitledChildren {
    //title er en prop som er av typen string
    title: string

    //children er en spesiell prop som inneholder alt som er mellom åpne og lukke tag
    //vi må derfor definere hva som kan være children, og det er alt som er av typen ReactElement
    //ReactElement er en interface som inkluderer alle html elementer, og alle react-komponenter

    children?: ReactElement<any>
}


//props er et objekt som inneholder alle attributer som er definert i TitledChildren
const TitledBox = (props : TitledChildren) => {
    return (
        <div>
            <h1 className="text-3xl font-bold underline text-white">
                {props.title}            
            </h1>
            {props.children}
        </div>
    )
}

export default TitledBox





//type skiller seg fra interface ved at type kan brukes til å definere hva slags type en variabel skal være
type MyProps = {
  message: string;
};
type MyState = {
  count: number; 
};


//dette er en klasse måte å definere en react-komponent på, den er litt mer komplisert enn funksjonell komponent
//denne klassen er en subklasse av React.Component, og tar inn to parametere, MyProps og MyState
//MyProps er en type som er definert over, og MyState er en type som er definert over
//myProps er en type som inneholder alle attributer som er definert i TitledChildren
//myState er en type som inneholder en variabel som heter count, og som er av typen number

//denne komponenten har en state, og state er et objekt som inneholder alle variabler som er definert i MyState
//state kan endres ved å bruke setState, og det er denne funksjonen som gjør at react oppdaterer komponenten

export class Counter extends React.Component<MyProps, MyState> {
  state: MyState = {
    // optional second annotation for better type inference
    count: 0,
  };
  render() {
    return (
      <div>
        {this.props.message} {this.state.count}
        <br/>
        <button onClick={
            () => this.setState({
                    count: this.state.count + 1 
                }
            )}>
            Click me
        </button>
      </div>
    );
  }
}

//jeg foretrekker å bruke funksjonelle komponenter, da de er enklere å lese og skrive etter min mening
//dette er en funksjonell komponent som tar inn en prop som heter message, og som er av typen string
//denne komponenten har en state, og bruker useState hooken for å definere state
//useState hooken tar inn en variabel som heter count, og som er av typen number
//useState hooken returnerer en liste med to elementer, count og setCount
//count er en variabel som inneholder verdien til count, og setCount er en funksjon som kan endre verdien til count
//parameterert til useState hooken er verdien til count, og denne verdien vil være 0 når komponenten rendres første gang
//knappen vil endre verdien til count med 1 hver gang den trykkes på
//den er også tailwind stylet
export const Counter2 = (props : MyProps) => {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            {props.message} {count}
            <br/>
            <button 
                onClick={() => {
                    setCount(count + 1)
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold
                py-2 px-4 rounded hover:scale-105 transform transition duration-500
                ease-in-out active:bg-blue-900 active:scale-95"
            >
                Click me
            </button>
        </div>
    )
}
