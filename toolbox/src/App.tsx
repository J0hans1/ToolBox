
import './App.css';
import AdCreator from './pages/AdCreator';

function App() {
  return (
    <div className="App">
      <header className='h-screen bg-pu-beach'>

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
