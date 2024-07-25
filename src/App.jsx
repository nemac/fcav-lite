// external imports
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import {
  useQuery,
} from '@tanstack/react-query'
import XMLParser from 'react-xml-parser';

// internal imports
import BasicSelect from './components/BasicSelect';
import BasicButton from './components/BasicButton';
import BasicDatePicker from './components/BasicDatePicker';
import DateSlider from './components/DateSlider';
import ReactLeafletMap from './components/ReactLeafletMap';
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
  const [availableLayers, setAvailableLayers] = React.useState([{value: 1}]);

  const onSelectedDateChange = (event) => {
    console.log(event)
  }

  const handleChangeProductChange = (event) => {
    const newLayer = event.target.value;
    setChangeProduct(newLayer);
    const layers = data?.getElementsByTagName('Layer');
    const queryableLayers = layers.filter(layer => layer.attributes.queryable === "1");
    const allLayers = [];
    const layerConfig = config.wmsLayers.find(layer => layer.name === newLayer.name);
    let counter = 1;
    queryableLayers.forEach(layer => {
      const layerName = layer.getElementsByTagName('Name')[0]?.value;
      if (layerConfig.layer_regex.test(layerName)) {
        const date = layerName.match(/(\d{4})(\d{2})(\d{2})/);
        allLayers.push({
          value: counter,
          label: 'Jeff'
        })
      }
      counter+=1;
    })
    setAvailableLayers(allLayers)
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['wmsCapabilities'],
    queryFn: async () => {
      const response = await fetch(
        'http://load-balancer-dev-947115727.us-east-1.elb.amazonaws.com/?map=/etc/mapserver/ecs_test_map_files/mapserver.map&service=WMS&request=GetCapabilities',
      )
      const xmlText = await response.text();
      const xml = new XMLParser().parseFromString(xmlText);
      return xml;
    }
  })

  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <BasicSelect
            label={'Change Product'}
            selectedDate={selectedDate}
            selection={changeProduct}
            selectionList={config.wmsLayers}
            handleChange={handleChangeProductChange}
          />
        </Grid>
        <Grid xs={4}>
          Placeholder for overlay
        </Grid>
        <Grid xs={4}>
          Placeholder for Basemap
        </Grid>
        <Grid xs={6}>
          <BasicDatePicker
            label='Set Start Date'
            setDate={setStartDate}
          />
        </Grid>
        <Grid xs={6}>
          <BasicDatePicker
            label='Set End Date'
            setDate={setEndDate}
          />
        </Grid>
        <Grid xs={4}>
          <DateSlider
            setSelectedDate={setSelectedDate}
            onSelectedDateChange={onSelectedDateChange}
            changeProduct={changeProduct}
            setChangeProduct={setChangeProduct}
            marks={availableLayers}
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
