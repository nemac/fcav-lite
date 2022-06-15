/*
We anticipate rendering the following here:
NavigationBar
LeafletMap
*/
import React, {useDebugValue, useState} from 'react';
import { NavigationBar } from './components/NavigationBar';
import { LeafletMap } from './components/LeafletMap';
import ReactDOM from 'react-dom';
import {makeStyles} from "@material-ui/core/styles";
import config from "./config";
import {getNextFWDate, toWMSDate} from "./datemanagement";
import L from "leaflet";
import { useStateWithLabel, getWMSLayersYearRange } from "./utils";


export default function App() {

    // Initialize Material UI styles
    const useStyles = makeStyles({
        root: {
            width: 300,
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            position: 'absolute',
            color: "white",
            width: '100%',
            height: '45vh',
            background: 'rgb(26, 35, 39)',
            boxShadow: 24,
            padding: 4,
        },
    })

    const classes = useStyles();

    const [graphOn, setGraphOn] = useStateWithLabel(false, "GraphOn");

    const [map, setMap] = useStateWithLabel('', "map");

    const [startDate, setStartDate] = useStateWithLabel(new Date("2020-01-16"), "startDate")
    const [endDate, setEndDate] = useStateWithLabel(new Date("2021-02-17"), "endDate");

    const [dateRangeIndex, setDateRangeIndex] = useStateWithLabel(0, "dateRangeIndex");

    const basemaps = config.baseLayers;
    const [basemapIndex, setBasemapIndex] = useStateWithLabel(2, "basemapIndex");

    const [productIndex, setProductIndex] = useStateWithLabel(0, "productIndex");

    const [wmsLayers, setWmsLayers] = useStateWithLabel(getWMSLayersYearRange(startDate, endDate, productIndex),
        "fullWMSLayers");

    return (
      <div>
          <NavigationBar classes={classes} graphOn={graphOn} setGraphOn={setGraphOn} map={map} startDate={startDate}
                         setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} dateRangeIndex={dateRangeIndex}
                         setDateRangeIndex={setDateRangeIndex} basemaps={basemaps} basemapIndex={basemapIndex}
                         setBasemapIndex={setBasemapIndex} productIndex={productIndex}
                         setProductIndex={setProductIndex} wmsLayers={wmsLayers} setWmsLayers={setWmsLayers} />
          <LeafletMap classes={classes} graphOn={graphOn} setMap={setMap} startDate={startDate} endDate={endDate}
                      dateRangeIndex={dateRangeIndex} setDateRangeIndex={setDateRangeIndex} basemaps={basemaps}
                      basemapIndex={basemapIndex} productIndex={productIndex} wmsLayers={wmsLayers} />
      </div>
  );
}
