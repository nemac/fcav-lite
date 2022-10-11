const initialState = {
    wmsLayers: [],
    startDate: new Date(),
    endDate: new Date(),
    dateRangeIndex: 0,
    productIndex: 0
};

const layersSlice = createSlice({
    name: 'layers',
    initialState,
    reducers: {}
});
