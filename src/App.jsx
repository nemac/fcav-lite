import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Layer from './components/Layer';
import ReactLeafletMap from './components/ReactLeafletMap';
import { findMostRecentLayerDate } from './utils';
import { config } from './config';

function App() {
  const [selectedLayer, setSelectedLayer] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('20231226'); // TODO: Change this hardcoded
  return (
    <Box>
      <Grid>
        <Layer
          selectedLayer={selectedLayer}
          setSelectedLayer={setSelectedLayer}
        />
      </Grid>
      <ReactLeafletMap
        selectedLayer={selectedLayer}
      />
    </Box>
  )
}

export default App
