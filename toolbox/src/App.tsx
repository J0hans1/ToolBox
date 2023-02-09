
import './App.css';

import Navbar from './components/Navbar';

import LoginPage from './pages/Login';
import RegisterPage from "./pages/Register";
import ErrorPage from './pages/ErrorPage';
import LandingPage from './pages/LandingPage';
import Ads from './pages/Ads';

import { HashRouter, Route, Routes, } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
