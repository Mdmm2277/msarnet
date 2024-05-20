import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { AuthProvider, LoadingProvider, routes, theme } from './shared';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';


const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>    
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />        
      <LoadingProvider>
        <RouterProvider router={router} />
        <Footer />
      </LoadingProvider>
    </ThemeProvider>
  </React.StrictMode>
);