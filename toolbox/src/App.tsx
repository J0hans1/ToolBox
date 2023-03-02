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
import { grey } from '@mui/material/colors';
import AdCreator from './pages/AdCreator';
import ProfilePage from './pages/ProfilePage';
import { Helmet } from "react-helmet";
import MyAds from './pages/MyAds';
import ScrollToTop from './components/ScrollToTop';
import SavedAds from './pages/SavedAds';
import EditAdPage from './pages/EditAdPage';


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
        main: '#FFD542',
        dark: '#ffca12',
      },
    },
  });

  return (
    
    <div className="App w-screen overflow-hidden">
    <Helmet>
      <meta charSet="utf-8" />
      <title>ToolBox</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
        
      
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Navbar />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<ErrorPage/>} />
          <Route path="/adcreator" element={<AdCreator />} />
          <Route path='/adinspector/:id' element={<AdInspector />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/editadpage/:id" element={<EditAdPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/myAds' element={<MyAds /> }/>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/savedads" element={<SavedAds />} />   
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