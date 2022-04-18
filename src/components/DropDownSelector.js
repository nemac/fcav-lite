/* This component will be for the following:
Basemap dropdown
Product dropdown
Theme dropdown
*/
import React, {useContext, useDebugValue, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import config from "../config";
import {CustomThemeContext} from "../CustomThemeProvider";
import {getNextFWDate, toWMSDate} from "../datemanagement";
import L from "leaflet";

function useStateWithLabel(initialValue, name) {
    const [value, setValue] = useState(initialValue)
    useDebugValue(`${name}: ${value}`)
    return [value, setValue]
}

function getWMSLayersYearRange(startDate, endDate, productIdx){
    let wmsLayers = [];
    let tempDate = getNextFWDate(startDate);
//    console.log("tempdate: " + tempDate);
    while(tempDate <= endDate){
        const wmsdate = toWMSDate(tempDate);
        const o = config.wms_template(wmsdate, productIdx)
        o.leafletLayer = L.tileLayer.wms(o.baseUrl, o.options)
        o.date = tempDate
        wmsLayers.push(o);
        tempDate.setDate(tempDate.getDate() + 1);
        tempDate = getNextFWDate(tempDate);
    }
    return wmsLayers;
}

export function BasemapSelect () {

    const [dateRangeIndex, setDateRangeIndex] = useStateWithLabel(0, "dateRangeIndex")

    //theme switching
    const themesList = config.themesList;
    const [themeIndex, setThemeIndex] = useStateWithLabel(0, "themeIndex")
    const {setTheme } = useContext(CustomThemeContext)
    const [darkMode, setDarkMode] = useStateWithLabel(true);

    // Basemaps
    const basemaps = config.baseLayers
    const [basemapIndex, setBasemapIndex] = useStateWithLabel(2, "basemapIndex");
    const productsList = config.productsList;

    // Date State
    const [startDate, setStartDate] = useStateWithLabel(new Date("2020-01-16"), "startDate")
    const [endDate, setEndDate] = useStateWithLabel(new Date("2021-02-17"), "endDate")

    // Layers
    const [productIndex, setProductIndex] = useStateWithLabel(0, "productIndex")
    const [wmsLayers, setWmsLayers] = useStateWithLabel(getWMSLayersYearRange(startDate, endDate, productIndex), "fullWMSLayers")

    // State change and event handlers

    const onThemeChange = (event) => {
        let index = event.target.value
        setThemeIndex(index)
    }

    const onBasemapChange = (event) => {
        let index = event.target.value
        setBasemapIndex(index)
    }

    const onProductChange = (event) => {
        let index = event.target.value
        setProductIndex(index);
        let newProduct = getWMSLayersYearRange(startDate, endDate, index);
        setWmsLayers(newProduct);
        setDateRangeIndex(0);
    }

  return (
    <FormControl letiant="outlined" style={{marginRight: 16 }}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        Basemap
      </InputLabel>
      <Select
        labelId="fcav-basemap-select-label"
        id="fcav-basemap-select"
        value={basemapIndex}
        onChange={onBasemapChange}
        label="Product"
      >
      {
        basemaps.map((basemap, index) => (
        <MenuItem key={index} value={index}>{basemap.name}</MenuItem>
      ))
    }
    </Select>
    </FormControl>
  )
}

export function ThemeSelect () {

    const [dateRangeIndex, setDateRangeIndex] = useStateWithLabel(0, "dateRangeIndex")

    //theme switching
    const themesList = config.themesList;
    const [themeIndex, setThemeIndex] = useStateWithLabel(0, "themeIndex")
    const {setTheme } = useContext(CustomThemeContext)
    const [darkMode, setDarkMode] = useStateWithLabel(true);

    // Basemaps
    const basemaps = config.baseLayers
    const [basemapIndex, setBasemapIndex] = useStateWithLabel(2, "basemapIndex");
    const productsList = config.productsList;

    // Date State
    const [startDate, setStartDate] = useStateWithLabel(new Date("2020-01-16"), "startDate")
    const [endDate, setEndDate] = useStateWithLabel(new Date("2021-02-17"), "endDate")

    // Layers
    const [productIndex, setProductIndex] = useStateWithLabel(0, "productIndex")
    const [wmsLayers, setWmsLayers] = useStateWithLabel(getWMSLayersYearRange(startDate, endDate, productIndex), "fullWMSLayers")

    // State change and event handlers

    const onThemeChange = (event) => {
        let index = event.target.value
        setThemeIndex(index)
    }

    const onBasemapChange = (event) => {
        let index = event.target.value
        setBasemapIndex(index)
    }

    const onProductChange = (event) => {
        let index = event.target.value
        setProductIndex(index);
        let newProduct = getWMSLayersYearRange(startDate, endDate, index);
        setWmsLayers(newProduct);
        setDateRangeIndex(0);
    }

  // Hook: Theme change
  useEffect(() => {
    //console.log(newWMS);
    let chosenTheme = themesList[themeIndex] // TODO: Find this variable in fcav.js
    chosenTheme = chosenTheme.toLowerCase()
//    console.log("chosen theme: " + chosenTheme)
    setTheme(chosenTheme)
    if(chosenTheme === 'dark'){
      setDarkMode(true);
    }
    else{
      setDarkMode(false);
    }
  }, [themeIndex])
  return (
    <FormControl letiant="outlined" style={{marginRight: 16 }}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
      Theme
      </InputLabel>
      <Select
        labelId="fcav-theme-select-label"
        id="fcav-theme-select"
        value={themeIndex}
        onChange={onThemeChange}
        label="Theme"
      >
      {
        themesList.map((theme, index) => (
          <MenuItem key={index} value={index}>{theme}</MenuItem>
        ))
      }
      </Select>
    </FormControl>
  )
}

export function ProductSelect () {

    const [dateRangeIndex, setDateRangeIndex] = useStateWithLabel(0, "dateRangeIndex")

    //theme switching
    const themesList = config.themesList;
    const [themeIndex, setThemeIndex] = useStateWithLabel(0, "themeIndex")
    const {setTheme } = useContext(CustomThemeContext)
    const [darkMode, setDarkMode] = useStateWithLabel(true);

    // Basemaps
    const basemaps = config.baseLayers
    const [basemapIndex, setBasemapIndex] = useStateWithLabel(2, "basemapIndex");
    const productsList = config.productsList;

    // Date State
    const [startDate, setStartDate] = useStateWithLabel(new Date("2020-01-16"), "startDate")
    const [endDate, setEndDate] = useStateWithLabel(new Date("2021-02-17"), "endDate")

    // Layers
    const [productIndex, setProductIndex] = useStateWithLabel(0, "productIndex")
    const [wmsLayers, setWmsLayers] = useStateWithLabel(getWMSLayersYearRange(startDate, endDate, productIndex), "fullWMSLayers")

    // State change and event handlers

    const onThemeChange = (event) => {
        let index = event.target.value
        setThemeIndex(index)
    }

    const onBasemapChange = (event) => {
        let index = event.target.value
        setBasemapIndex(index)
    }

    const onProductChange = (event) => {
        let index = event.target.value
        setProductIndex(index);
        let newProduct = getWMSLayersYearRange(startDate, endDate, index);
        setWmsLayers(newProduct);
        setDateRangeIndex(0);
    }

  return (
    <FormControl letiant="outlined" style={{marginRight: 16 }}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        Product
      </InputLabel>
      <Select
        labelId="fcav-product-select-label"
        id="fcav-product-select"
        value={productIndex}
        onChange={onProductChange}
        label="Product"
      >
        {
          productsList.map((product, index) => (
            <MenuItem key={index} value={index}>{product}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}