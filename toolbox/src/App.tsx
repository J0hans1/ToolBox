import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import TitledBox from './components/opplaering';
import { Counter, Counter2 } from './components/opplaering';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br/>
        <Button variant="contained">Hello World</Button>
        <TitledBox title="Hello World">
          <p>Overskriften er stylet i tailwindCSS!</p>
        </TitledBox>
        <Counter message="Du har trykket på knappen"/>
        <Counter2 message="Du har trykket på knappen"/>
      </header>
    </div>
  );
}

export default App;
