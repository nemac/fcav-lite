import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    graphOn: false
};

const graphSlice = createSlice({
    name: 'graph',
    initialState,
    reducers: {
        toggleGraphOn(state) {
            state.graphOn = !state.graphOn;
        }
    }
});

export const selectGraphOn = state => state.graph.graphOn;

export const { toggleGraphOn } = graphSlice.actions;

export default graphSlice.reducer;
