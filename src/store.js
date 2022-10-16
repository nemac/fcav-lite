import { configureStore } from "@reduxjs/toolkit";
import layersReducer from './reducers/layersSlice';
import graphReducer from './reducers/graphSlice';
import basemapsReducer from './reducers/basemapsSlice';

export default configureStore({
    reducer: {
        layers: layersReducer,
        graph: graphReducer,
        basemaps: basemapsReducer
    }
});
