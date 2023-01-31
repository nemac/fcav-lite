import { useMap } from "react-leaflet";
import { useSelector } from "react-redux"; 

// https://medium.com/trabe/creating-a-react-leaflet-custom-component-using-hooks-5b5b905d5a01
export const ProductIndicator = ({ selector, productsList }) => {
    const productIndex = useSelector(selector);

    return (
        <div style={{background: 'whitesmoke', color: 'black'}}>
            {productsList[productIndex]}
        </div>
    );
};
