import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Normal or default theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f5f5f5'
    },
    secondary: {
      main: '#222222'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#f5f5f5'
    },
    appBar: {
      main: '#556cd6',
      contrastText: '#222222'
    },
    nemacLogo: './nemac_logo_black.png'
  }
});

export default theme;
