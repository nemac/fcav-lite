import React, { useState, useEffect, useDebugValue, useRef, useContext } from "react"
import L from "leaflet"
import config from "./config"
import {
  MapContainer,
  useMap
} from "react-leaflet"
import { Grid } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import nemacLogoWhite from "./nemac_logo_white.png"
import nemacLogoBlack from "./nemac_logo_black.png"
import forwarn2Legend from "./forwarn2-legend.png"
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import {isLeapYear, toDate, toWMSDate, getFWDatesForYear, getNextFWDate} from "./datemanagement"
import { CustomThemeContext } from './CustomThemeProvider'
import "leaflet-loading"
import 'leaflet-loading/src/Control.Loading.css'
import {geosearch} from 'esri-leaflet-geocoder'
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'

// Map Defaults
const center = [35, -82]
const zoom = 13

function useStateWithLabel(initialValue, name) {
  const [value, setValue] = useState(initialValue)
  useDebugValue(`${name}: ${value}`)
  return [value, setValue]
}

const getLayerRangeByDate = (startDate, endDate, wmsLayers) => {
  let startIndex = -1
  let endIndex = -1
  wmsLayers.forEach((layer, index) => {
    if (layer.date >= startDate && startIndex === -1) {
      startIndex = index
    }
    if(layer.date >= endDate && endIndex === -1){
      endIndex = index-1
    }
  })
  if (endIndex === -1) {
    endIndex = wmsLayers.length - 1
  }
  const newRange = wmsLayers.slice(startIndex, endIndex+1)
  return newRange
}


export function App() {
  const {setTheme } = useContext(CustomThemeContext)
  const [darkMode, setDarkMode] = useStateWithLabel(true);
  // Initialize Material UI styles
  const useStyles = makeStyles({
    root: {
      width: 300,
    },
  })
  const classes = useStyles()



  const [animating, setAnimating] = useStateWithLabel(false)

  // Date State
  const [startDate, setStartDate] = useStateWithLabel(new Date("2020-01-16"), "startDate")
  const [endDate, setEndDate] = useStateWithLabel(new Date("2021-02-17"), "endDate")
  const [dateRangeIndex, setDateRangeIndex] = useStateWithLabel(0, "dateRangeIndex")

  // Basemaps
  const basemaps = config.baseLayers
  const [basemapIndex, setBasemapIndex] = useStateWithLabel(2, "basemapIndex")
  const basemapRef = useRef()

  // Layers
  const [productIndex, setProductIndex] = useStateWithLabel(0, "productIndex")
  const productsList = config.productsList;
  /*const [wmsLayers, setWmsLayers] = useStateWithLabel(config.juliandates.map(jd => {
    const date = toDate(parseInt(jd) + 7, 2020) // 7 day offset
    const wmsdate = toWMSDate(date)
    const o = config.wms_template(wmsdate, productIndex)
    o.leafletLayer = L.tileLayer.wms(o.baseUrl, o.options)
    o.date = date
    return o
  }), "wmsLayers")*/

  const [wmsLayers, setWmsLayers] = useStateWithLabel(getWMSLayersYearRange(startDate, endDate), "fullWMSLayers")
  //const [tempDate, setTempDate] = useStateWithLabel(new Date("2020-01-16"), "tempDate")

  const [layerRange, setLayerRange] = useStateWithLabel(
    getLayerRangeByDate(startDate, endDate, wmsLayers), "layerRange"
  )

  //theme switching
  const themesList = config.themesList;
  const [themeIndex, setThemeIndex] = useStateWithLabel(0, "themeIndex")

  const [mapControls, setMapControls] = useStateWithLabel([], "mapControls")
  const [isInitialRender, setIsInitialRender] = useStateWithLabel(true, "initialrender");


  // State change and event handlers

  const onStartDateChange = (date) => {
    let day = date.getDate().toString()
    if(day.length < 2){
      day = "0" + day
    }
    let month = (date.getMonth()+1).toString()
    if(month.length < 2) {
      month = "0" + month
    }
    setStartDate(date)
    let newLayerRange = getWMSLayersYearRange(date, endDate)
    setWmsLayers(newLayerRange)
    setDateRangeIndex(0)
  }

  const onEndDateChange = (date) => {
    let day = date.getDate().toString()
    if (day.length < 2) {
      day = "0" + day
    }
    let month = (date.getMonth()+1).toString()
    if (month.length < 2) {
      month = "0" + month
    }
    setEndDate(date) //set end date state
    let newLayerRange = getWMSLayersYearRange(startDate, date)
    setWmsLayers(newLayerRange);
    setDateRangeIndex(0)
  }

  const onBasemapChange = (event) => {
    let index = event.target.value
    setBasemapIndex(index)
  }
  const onThemeChange = (event) => {
    let index = event.target.value
    setThemeIndex(index)
  }

  const onProductChange = (event) => {
    let index = event.target.value
    let newWMS = config.juliandates.map(jd => {
      const date = toDate(parseInt(jd) + 7, 2020) // 7 day offset
      const wmsdate = toWMSDate(date)
      const o = config.wms_template(wmsdate, index)
      o.leafletLayer = L.tileLayer.wms(o.baseUrl, o.options)
      o.date = date
      return o
    });
    setWmsLayers(newWMS);
          setProductIndex(index);
          let newLayerRange = getLayerRangeByDate(startDate, endDate, newWMS)
          setLayerRange(newLayerRange)
  }

  const onSliderChange = (e, v) => {
    console.log('slider change')
    console.log('slider value is ' + String(v))
    if (v !== dateRangeIndex) { setDateRangeIndex(v) }
  }

  const onAnimate = (e, v) => {
    console.log('animate button clicked')
    setAnimating(!animating)
  }

  function getWMSLayersYearRange(startDate, endDate){
    let wmsLayers = [];
    let tempDate = getNextFWDate(startDate);
    console.log("tempdate: " + tempDate);
    while(tempDate <= endDate){
      const wmsdate = toWMSDate(tempDate);
      const o = config.wms_template(wmsdate, productIndex)
      o.leafletLayer = L.tileLayer.wms(o.baseUrl, o.options)
      o.date = tempDate
      wmsLayers.push(o);
      tempDate.setDate(tempDate.getDate() + 1);
      tempDate = getNextFWDate(tempDate);
    }
    return wmsLayers;
  }

  function MapController () {
  const search = geosearch()
    const map = useMap()
    // Clear map utility
    const clearMap = () => {
      console.log("Clearing map...")
      //basemapRef.current.bringToBack()
      map.eachLayer((layer) => {
        if (basemapRef.current === layer) {
          console.log("Skipping basemap layer...")
          console.log(basemapRef.current)
          return
        }
        console.log("Removing layer: ")
        console.log(layer)
        //map.removeLayer(layer)
      })
    }

    // Hook: basemap change
    useEffect(() => {
      console.log('basemap change')
      let oldBasemap = basemapRef.current
      let newBasemap = basemaps[basemapIndex]
      let leafletLayer = new L.tileLayer(newBasemap.url, {
        opacity: 0,
        attribution: newBasemap.attribution
      })
      map.addLayer(leafletLayer)
      leafletLayer.bringToBack()
      leafletLayer.setOpacity(1)
      basemapRef.current = leafletLayer
      //set theme based on basemaps
      //setTheme(newBasemap.theme)
      /*if(newBasemap.theme === 'dark'){
        setDarkMode(true);
      }
      else{
        setDarkMode(false);
      }*/
      return () => {
        map.removeLayer(basemapRef.current)
      }
    }, [basemapIndex])

    // Hook: product change
    useEffect(() => {
      //console.log(newWMS);
      clearMap()
    }, [productIndex])

    // Hook: Theme change
    useEffect(() => {
      //console.log(newWMS);
      let chosenTheme = themesList[themeIndex]
      chosenTheme = chosenTheme.toLowerCase()
      console.log("chosen theme: " + chosenTheme)
      setTheme(chosenTheme)
      if(chosenTheme === 'dark'){
        setDarkMode(true);
      }
      else{
        setDarkMode(false);
      }
    }, [themeIndex])

    // Hook: date range index change
    useEffect(() => {
      clearMap()
      const layer = layerRange[dateRangeIndex]
      console.log("new layer: ")
      console.log(layer)
      if (!map.hasLayer(layer.leafletLayer)) {
        console.log("adding layer to the map...")
        map.addLayer(layer.leafletLayer)
      }
      layer.leafletLayer.bringToFront()
      layer.leafletLayer.setOpacity(1)
      if (animating) {
        const newIndex = (dateRangeIndex+1) === layerRange.length ? 0 : dateRangeIndex+1
        const timer = setTimeout(() => {
          setDateRangeIndex(newIndex)
        }, 10000)
        return () => { if (timer) clearTimeout(timer) }
      }
    }, [dateRangeIndex])

    // Hook: Animation button clicked - add all layers to the map
    useEffect(() => {
      if (!animating) { return }
      layerRange.forEach(layer => {
        layer.leafletLayer.setOpacity(0)
        if (!map.hasLayer(layer.leafletLayer)) {
          map.addLayer(layer.leafletLayer)
        }
      })
    }, [animating])

    if(isInitialRender){ //check if initilization is complete so we don't reinitilize components
      search.addTo(map);
      const legend = L.control({ position: "bottomright"});
      legend.onAdd = () => {
          const div = L.DomUtil.create("div", "info legend");
          div.innerHTML =
            "<img src=" + forwarn2Legend + "" +" width=\"128.5px\" height=\"210.5px\">";
          return div;
        };
    }


    if(isInitialRender){
      setIsInitialRender(false);
    }

    return null

  }

  function AnimateBtn (props) {

    return (
      <Button
        letiant="contained"
        color="secondary"
        className={classes.button}
        startIcon={ animating ? <StopIcon/> : <PlayArrowIcon />}
        onClick={ () => { setAnimating(!animating) } }
      >{ animating ? "Stop" : "Play" }</Button>
    )

  }

  function DateRangePicker () {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker style={{marginRight: 16 }}
              disableToolbar
              letiant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Start Date"
              value={startDate}
              onChange={onStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <div className={classes.root} style={{marginRight: 16, marginTop: 16 }}>
              <Slider color="secondary"
                defaultValue={dateRangeIndex}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={layerRange.length-1}
                onChangeCommitted={ onSliderChange }
              />
            </div>
            <KeyboardDatePicker style={{marginRight: 16 }}
              disableToolbar
              letiant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="End Date"
              value={endDate}
              onChange={onEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
      </MuiPickersUtilsProvider>
    )
  }


  function BasemapSelect () {

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
  function ThemeSelect () {

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
  function ProductSelect () {

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

  function TopBar () {
    return (
      //<ThemeProvider theme={fcavtheme}>
       <Grid item xs={12}>
        <AppBar
          //id='menu'
          position="static"


          style={{ zIndex: '0', flexWrap: 'flex', flexDirection: 'column'}}
        >
          <Toolbar>
            <img src={ darkMode ? nemacLogoWhite : nemacLogoBlack} width="150" alt="your mom"></img>
            <BasemapSelect/>
            <DateRangePicker/>
            <ProductSelect/>
            <ThemeSelect/>
          </Toolbar>
        </AppBar>
      </Grid>
      //</ThemeProvider>
    )
  }

  // App
  return (
    <Grid container>
      <TopBar/>
      <Grid item xs={12}>
        <MapContainer
          loadingControl={true}
          center={center}
          zoom={zoom}
          style={{ height: "90vh" }}
        >
          <MapController />
        </MapContainer>
      </Grid>
    </Grid>
  )

}
