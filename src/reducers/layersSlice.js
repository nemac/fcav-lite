import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOverlayLayerObjects, getWmsLayerObjects } from "../utils";

const startDate = '2021-01-02';
const endDate = '2021-02-17';

const initialState = {
    overlayLayers: getOverlayLayerObjects(new Date(startDate), new Date(endDate), 0),
    wmsLayers: getWmsLayerObjects(new Date(startDate), new Date(endDate), 0),
    startDate,
    endDate,
    dateRangeIndex: 0,
    productIndex: 0,
    overlayIndex: 0
};

const updateLayers = state => {
    state.wmsLayers = getWmsLayerObjects(new Date(state.startDate), new Date(state.endDate), state.productIndex);
    state.overlayLayers = getOverlayLayerObjects(new Date(state.startDate), new Date(state.endDate), state.overlayIndex);
};

const layersSlice = createSlice({
    name: 'layers',
    initialState,
    reducers: {
        changeStartDate(state, action) {
            state.startDate = action.payload;
            updateLayers(state);
        },
        changeEndDate(state, action) {
            state.endDate = action.payload;
            updateLayers(state);
        },
        changeDateRangeIndex(state, action) {
            state.dateRangeIndex = action.payload;
        },
        incrementDateRangeIndex(state) {
            if (state.dateRangeIndex < Object.keys(state.wmsLayers).length - 1) {
                state.dateRangeIndex++;
            }
        },
        changeProductIndex(state, action) {
            state.productIndex = action.payload;
            updateLayers(state);
        },
        changeOverlayIndex(state, action) {
            state.overlayIndex = action.payload;
            updateLayers(state);
        }
    }
});

export const selectLayerProperty = (state, property) => state.layers[property];

export const { 
    changeStartDate, 
    changeEndDate, 
    changeDateRangeIndex,
    incrementDateRangeIndex, 
    changeProductIndex,
    changeOverlayIndex } = layersSlice.actions;

export default layersSlice.reducer;
