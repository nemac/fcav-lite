import { configureStore } from "@reduxjs/toolkit";
import layersReducer from 'reducers/layersSlice';
import graphReducer from 'reducers/graphSlice';

export default configureStore({
    reducer: {
        layers: layersReducer,
        graph: graphReducer
    }
});
