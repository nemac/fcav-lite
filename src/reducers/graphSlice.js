import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    graphOn: false
};

const graphSlice = createSlice({
    name: 'graph',
    initialState,
    reducers: {
        setGraphOn(state, action) {
            state.graphOn = action.payload;
        }
    }
});

export default graphSlice.reducer;
