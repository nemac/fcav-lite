import { createSlice } from '@reduxjs/toolkit';
import config from './config';

const initialState = {
    basemaps: config.baseLayers,
    basemapIndex: 2
}

const basemapsSlice = createSlice({
    name: 'basemaps',
    initialState,
    reducers: {
        basemapIndexChanged(state, action) {
            state.basemapIndex = action.payload;
        }
    }
});
