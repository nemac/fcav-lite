import { createTheme } from '@mui/material/styles';

const CustomTheme = createTheme({
    root: {
        width: 300,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        color: "white",
        width: '100%',
        height: '45vh',
        background: 'rgb(26, 35, 39)',
        boxShadow: 24,
        padding: 4,
    }
});

export default CustomTheme;
