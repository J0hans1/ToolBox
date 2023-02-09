import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import TitledBox from './components/opplaering';
import { Counter, Counter2 } from './components/opplaering';
import UserInfo from './components/userInfo';
import AddsInfo from './components/addsInfo';

import './App.css';
import AdCreator from './pages/AdCreator';

function App() {
  return (
    <div className="App">
      <header className='h-auto bg-pu-beach'>

        {/*Navbar div*/}
        <div className='bg-pu-seafoam h-20'>
          <h1>Her kommer en navbar</h1>
        </div>

        {/*Content div, hvor alle pages byttes ut */}
        <div>
          <AdCreator />   
        </div>
      </header>

    </div>
  );
}

export default App;
