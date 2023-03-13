import './App.css';
import PageNotFound from './pages/PageNotFound';
import LandingPage from './pages/LandingPage';
import Ads from './pages/AdsPage';
import AdInspector from './pages/AdInspectorPage';
import { HashRouter, Route, Routes, } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import AdCreator from './pages/AdCreator';
import ProfilePage from './pages/ProfilePage';
import { Helmet } from "react-helmet";
import MyAds from './pages/MyAds';
import ScrollToTop from './components/functions/ScrollToTop';
import SavedAds from './pages/SavedAds';
import EditAdPage from './pages/EditAdPage';
import FAQ from './pages/FAQPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReviewCreator from './pages/ReviewCreator';
import MyReviews from './pages/MyReviews';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import Snacks from './components/Snacks';
import { StartDateContext, EndDateContext, Snack, SnackbarContext } from './context/Context';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AuthRoute from './components/AuthRoute';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const [snack, setSnack] = useState(new Snack({ open: false }));
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack(new Snack({ color: snack.color, open: false }));
  };

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
          <SnackbarContext.Provider value={{ snack, setSnack }}>
            <AuthProvider >
              <Navbar />
              <ScrollToTop />

              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path='/adinspector/:id' element={<AdInspector />} />
                <Route path="/ads" element={<Ads />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/adcreator" element={<AuthRoute> <AdCreator /> </AuthRoute>} />
                <Route path="/editadpage/:id" element={<AuthRoute><EditAdPage /></AuthRoute>} />
                <Route path='/myAds' element={<AuthRoute><MyAds /></AuthRoute>} />
                <Route path="/myreviews" element={<AuthRoute><MyReviews /></AuthRoute>} />
                <Route path="/profile" element={<AuthRoute><ProfilePage /></AuthRoute>} />
                <Route path="/reviewad" element={<AuthRoute><ReviewCreator /></AuthRoute>} />
                <Route path="/savedads" element={<AuthRoute><SavedAds /></AuthRoute>} />
              </Routes>


              <div id="c_section" className='w-screen h-auto content-center bg-black text-white'>
                <div id="c_container" className='flex m-auto w-full max-w-7xl p-10'>
                  <Footer />
                </div>
              </div>

              <Snackbar open={snack.open} autoHideDuration={snack.autoHideDuration} onClose={handleClose}>
                <Alert severity={snack.color}>
                  {snack.message || ''}
                </Alert>
              </Snackbar>
            </AuthProvider>
          </SnackbarContext.Provider>
        </HashRouter>
      </ThemeProvider>

      <Snacks />
    </div>
  );
}