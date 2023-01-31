import { useMap } from "react-leaflet";
import { useSelector } from "react-redux"; 

// https://medium.com/trabe/creating-a-react-leaflet-custom-component-using-hooks-5b5b905d5a01
export const ProductIndicator = ({ selector, productsList }) => {
    const productIndex = useSelector(selector);

    const map = useMap();

    return (
        <div style={{position: 'absolute', width: 100, height: 50, top: 100, right: 100}}>
            {productsList[productIndex]}
        </div>
    );
};
