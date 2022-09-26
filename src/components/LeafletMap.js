/* This component will be for the leaflet map and all of its logic
We anticipate calling NDVIMultiYearGraph from this component
MapLegend.js will be in here too
*/

import React, {
  useDebugValue, useEffect, useRef, useState
} from 'react';
import { Grid } from '@material-ui/core';
import { MapContainer, useMap } from 'react-leaflet';
import 'leaflet-loading';
import 'leaflet-loading/src/Control.Loading.css';
import { geosearch } from 'esri-leaflet-geocoder';
import L from 'leaflet';
import PropTypes from 'prop-types';
import { parse } from 'fast-xml-parser';
import forwarn2Legend from '../forwarn2-legend.png';
import config from '../config';
import { getNextFWDate, toWMSDate } from '../datemanagement';
import { NDVIMultiYearGraph } from './NDVIMultiYearGraph';
import { AnimationController } from './AnimationController';
import { useStateWithLabel, useCompare } from '../utils';

// Map Defaults
const center = [37, -98];
const zoom = 4.5;

const MapController = ({
  graphOn, currentGraphCoords, activeLayerOpacity, setMap, modisData, setModisData, modisDataConfig,
  setModisDataConfig, startDate, endDate, dateRangeIndex, basemaps,
  basemapIndex, productIndex, wmsLayers, animating
}) => {
  const search = geosearch();

  const map = useMap();

  useEffect(() => {
    setMap(map);
  }, []);

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

  // Clear map utility
  const clearMap = () => {
    console.log('Clearing map...');
    // basemapRef.current.bringToBack()
    map.eachLayer((layer) => {
      if (basemapRef.current === layer) {
        //          console.log("Skipping basemap layer...")
        //          console.log(basemapRef.current)
        return;
      }
      console.log('Removing layer: ');
      console.log(layer);
      map.removeLayer(layer);
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
      //
      map.addLayer(leafletLayer);
      leafletLayer.bringToBack();
      leafletLayer.setOpacity(activeLayerOpacity);
      basemapRef.current = leafletLayer;
    }
    if (hasBaseMapChanged && !isInitialRender) {
      return () => {
        // map.removeLayer(basemapRef.current)
      };
    }
  }, [hasBaseMapChanged, basemapIndex]);

  // Hook: product change
  useEffect(() => {
    if (hasProductIndexChanged || isInitialRender) {
      console.log('Product change hook');
      // console.log(newWMS);
      clearMap();
    }
  }, [hasProductIndexChanged, productIndex]);

  // Hook: date range and product change
  useEffect(() => {
    // if animating, we don't want to do this
    if (animating) {
      return;
    }
    
    if (hasDateRangeIndexChanged || isInitialRender || hasProductIndexChanged) {
      //        console.log("date range index hook");
      clearMap();
      const layer = wmsLayers[dateRangeIndex];
      console.log('new layer: ');
      console.log(layer);
      if (!map.hasLayer(layer.leafletLayer)) {
        console.log('adding layer to the map...');
        map.addLayer(layer.leafletLayer);
      }
      layer.leafletLayer.bringToFront();
      layer.leafletLayer.setOpacity(activeLayerOpacity);
      if (graphOn) {
        // chartLineValue();
        const newLineValue = { ...modisDataConfig };
        newLineValue.plugins.annotation.annotations[0].value = getChartLineValue();
        newLineValue.plugins.annotation.annotations[0].label.content =
        modisData.labels[dateRangeIndex];
        setModisDataConfig(newLineValue);
      }
    }
  }, [hasDateRangeIndexChanged, dateRangeIndex, productIndex]);

  // Hook: Animation button clicked - add all layers to the map
  // useEffect(() => {
  //   if (!animating) { return; }
  //   wmsLayers.forEach((layer) => {
  //     layer.leafletLayer.setOpacity(0);
  //     if (!map.hasLayer(layer.leafletLayer)) {
  //       map.addLayer(layer.leafletLayer);
  //     }
  //   });
  // }, [animating]);
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
  // hook: active layer opacity changed
  useEffect(() => {
    for (const layer of wmsLayers) {
      if (layer.leafletLayer.opacity !== 0) {
        layer.leafletLayer.setOpacity(activeLayerOpacity);
      }
    }
  }, [activeLayerOpacity]);

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
  graphOn: PropTypes.bool.isRequired,
  currentGraphCoords: PropTypes.array.isRequired,
  setMap: PropTypes.func.isRequired,
  modisData: PropTypes.object.isRequired,
  setModisData: PropTypes.func.isRequired,
  modisDataConfig: PropTypes.object.isRequired,
  setModisDataConfig: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  dateRangeIndex: PropTypes.number.isRequired,
  basemaps: PropTypes.array.isRequired,
  basemapIndex: PropTypes.number.isRequired,
  productIndex: PropTypes.number.isRequired,
  wmsLayers: PropTypes.array.isRequired,
  animating: PropTypes.bool.isRequired
};

export const LeafletMap = ({
  graphOn, setMap, startDate, endDate, dateRangeIndex, setDateRangeIndex,
  basemaps, basemapIndex, productIndex, wmsLayers, animating, animationTime
}) => {
  const [currentGraphCoords, setCurrentGraphCoords] = useStateWithLabel([0, 0], 'currentGraphCoords');
  const [mapHeight, setMapHeight] = useStateWithLabel('90vh', 'mapHeight');
  const [activeLayerOpacity, setActiveLayerOpacity] = useStateWithLabel(1, 'activeLayerOpacity');

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
                    // loadingControl={true}
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
                    <MapController graphOn={graphOn} currentGraphCoords={currentGraphCoords} 
                                   activeLayerOpacity={activeLayerOpacity} setMap={setMap} modisData={modisData}
                                   setModisData={setModisData} modisDataConfig={modisDataConfig}
                                   setModisDataConfig={setModisDataConfig} startDate={startDate}
                                   endDate={endDate} dateRangeIndex={dateRangeIndex}
                                   setDateRangeIndex={setDateRangeIndex} basemaps={basemaps}
                                   basemapIndex={basemapIndex} productIndex={productIndex}
                                   wmsLayers={wmsLayers} animating={animating} />
                    <AnimationController layers={wmsLayers} animating={animating} dateRangeIndex={dateRangeIndex} 
                                         setDateRangeIndex={setDateRangeIndex} animationTime={animationTime}
                                         activeLayerOpacity={activeLayerOpacity} setActiveLayerOpacity={setActiveLayerOpacity} />
                </MapContainer>
            </Grid>
            <NDVIMultiYearGraph graphOn={graphOn} modisData={modisData}
                                modisDataConfig={modisDataConfig} />
        </div>
  );
};

LeafletMap.propTypes = {
  graphOn: PropTypes.bool.isRequired,
  setMap: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  dateRangeIndex: PropTypes.number.isRequired,
  setDateRangeIndex: PropTypes.func.isRequired,
  basemaps: PropTypes.array.isRequired,
  basemapIndex: PropTypes.number.isRequired,
  productIndex: PropTypes.number.isRequired,
  wmsLayers: PropTypes.array.isRequired,
  animating: PropTypes.bool.isRequired,
  animationTime: PropTypes.number.isRequired
};
