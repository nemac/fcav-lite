/* This component will be for the leaflet map and all of its logic
We anticipate calling NDVIMultiYearGraph from this component
MapLegend.js will be in here too
*/

import React, {
  useDebugValue, useEffect, useRef, useState
} from 'react';
import { Grid } from '@material-ui/core';
import { MapContainer, useMap } from 'react-leaflet';
import 'leaflet-spin';
import 'leaflet-loading';
import 'leaflet-loading/src/Control.Loading';
import 'leaflet-loading/src/Control.Loading.css';
// suggested here: https://stackoverflow.com/questions/66519812/esri-leaflet-geocoder-component-not-rendering-how-to-connect-providers-in-prod
import * as ELG  from 'esri-leaflet-geocoder';
import L from 'leaflet';
import PropTypes from 'prop-types';
import { parse } from 'fast-xml-parser';
import forwarn2Legend from '../../forwarn2-legend.png';
import { NDVIMultiYearGraph } from '../NDVIMultiYearGraph';
import { AnimationController } from '../AnimationController';
import { useStateWithLabel, useCompare, getLeafletLayer } from '../../utils';
import { useSelector } from 'react-redux';
import { selectLayerProperty } from '../../reducers/layersSlice';
import { selectGraphOn } from '../../reducers/graphSlice';
import { selectBasemaps, selectBasemapIndex } from '../../reducers/basemapsSlice';
import './LeafletMap.css';
import { OfflineBolt } from '@material-ui/icons';

// This API Key is used to access ArcGIS Online location services
const apiKey = 'AAPK193b1a907b48469f98a0d22c7e27c57d_8CPajLDlUjQfkzjt4nWhAM0cjYe_8sRYBBnG0_iVP74XPYKqbQU3uhduKsl_pBs';

// Map Defaults
const center = [37, -98];
const zoom = 4.5;

const MapController = ({
  currentGraphCoords, setMap, modisData, setModisData, 
  modisDataConfig, setModisDataConfig
}) => {
  const graphOn = useSelector(selectGraphOn);
  const startDate = useSelector(state => selectLayerProperty(state, 'startDate'));
  const endDate = useSelector(state => selectLayerProperty(state, 'endDate'));
  const dateRangeIndex = useSelector(state => selectLayerProperty(state, 'dateRangeIndex'));
  const productIndex = useSelector(state => selectLayerProperty(state, 'productIndex'));
  const wmsLayers = useSelector(state => selectLayerProperty(state, 'wmsLayers'));
  const overlayLayers = useSelector(state => selectLayerProperty(state, 'overlayLayers'));
  const basemaps = useSelector(selectBasemaps);
  const basemapIndex = useSelector(selectBasemapIndex);

  const [leafletLayers, setLeafletLayers] = useState({});

  const search = ELG.geosearch({
    useMapBounds: false, 
    providers: [
      ELG.arcgisOnlineProvider({
        apikey: apiKey
      })
    ]
  });

  const map = useMap();

  useEffect(() => {
    setMap(map);
  }, []);

  // Update layers hook adds new layers to the map and removes old layers, also updating the leafletLayers object.
  useEffect(() => {
    setLeafletLayers(prevLeafletLayers => {
      const newLeafletLayers = {};
      
      const layerObjects = wmsLayers.concat(overlayLayers);
      console.log("Layer objects: ");
      console.log(layerObjects);

      for (const url in prevLeafletLayers) {
        if (!layerObjects.some(object => object.url === url)) {
          map.removeLayer(prevLeafletLayers[url]);
        }
      }

      for (const object of layerObjects) {
        if (Object.keys(prevLeafletLayers).some(url => url === object.url)) {
          newLeafletLayers[object.url] = prevLeafletLayers[object.url];
        } else {
          const leafletLayer = getLeafletLayer(object);
          console.log("Object: " + object);
          newLeafletLayers[object.url] = leafletLayer;
          console.log(newLeafletLayers);
          map.addLayer(leafletLayer);
          leafletLayer.bringToBack();
        }
      }

      return newLeafletLayers;
    });
  }, [wmsLayers, overlayLayers]);

  const basemapRef = useRef();

  const hasBaseMapChanged = useCompare(basemapIndex);

  const [isInitialRender, setIsInitialRender] = useStateWithLabel(true, 'initialrender');

  const hasProductIndexChanged = useCompare(productIndex);

  // Date State
  const hasStartDateChanged = useCompare(startDate);
  const hasEndDateChanged = useCompare(endDate);
  const hasDateRangeIndexChanged = useCompare(dateRangeIndex);

  const hasGraphCoordsChanged = useCompare(currentGraphCoords);

  const fetchChartData = (lat, long) => {
    const baseurl = `https://fcav-ndvi-dev.nemac.org/tsmugl_product.cgi?args=CONUS_NDVI,${lat},${long}`;
    return fetch(baseurl).then((response) => response.text())
      .then((textResponse) => parse(textResponse))
      .catch((error) => {
        console.log('invalid coords');
      });
  };

  const parseValuesToInts = (data) => {
    const dataArr = data.split('\n');
    for (let i = 0; i < dataArr.length; i++) {
      // let str = String(data[i]);
      let dataSTR = dataArr[i];
      dataSTR = dataSTR.substr(9, 11);
      dataArr[i] = parseInt(dataSTR);
      if (dataArr[i] < 0) {
        dataArr[i] = 0;
      }
    }
    return dataArr;
  };

  const parseDatesToString = (data) => {
    const dateArr = data.split('\n');
    for (let i = 0; i < dateArr.length; i++) {
      let dateSTR = dateArr[i];
      dateSTR = dateSTR.substr(0, 8);
      const year = dateSTR.substr(0, 4);
      const month = dateSTR.substr(4, 2);
      const day = dateSTR.substr(6, 2);
      // console.log(year + "/" + month + "/" + day);
      dateSTR = `${month}/${day}/${year}`;
      dateArr[i] = dateSTR;
    }
    // trim array to range
    let startIndex = 0;
    let endIndex = 0;
    const dateObjArr = [dateArr.length];
    for (let i = 0; i < dateArr.length; i++) {
      const dateSTR = dateArr[i];
      const month = dateSTR.substr(0, 2);
      const day = dateSTR.substr(3, 2);
      const year = dateSTR.substr(6, 4);
      const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      dateObjArr[i] = dateObj;
      // console.log(dateObj);
    }
    console.log(dateObjArr);
    for (let i = 0; i < dateObjArr.length; i++) {
      if (startDate > dateObjArr[i]) {
        startIndex = i + 1;
      }
    }
    for (let i = dateObjArr.length; i > 0; i--) {
      if (endDate < dateObjArr[i]) {
        endIndex = i;
      }
    }
    console.log(`${startIndex}, ${endIndex}`);
    return dateArr.slice(startIndex, endIndex);
  };

  const getChartData = async (lat, long) => {
    const result = fetchChartData(lat, long);
    result.then((response) => {
      if (response.mugl != null) {
        console.log('data fetch success');
        console.log(response);
        const parsedData = parseValuesToInts(response.mugl.data.values);
        const xAxis = parseDatesToString(response.mugl.data.values);
        const newModisData = { ...modisData };
        newModisData.labels = xAxis;
        newModisData.coordinates = [lat, long];
        newModisData.datasets[0].label = response.mugl.verticalaxis.title;
        newModisData.datasets[0].data = parsedData;
        setModisData(newModisData);
      } else {
        console.log('invalid coordinates selected, do nothing');
      }
    });
  };

  const getChartLineValue = () => {
    /* let chartDate = modisData.labels[dateRangeIndex];
        let wmsDate = wmsLayers[dateRangeIndex].date;
        wmsDate.setDate(wmsDate.getDate() - 1); //account for 1 day offset

        let chartDateSTR = chartDate;
        let month = chartDateSTR.substr(0,2);
        let day = chartDateSTR.substr(3, 2);
        let year = chartDateSTR.substr(6, 4);
        let chartDateObj = new Date(parseInt(year), parseInt(month)-1, parseInt(day));
        console.log(chartDateObj);

        let dateIndex = -1;
        for(let i = 0; i < wmsLayers.length; i++){
          let wmsDate = wmsLayers[i].date;
          wmsDate.setDate(wmsDate.getDate() - 1); //account for 1 day offset
          if(wmsDate == chartDateObj){
            dateIndex = i;
          }
        }
        console.log(dateIndex);
        return dateIndex; */
    const chartDate = modisData.labels[dateRangeIndex];

    const wmsLayerStrings = [wmsLayers.length];
    for (let i = 0; i < wmsLayers.length; i++) {
      const wmsLayer = wmsLayers[i].options.layers;

      const wmsLayerYear = wmsLayer.substr(3, 4);
      const wmsLayerMonth = wmsLayer.substr(7, 2);
      const wmsLayerDay = wmsLayer.substr(9, 2);

      const wmsLayerDate = `${wmsLayerMonth}/${wmsLayerDay}/${wmsLayerYear}`;
      wmsLayerStrings[i] = wmsLayerDate;
    }

    let dateIndex = -1;
    dateIndex = modisData.labels.indexOf(wmsLayerStrings[dateRangeIndex]);
    return dateIndex;
  };

  // Utility to make layers transparent and send them to back
  const prepareMap = () => {
    console.log('Making layers transparent...');
    map.eachLayer(layer => {
      // Don't make the basemap transparent!
      if (basemapRef.current == layer) {
        return;
      }

      layer.bringToBack();
      layer.setOpacity(0);
    });
  };

  // console.log(useCompare(basemapIndex));
  // Hook: basemap change
  useEffect(() => {
    if (hasBaseMapChanged || isInitialRender) {
      console.log('basemap change hook');
      if (basemapRef.current != null) {
        map.removeLayer(basemapRef.current);
      }
      const oldBasemap = basemapRef.current;
      const newBasemap = basemaps[basemapIndex];
      const leafletLayer = new L.tileLayer(newBasemap.url, {
        opacity: 0,
        attribution: newBasemap.attribution
      });
      
      map.addLayer(leafletLayer);
      leafletLayer.bringToBack();
      leafletLayer.setOpacity(1);
      basemapRef.current = leafletLayer;
    }
    if (hasBaseMapChanged && !isInitialRender) {
      return () => {
        // map.removeLayer(basemapRef.current)
      };
    }
  }, [hasBaseMapChanged, basemapIndex]);

  // Hook: leaflet layers and date range index change hook
  useEffect(() => {
    prepareMap();
    const wmsLayerUrl = wmsLayers[dateRangeIndex].url;
    const overlayLayerUrl = overlayLayers[dateRangeIndex].url;
    console.log("overlay layers: ");
    console.log(overlayLayers);
    console.log("Overlay layer url: " + overlayLayerUrl);
    const wmsLayer = leafletLayers[wmsLayerUrl];
    const overlayLayer = leafletLayers[overlayLayerUrl];

    if (wmsLayer !== undefined && overlayLayer !== undefined) {
      wmsLayer.bringToFront();
      wmsLayer.setOpacity(1);
      overlayLayer.bringToFront();
      overlayLayer.setOpacity(1);}
    if (graphOn) {
      // chartLineValue();
      const newLineValue = { ...modisDataConfig };
      newLineValue.plugins.annotation.annotations[0].value = getChartLineValue();
      newLineValue.plugins.annotation.annotations[0].label.content =
      modisData.labels[dateRangeIndex];
      setModisDataConfig(newLineValue);
    }
  }, [leafletLayers, hasDateRangeIndexChanged, dateRangeIndex]);

  // hook: has date range changed - update graph data range
  useEffect(() => {
    if (hasStartDateChanged || hasEndDateChanged) {
      if (graphOn) {
        getChartData(currentGraphCoords[1], currentGraphCoords[0]);
      }
    }
  }, [hasStartDateChanged, hasEndDateChanged, startDate, endDate]);

  // hook: different coordinates selected, update graph data
  useEffect(() => {
    if (hasGraphCoordsChanged) {
      if (graphOn) {
        getChartData(currentGraphCoords[1], currentGraphCoords[0]);
      }
    }
  }, [hasGraphCoordsChanged, currentGraphCoords]);

  if (isInitialRender) { // check if initilization is complete so we don't reinitilize components
    search.addTo(map);
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML =
                `<img src=${forwarn2Legend}` + ' width="128.5px" height="210.5px">';
      return div;
    };
    legend.addTo(map);

    // create loading indicator
    const leafletLoading = L.Control.loading({
      separate: true
      // position: 'topcenter'
    });
    leafletLoading.addTo(map);
  }

  if (isInitialRender) {
    setIsInitialRender(false);
  }

  return null;
};

MapController.propTypes = {
  currentGraphCoords: PropTypes.array.isRequired,
  setMap: PropTypes.func.isRequired,
  modisData: PropTypes.object.isRequired,
  setModisData: PropTypes.func.isRequired,
  modisDataConfig: PropTypes.object.isRequired,
  setModisDataConfig: PropTypes.func.isRequired,
};

export const LeafletMap = ({setMap, animating, animationTime}) => {
  const [currentGraphCoords, setCurrentGraphCoords] = useStateWithLabel([0, 0], 'currentGraphCoords');
  const [mapHeight, setMapHeight] = useStateWithLabel('90vh', 'mapHeight');

  const [modisData, setModisData] = useStateWithLabel({
    labels: ['1', '2', '3', '4', '5', '6'],
    coordinates: [0, 0],
    datasets: [
      {
        label: 'NDVI',
        data: [],
        fill: false,
        backgroundColor: 'rgb(3, 237, 96)',
        borderColor: 'rgba(3, 237, 96, 0.8)',
        xAxisID: 'xAxis'
      }
    ]
  }, 'MODIS CHART DATA');

  const [modisDataConfig, setModisDataConfig] = useStateWithLabel({
    maintainAspectRatio: false,
    plugins: {
      annotation: {
        annotations: [{
          drawTime: 'afterDatasetsDraw',
          type: 'line',
          mode: 'vertical',
          scaleID: 'xAxis',
          value: 0,
          borderWidth: 5,
          borderColor: 'white',
          label: {
            content: 'TODAY',
            enabled: true,
            position: 'top'
          }
        }]
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            steps: 10,
            stepValue: 5,
            max: 100,
            fontColor: 'white'
          }
        }
      ]
    }
  }, 'MODIS CHART CONFIG');

  return (
        <div>
            <Grid item xs={12}>
                <MapContainer
                    className='mapContainer'
                    loadingControl={true}
                    whenCreated={(map) => {
                      map.on('click', (e) => {
                        const { lat, lng } = e.latlng;
                        setCurrentGraphCoords([lat, lng]);
                        // getChartData(lng, lat)
                      });
                    }}
                    center={center}
                    zoom={zoom}
                    style={{
                      height: mapHeight,
                      display: 'flex'
                    }}
                >
                    <MapController currentGraphCoords={currentGraphCoords} setMap={setMap} modisData={modisData}
                                   setModisData={setModisData} modisDataConfig={modisDataConfig}
                                   setModisDataConfig={setModisDataConfig} />
                    <AnimationController animating={animating} animationTime={animationTime} />
                </MapContainer>
            </Grid>
            <NDVIMultiYearGraph modisData={modisData} modisDataConfig={modisDataConfig} />
        </div>
  );
};

LeafletMap.propTypes = {
  setMap: PropTypes.func.isRequired,
  animating: PropTypes.bool.isRequired,
  animationTime: PropTypes.number.isRequired
};
