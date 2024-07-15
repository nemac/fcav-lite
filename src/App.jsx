// external imports
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

// internal imports
import BasicSelect from './components/BasicSelect';
import BasicButton from './components/BasicButton';
import BasicDatePicker from './components/BasicDatePicker';
import DateSlider from './components/DateSlider';
import ReactLeafletMap from './components/ReactLeafletMap';
import { findMostRecentLayerDate } from './utils';
import { config } from './config';

function App() {
  const [changeProduct, setChangeProduct] = React.useState('');
  const [overLay, setOverlay] = React.useState('');
  const [basemap, setBasemap] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [playButton, setPlayButton] = React.useState(false);
  const [playSpeed, setPlaySpeed] = React.useState(config.playSpeeds['1x']);
  const [selectedDate, setSelectedDate] = React.useState('20231226'); // TODO: Make this not hardcoded
  const hardCodedDates = config.nonLeapYearDays.map(date => '2023' + date);

  const onSelectedDateChange = (event) => {
    console.log(event)
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <BasicSelect
            label={'Change Product'}
            selectedDate={selectedDate}
            changeProduct={changeProduct}
            setChangeProduct={setChangeProduct}
          />
        </Grid>
        <Grid xs={4}>
          Placeholder for overlay
        </Grid>
        <Grid xs={4}>
          Placeholder for Basemap
        </Grid>
        <Grid xs={1}>
          <BasicDatePicker/>
        </Grid>
        <Grid xs={9}>
          <DateSlider
            setSelectedDate={setSelectedDate}
            onSelectedDateChange={onSelectedDateChange}
            changeProduct={changeProduct}
            setChangeProduct={setChangeProduct}
          />
        </Grid>
        <Grid xs={2}>
          <BasicButton 
            icon={playButton ? <PauseIcon /> : <PlayArrowIcon />}
            label={playButton ? 'Pause' : 'Animate'}
            onClick={() => setPlayButton(!playButton)}
          />
        </Grid>
      </Grid>
      <ReactLeafletMap
        changeProduct={changeProduct}
      />
    </Box>
  )
}

export default App
