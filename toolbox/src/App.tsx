import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/Login';
import RegisterPage from "./pages/Register";
import ErrorPage from './pages/ErrorPage';
import LandingPage from './pages/LandingPage';
import Ads from './pages/Ads';
import AdInspector from './pages/AdInspectorPage';
import { HashRouter, Route, Routes, } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, amber } from '@mui/material/colors';
import AdCreator from './pages/AdCreator';
import ProfilePage from './pages/ProfilePage';
import { Helmet } from "react-helmet";
import MyAds from './pages/MyAds';


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
    
    <div className="App">
    <Helmet>
      <meta charSet="utf-8" />
      <title>ToolBox</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
        
      
    <ThemeProvider theme={theme}>
      <HashRouter>

        <div id="c_section" className='fixed top-0 w-screen h-auto content-center z-20'>
            <div id="c_container" className='flex m-auto w-full max-w-7xl p-10'>
              <Navbar />
            </div>
        </div>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<ErrorPage/>} />
          <Route path="/adcreator" element={<AdCreator />} />
{/*           <Route path="/adinspector" element={<AdInspectorPage />} /> */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path='/myAds' element={<MyAds /> }/>
          <Route path='/adinspector/:id' element={<AdInspector />} />
        </Routes>

        <div id="c_section" className='w-screen h-auto content-center bg-black text-white'>
            <div id="c_container" className='flex m-auto w-full max-w-7xl p-10'>
              <Footer />
            </div>
        </div>

      </HashRouter>
    </ThemeProvider>

    
    </div>
  );


}