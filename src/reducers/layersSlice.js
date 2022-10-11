import { createSlice } from '@reduxjs/toolkit';
import { getWMSLayersYearRange } from "../utils";

const initialState = {
    wmsLayers: [],
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    dateRangeIndex: 0,
    productIndex: 0
};

const updateWmsLayers = state => state.wmsLayers = getWMSLayersYearRange(state.startDate, state.endDate, state.productIndex);

const layersSlice = createSlice({
    name: 'layers',
    initialState,
    reducers: {
        startDateChanged(state, action) {
            state.startDate = action.payload;
            updateWmsLayers(state);
        },
        endDateChanged(state, action) {
            state.endDate = action.payload;
            updateWmsLayers(state);
        },
        dateRangeIndexChanged(state, action) {
            state.dateRangeIndex = action.payload;
        },
        productIndexChanged(state, action) {
            state.productIndex = action.payload;
            updateWmsLayers(state);
        }
    }
});

export const selectWmsLayers = state => state.layers.wmsLayers;
export const selectDateRangeIndex = state => state.layers.dateRangeIndex;

export default layersSlice.reducer;
