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
import propTypes from 'eslint-plugin-react/lib/rules/prop-types';
import config from "../config";
import {CustomThemeContext} from "../CustomThemeProvider";
import {getNextFWDate, toWMSDate} from "../datemanagement";
import L from "leaflet";
import { useStateWithLabel, getWMSLayersYearRange } from "../utils";

export function BasemapSelect ({ basemaps, basemapIndex, setBasemapIndex }) {

    const onBasemapChange = (event) => {
        let index = event.target.value
        setBasemapIndex(index)
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

BasemapSelect.propTypes = {
  basemaps: propTypes.array.isRequired,
  basemapIndex: propTypes.number.isRequired,
  setBasemapIndex: propTypes.function.isRequired
};

export function ThemeSelect ({ setDarkMode }) {

    //theme switching
    const themesList = config.themesList;
    const [themeIndex, setThemeIndex] = useStateWithLabel(0, "themeIndex");
    const {setTheme } = useContext(CustomThemeContext)

    // State change and event handlers

    const onThemeChange = (event) => {
        let index = event.target.value
        setThemeIndex(index)
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

ThemeSelect.propTypes = {
  setDarkMode: propTypes.function.isRequired
};

export function ProductSelect ({ startDate, endDate, setDateRangeIndex, productIndex, setProductIndex, setWmsLayers }) {

    const productsList = config.productsList;

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

ProductSelect.propTypes = {
  startDate: propTypes.instanceOf(Date).isRequired,
  endDate: propTypes.instanceOf(Date).isRequired,
  setDateRangeIndex: propTypes.function.isRequired,
  productIndex: propTypes.number.isRequired,
  setProductIndex: propTypes.function.isRequired,
  setWmsLayers: propTypes.function.isRequired
};
