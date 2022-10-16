import { createSlice } from '@reduxjs/toolkit';
import config from '../config';

const initialState = {
    basemaps: config.baseLayers,
    basemapIndex: 2
}

const basemapsSlice = createSlice({
    name: 'basemaps',
    initialState,
    reducers: {
        changeBasemapIndex(state, action) {
            state.basemapIndex = action.payload;
        }
    }
});

export const selectBasemaps = state => state.basemaps.basemaps;
export const selectBasemapIndex = state => state.basemaps.basemapIndex;

export const { changeBasemapIndex } = basemapsSlice.actions;

export default basemapsSlice.reducer;
