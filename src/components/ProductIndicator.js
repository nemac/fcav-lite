import { useMap } from "react-leaflet";
import Box from '@mui/material/Box';
import { useSelector } from "react-redux";

// https://medium.com/trabe/creating-a-react-leaflet-custom-component-using-hooks-5b5b905d5a01
export const ProductIndicator = ({ selector, productsList }) => {
    const productIndex = useSelector(selector);

    return (
        <Box 
            sx={{
                background: 'rgba(3, 144, 237, 0.5)',
                color: 'white',
                fontSize: 28,
                padding: '10px 150px 10px 20px'
            }}
        >
            {productsList[productIndex]}
        </Box>
    );
};
