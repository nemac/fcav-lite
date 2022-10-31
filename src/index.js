import React from 'react';
import { createRoot } from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import App from './App';
// import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from './store';
import CustomThemeProvider from './CustomThemeProvider';

/* export const theme = createMuiTheme({
  overrides: {
     MuiAppBar: {
       colorPrimary: {
         backgroundColor: "#FFC0CB" // Pink AppBar
       }     }   },
  palette: {
    primary: {
      main: "#424242",
      backgroundColor: "#424242"
    },
    secondary: {
      main: "#e0e0e0"
    }
  }
}); */
const rootElement = document.getElementById('app');
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <CustomThemeProvider>
      <App/>
    </CustomThemeProvider>
  </Provider>);
