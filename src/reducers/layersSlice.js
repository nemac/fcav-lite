import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWMSLayersYearRange } from "../utils";

const startDate = '2021-01-02';
const endDate = '2021-02-17';

const initialState = {
    wmsLayers: getWMSLayersYearRange(new Date(startDate), new Date(endDate), 0),
    startDate,
    endDate,
    dateRangeIndex: 0,
    productIndex: 0
};

const updateWmsLayers = state => 
    state.wmsLayers = getWMSLayersYearRange(new Date(state.startDate), new Date(state.endDate), state.productIndex);

export const incrementDateRangeIndexAsync = () => {
    return (dispatch, getState) => {
        setTimeout(() => {
              dispatch(incrementDateRangeIndex(getState()));
          }, 1000);
    }
}

const layersSlice = createSlice({
    name: 'layers',
    initialState,
    reducers: {
        changeStartDate(state, action) {
            state.startDate = action.payload;
            updateWmsLayers(state);
        },
        changeEndDate(state, action) {
            state.endDate = action.payload;
            updateWmsLayers(state);
        },
        changeDateRangeIndex(state, action) {
            state.dateRangeIndex = action.payload;
        },
        incrementDateRangeIndex(state) {
            if (state.dateRangeIndex < state.wmsLayers.length - 1) {
                state.dateRangeIndex++;
            }
        },
        changeProductIndex(state, action) {
            state.productIndex = action.payload;
            updateWmsLayers(state);
        }
    }
});

export const selectLayerProperty = (state, property) => state.layers[property];

export const { 
    changeStartDate, 
    changeEndDate, 
    changeDateRangeIndex,
    incrementDateRangeIndex, 
    changeProductIndex } = layersSlice.actions;

export default layersSlice.reducer;
