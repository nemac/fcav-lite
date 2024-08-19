import React from 'react';
import dayjs from 'dayjs';
import { MapContainer, WMSTileLayer } from "react-leaflet";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import styled from "@emotion/styled";
import {
  useQuery,
} from '@tanstack/react-query'
import XMLParser from 'react-xml-parser';
import VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";

// internal imports
import BasicSelect from './components/BasicSelect';
import BasicButton from './components/BasicButton';
import BasicDatePicker from './components/BasicDatePicker';
import DateSlider from './components/DateSlider';
import { config } from './config';
import { webMercatorToLatLng, convertStringToDate } from "./utils.js";
import BasicText from "./components/BasicText.jsx";

export const StyledMapContainer = styled(MapContainer)(() => ({
  height: '100%',
  width: '100%'
}));

function App() {
  const [changeProduct, setChangeProduct] = React.useState(config.wmsLayers['FW3 1 year']);
  const [mask, setMask] = React.useState(config.masks['MaskForForest']);
  const [overlay, setOverlay] = React.useState(config.vectorLayers['Tropical Cyclone Lines 2022']);
  const [basemap, setBasemap] = React.useState(config.basemaps['ArcGIS Imagery']);
  const [availableLayers, setAvailableLayers] = React.useState([]);
  const [activeLayerIndex, setActiveLayerIndex] = React.useState(0);
  const [rasterOpacity, setRasterOpacity] = React.useState(75);
  const [startDate, setStartDate] = React.useState(dayjs('2024-07-01'));
  const [endDate, setEndDate] = React.useState(dayjs('2024-07-31'));
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [playSpeed, setPlaySpeed] = React.useState(config.playSpeeds['2x']);
  const [unFilteredLayers, setUnfilteredLayers] = React.useState([]);
  const intervalRef = React.useRef(null);

  const onSelectedDateChange = (event) => {
    console.log(event.target.value);
    setActiveLayerIndex(event.target.value)
  }

  const startDateChanged = (event) => {
    const newStartDate = event.$d;
    setStartDate(newStartDate)
    const allLayers = [];
    unFilteredLayers.forEach((layer) => {
      let date = layer.match(/(\d{4})(\d{2})(\d{2})/);
        date = convertStringToDate(date[0]);
        if (date >= newStartDate && date <= endDate) {
          allLayers.push(layer);
        }
      }
    )
    setAvailableLayers(allLayers);
  }

  const endDateChanged = (event) => {
    const newEndDate = event.$d;
    setEndDate(newEndDate)
    const allLayers = [];
    unFilteredLayers.forEach((layer) => {
      let date = layer.match(/(\d{4})(\d{2})(\d{2})/);
        date = convertStringToDate(date[0]);
        if (date >= startDate && date <= newEndDate) {
          allLayers.push(layer);
        }
      }
    )
    setAvailableLayers(allLayers);
  }

  const handleChangeProductChange = (event) => {
    const selectedChangeProduct = config.wmsLayers[event.target.value];
    setChangeProduct(selectedChangeProduct)
  };

  const handleMaskChange = (event) => {
    const selectedMask = config.masks(event.target.value);
    setMask(selectedMask);
  }

  const handleOverlayChange = (event) => {
    const selectedOverlay = event.target.value;
    setOverlay(config.vectorLayers[selectedOverlay]);
  }

  const handleBasemapChange = (event) => {
    const selectedBasemap = event.target.value;
    setBasemap(config.basemaps[selectedBasemap]);
  }

  const handleIsPlayingPress = (event) => {
    let currentLayerIndex = activeLayerIndex;
    if (isPlaying) {
      // Stop the interval
      clearInterval(intervalRef.current);
    } else {
      // Start the interval
      intervalRef.current = setInterval(() => {
        setActiveLayerIndex((currentLayerIndex + 1) % availableLayers.length);
        currentLayerIndex = currentLayerIndex + 1;
      }, 3000);
    }
    setIsPlaying(!isPlaying);
  }

  const {isPending, error, data, isFetching} = useQuery({
    queryKey: [changeProduct?.url],
    queryFn: async () => {
      const response = await fetch(
          `${changeProduct?.url}&service=WMS&request=GetCapabilities`
      );
      const xmlText = await response.text();
      const xml = new XMLParser().parseFromString(xmlText);
      return xml;
    },
    enabled: !!changeProduct?.url
  })

  if (isPending) console.log('isPending')
  if (error) return 'An error has occurred: ' + error.message

  // Update available layers when the getCapabilities query has returned
  React.useEffect(() => {
    if (!data) return;
    // const layerName = event.target.value;
    const layers = data?.getElementsByTagName('Layer');
    const queryableLayers = layers.filter(layer => layer.attributes.queryable === "1");
    const availableLayers = [];
    const allLayers = [];
    // const layerConfig = config.wmsLayers.find(layer => layer.name === layerName);
    queryableLayers.forEach(layer => {
      const layerName = layer.getElementsByTagName('Name')[0]?.value;
      if (changeProduct.layer_regex.test(layerName)) {
        allLayers.push(layerName);
        let date = layerName.match(/(\d{4})(\d{2})(\d{2})/);
        date = convertStringToDate(date[0]);
        if (date >= startDate && date <= endDate) {
          availableLayers.push(layerName);
        }
      }
    })
    console.log("jeff available", availableLayers)
    setAvailableLayers(availableLayers);
    setUnfilteredLayers(allLayers);
  },[data]);

  // Extract coordinates from the extent
  const minX = -10268395.80449;
  const minY = 2407154.1657405;
  const maxX = -7920250.29557;
  const maxY = 3445474.7579661;
  // Calculate lat/lng for each corner
  const southWest = webMercatorToLatLng(minX, minY);
  const northWest = webMercatorToLatLng(minX, maxY);
  const northEast = webMercatorToLatLng(maxX, maxY);
  const southEast = webMercatorToLatLng(maxX, minY);

// Calculate the center
  const centerLat = (southWest[0] + northWest[0] + northEast[0] + southEast[0]) / 4;
  const centerLng = (southWest[1] + northWest[1] + northEast[1] + southEast[1]) / 4;

  return (
    <Grid container spacing={2} p={1}>
      <Grid xs={12} lg={3}>
        <BasicSelect
          value={changeProduct.name}
          label={'Change Product'}
          selectionList={Object.keys(config.wmsLayers)}
          handleChange={handleChangeProductChange}
        />
      </Grid>
      <Grid xs={12} lg={3}>
        <BasicSelect
          value={mask.name}
          label={'Mask'}
          selectionList={Object.keys(config.masks)}
          handleChange={handleMaskChange}
        />
      </Grid>
      <Grid xs={12} lg={3}>
        <BasicSelect
          value={overlay.name}
          label={'Overlay'}
          selectionList={Object.keys(config.vectorLayers)}
          handleChange={handleOverlayChange}
        />
      </Grid>
      <Grid xs={12} lg={3}>
        <BasicSelect
          value={basemap.name}
          label={'Base Map'}
          selectionList={Object.keys(config.basemaps)}
          handleChange={handleBasemapChange}
        />
      </Grid>
      <Grid xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={startDate}
            label="Start Date"
            onChange={(event) => startDateChanged(event)}
          />
        </LocalizationProvider>
      </Grid>
      <Grid xs={12} lg={5}>
        <Slider
          aria-label="Date"
          // slots={{valueLabel: ValueLabelComponent}}
          onChange={(event) => onSelectedDateChange(event)}
          value={activeLayerIndex}
          step={1}
          marks
          min={0}
          max={availableLayers.length - 1}
        />
      </Grid>
      <Grid xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
              value={endDate}
              label="End Date"
              onChange={(event) => endDateChanged(event)}
          />
        </LocalizationProvider>
      </Grid>
      <Grid xs={12} lg={1}>
        <BasicButton
          icon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          label={isPlaying ? 'Pause' : 'Animate'}
          onClick={(event) => handleIsPlayingPress(event)}
        />
      </Grid>
    <Grid xs={12} style={{height: '1000px', width: '100%'}}>
      <StyledMapContainer
        id='map-container'
        center={config.mapCenter}
        zoom={config.mapZoom}
      >
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@latest/dist/leaflet.css"
        />
        {availableLayers.map((layer, index) => (
          <WMSTileLayer
            key={layer + mask}
            url={changeProduct.url}
            layers={layer}
            format="image/png"
            transparent={true}
            uppercase={true}
            mask={mask.name}
            opacity={index === activeLayerIndex ? 1 : 0}
          />
        ))}
        <WMSTileLayer
          key={overlay.name}
          url={overlay.url}
          layers={overlay.layerName}
          format="image/png"
          transparent={true}
          uppercase={true}
        />
        <div className='leaflet-bottom leaflet-left' style={{bottom: '10px', left: '20px'}}>
          <div className="leaflet-control leaflet-bar">
            <BasicText
              text={availableLayers[activeLayerIndex]}
            />
          </div>
        </div>
        <div className='leaflet-bottom leaflet-right' style={{bottom: '10px', right: '20px'}}>
          <div className="leaflet-control leaflet-bar">
            <BasicText
              text={overlay.name}
            />
          </div>
        </div>
        <VectorBasemapLayer key={basemap.basemap} name={basemap.basemap} token={config.agolApiKey}/>
      </StyledMapContainer>
    </Grid>
    </Grid>
  )
}

export default App
