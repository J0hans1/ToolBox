import './App.css';

import Navbar from './components/Navbar';

import LoginPage from './pages/Login';
import RegisterPage from "./pages/Register";
import ErrorPage from './pages/ErrorPage';
import LandingPage from './pages/LandingPage';
import Ads from './pages/Ads';

import { HashRouter, Route, Routes, } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, amber } from '@mui/material/colors';

import './App.css';


export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey[900],
        
      },
      secondary: {
        main: grey[50],
      },
      info: {
        main: amber[300],
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<ErrorPage/>} />
          <Route path="/adcreator" element={<AdCreator />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );


}