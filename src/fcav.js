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
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import AssessmentIcon from '@material-ui/icons/Assessment';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import {isLeapYear, toDate, toWMSDate, getFWDatesForYear, getNextFWDate} from "./datemanagement"
import { CustomThemeContext } from './CustomThemeProvider'
import "leaflet-loading"
import 'leaflet-loading/src/Control.Loading.css'
import {geosearch} from 'esri-leaflet-geocoder'
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'
import {Line} from 'react-chartjs-2'
import { parse } from 'fast-xml-parser';
import { Chart } from 'chart.js';
 import annotationPlugin from 'chartjs-plugin-annotation'
Chart.register(annotationPlugin);
import { NavigationBar } from './components/NavigationBar'

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


export function App(props) {
  // Desired hook
  function useCompare (val) {
    const prevVal = usePrevious(val)
    return prevVal !== val
  }

  // Helper hook
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }


  const {setTheme } = useContext(CustomThemeContext)
  const [darkMode, setDarkMode] = useStateWithLabel(true);
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
  const classes = useStyles()



  const [animating, setAnimating] = useStateWithLabel(false)
  const [graphOn, setGraphOn] = useStateWithLabel(false, "GraphOn")
  const [currentGraphCoords, setCurrentGraphCoords] = useStateWithLabel([0,0], "currentGraphCoords")
  const hasGraphCoordsChanged = useCompare(currentGraphCoords);
  const [mapHeight, setMapHeight] = useStateWithLabel("90vh", "mapHeight");
  const [map, setMap] = useStateWithLabel('', "map");
  const handleGraphOpen = () => {
    //setModisData(getChartData(-78.65678578328217,35.45115625827913));
    //console.log(fetchChartData(-78.65678578328217,35.45115625827913));
    setGraphOn(!graphOn);
    //if(graphOn){
      const mapContainer = document.querySelector(".mapContainer");
      if(!graphOn){
        mapContainer.style.setProperty("height", "45vh")
      }
      else{
        mapContainer.style.setProperty("height", "90vh")
      }
              map.invalidateSize()
    //}
  }
  const updateGraphDataOnClick = () => {
    var lat = map.getCenter().lat;
    var lng = map.getCenter().lng;
    console.log(lat, lng);
    setCurrentGraphCoords([lat,lng]);
    if(map!=null){
      getChartData(lng,lat);
    }
  }
  const [modisData, setModisData] = useStateWithLabel({
    labels: ['1', '2', '3', '4', '5', '6'],
    coordinates: [0,0],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        fill: false,
        backgroundColor: 'rgb(3, 237, 96)',
        borderColor: 'rgba(3, 237, 96, 0.8)',
        xAxisID:'xAxis',
      },
    ],
  }, "MODIS CHART DATA");

  const [modisDataConfig, setModisDataConfig] = useStateWithLabel({
    maintainAspectRatio: false,
    plugins: {
            annotation: {
                annotations: [{
                  drawTime: "afterDatasetsDraw",
            type: "line",
            mode: "vertical",
            scaleID: "xAxis",
            value: 0,
            borderWidth: 5,
            borderColor: "white",
            label: {
              content: "TODAY",
              enabled: true,
              position: "top"
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
            fontColor: "white",
          },
        },
      ],
    },
  }, "MODIS CHART CONFIG");

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Date State
  const [startDate, setStartDate] = useStateWithLabel(new Date("2020-01-16"), "startDate")
  const [endDate, setEndDate] = useStateWithLabel(new Date("2021-02-17"), "endDate")
  const [dateRangeIndex, setDateRangeIndex] = useStateWithLabel(0, "dateRangeIndex")
  const [currentDate, setCurrentDate] = useStateWithLabel(new Date("2020-01-16"), "currentDate");
  const hasDateRangeIndexChanged = useCompare(dateRangeIndex);
  const hasStartDateChanged = useCompare(startDate);
  const hasEndDateChanged = useCompare(endDate);

  // Basemaps
  const basemaps = config.baseLayers
  const [basemapIndex, setBasemapIndex] = useStateWithLabel(2, "basemapIndex")
  const basemapRef = useRef()
  const hasBaseMapChanged = useCompare(basemapIndex);
  // Layers
  const [productIndex, setProductIndex] = useStateWithLabel(0, "productIndex")
  const hasProductIndexChanged = useCompare(productIndex);
  const productsList = config.productsList;


  const [wmsLayers, setWmsLayers] = useStateWithLabel(getWMSLayersYearRange(startDate, endDate, productIndex), "fullWMSLayers")


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
    let newLayerRange = getWMSLayersYearRange(date, endDate, productIndex)
    setWmsLayers(newLayerRange)
    setDateRangeIndex(0)
    //getChartData(modisData.coordinates[0], modisData.coordinates[1]);
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
    let newLayerRange = getWMSLayersYearRange(startDate, date, productIndex)
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
    setProductIndex(index);
    let newProduct = getWMSLayersYearRange(startDate, endDate, index);
    setWmsLayers(newProduct);
    setDateRangeIndex(0);
  }

  const onSliderChange = (e, v) => {
//    console.log('slider change')
//    console.log('slider value is ' + String(v))
    if (v !== dateRangeIndex) {
       setDateRangeIndex(v);
       setCurrentDate(wmsLayers[v].date);
     }
  }

  const onAnimate = (e, v) => {
    console.log('animate button clicked')
    setAnimating(!animating)
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
  async function getChartData(lat, long){
    let result = fetchChartData(lat, long);
    result.then(function(response){
      if(response.mugl!=null){
        console.log("data fetch success");
        console.log(response);
        let parsedData = parseValuesToInts(response.mugl.data.values);
        let xAxis = parseDatesToString(response.mugl.data.values);
        let newModisData = Object.assign({}, modisData);
        newModisData.labels = xAxis;
        newModisData.coordinates = [lat,long];
        newModisData.datasets[0].label = response.mugl.verticalaxis.title;
        newModisData.datasets[0].data = parsedData;
        setModisData(newModisData);
      }
      else{
        console.log("invalid coordinates selected, do nothing")
      }
    })
  }
  function fetchChartData(lat, long){
    const baseurl = 'https://fcav-ndvi-dev.nemac.org/tsmugl_product.cgi?args=CONUS_NDVI,' + lat + ',' + long;
    return fetch(baseurl).then((response) => response.text())
    .then((textResponse) =>
    parse(textResponse))
    .catch(function(error){
      console.log("invalid coords")
    })
  }
  function parseValuesToInts(data){
    var dataArr = data.split("\n");
    for(let i = 0; i < dataArr.length; i++){
      //let str = String(data[i]);
      let dataSTR = dataArr[i];
      dataSTR = dataSTR.substr(9,11)
      dataArr[i] = parseInt(dataSTR);
      if(dataArr[i]< 0){
        dataArr[i] = 0;
      }
    }
    return dataArr;
  }
  function parseDatesToString(data){
    var dateArr = data.split("\n");
    for(let i = 0; i < dateArr.length; i++){
      let dateSTR = dateArr[i];
      dateSTR = dateSTR.substr(0, 8);
      let year = dateSTR.substr(0,4);
      let month = dateSTR.substr(4, 2);
      let day = dateSTR.substr(6, 2);
      //console.log(year + "/" + month + "/" + day);
      dateSTR = month + "/" + day + "/" + year;
      dateArr[i] = dateSTR;
    }
    //trim array to range
    let startIndex = 0;
    let endIndex = 0;
    let dateObjArr = [dateArr.length];
    for(let i = 0; i < dateArr.length; i++){
      let dateSTR = dateArr[i];
      let month = dateSTR.substr(0,2);
      let day = dateSTR.substr(3, 2);
      let year = dateSTR.substr(6, 4);
      let dateObj = new Date(parseInt(year), parseInt(month)-1, parseInt(day));
      dateObjArr[i] = dateObj;
      //console.log(dateObj);
    }
    console.log(dateObjArr);
    for(let i = 0; i < dateObjArr.length; i++){
      if(startDate > dateObjArr[i]){
        startIndex = i+1;
      }
    }
    for(let i = dateObjArr.length; i > 0; i--){
      if(endDate < dateObjArr[i]){
        endIndex = i;
      }
    }
    console.log(startIndex + ', ' + endIndex);
    return dateArr.slice(startIndex, endIndex);
  }
  /*function chartLineValue(){
    let chartDate = modisData.labels[dateRangeIndex];
    let wmsDate = wmsLayers[dateRangeIndex].date;
    wmsDate.setDate(wmsDate.getDate() - 1); //account for 1 day offset

    let chartDateSTR = chartDate;
    let month = chartDateSTR.substr(0,2);
    let day = chartDateSTR.substr(3, 2);
    let year = chartDateSTR.substr(6, 4);
    let chartDateObj = new Date(parseInt(year), parseInt(month)-1, parseInt(day));
    let dayDifference = Math.floor((wmsDate - chartDateObj) / (1000*60*60*24))
    console.log("chart date: " + chartDateObj + " wmsDate: " + wmsDate);
    if(dayDifference!=0){
      console.log("difference detected: " + dayDifference);
      let adjustedIndex = dateRangeIndex + 0.5;
      return adjustedIndex;
    }
    else{
      return dateRangeIndex;
    }
  }*/
  function getChartLineValue(){
    /*let chartDate = modisData.labels[dateRangeIndex];
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
    return dateIndex;*/
    let chartDate = modisData.labels[dateRangeIndex];

    var wmsLayerStrings = [wmsLayers.length];
    for(let i = 0; i < wmsLayers.length; i++){
      let wmsLayer = wmsLayers[i].options.layers;

      let wmsLayerYear = wmsLayer.substr(3, 4);
      let wmsLayerMonth = wmsLayer.substr(7, 2);
      let wmsLayerDay = wmsLayer.substr(9, 2);

      let wmsLayerDate = wmsLayerMonth + "/" + wmsLayerDay + "/" + wmsLayerYear;
      wmsLayerStrings[i] = wmsLayerDate;
    }

    let dateIndex = -1;
    dateIndex = modisData.labels.indexOf(wmsLayerStrings[dateRangeIndex]);
    return dateIndex;
  }

  export function MapController () {
    const search = geosearch()
    const map = useMap()
    setMap(map);
    // Clear map utility
    const clearMap = () => {
      console.log("Clearing map...")
      //basemapRef.current.bringToBack()
      map.eachLayer((layer) => {
        if (basemapRef.current === layer) {
//          console.log("Skipping basemap layer...")
//          console.log(basemapRef.current)
          return
        }
        console.log("Removing layer: ")
        console.log(layer)
        map.removeLayer(layer)
      })
    }
    //console.log(useCompare(basemapIndex));
    // Hook: basemap change
    useEffect(() => {
      if(hasBaseMapChanged || isInitialRender){
        console.log('basemap change hook')
        if(basemapRef.current!=null){
        map.removeLayer(basemapRef.current)
        }
        let oldBasemap = basemapRef.current
        let newBasemap = basemaps[basemapIndex]
        let leafletLayer = new L.tileLayer(newBasemap.url, {
          opacity: 0,
          attribution: newBasemap.attribution
        })
        //
        map.addLayer(leafletLayer)
        leafletLayer.bringToBack()
        leafletLayer.setOpacity(1)
        basemapRef.current = leafletLayer
      }
      if(hasBaseMapChanged && !isInitialRender){
        return () => {
          //map.removeLayer(basemapRef.current)
        }
      }
    }, [hasBaseMapChanged, basemapIndex])

    // Hook: product change
    useEffect(() => {
      if(hasProductIndexChanged || isInitialRender){
        console.log("Product change hook");
        //console.log(newWMS);
        clearMap()
      }
    }, [hasProductIndexChanged, productIndex])

    // Hook: date range index change
    useEffect(() => {
      if(hasDateRangeIndexChanged || isInitialRender || hasProductIndexChanged){
//        console.log("date range index hook");
        clearMap()
        const layer = wmsLayers[dateRangeIndex]
        console.log("new layer: ")
        console.log(layer)
        if (!map.hasLayer(layer.leafletLayer)) {
          console.log("adding layer to the map...")
          map.addLayer(layer.leafletLayer)
        }
        layer.leafletLayer.bringToFront()
        layer.leafletLayer.setOpacity(1)
        if (animating) {
          const newIndex = (dateRangeIndex+1) === wmsLayers.length ? 0 : dateRangeIndex+1
          const timer = setTimeout(() => {
            setDateRangeIndex(newIndex)
          }, 10000)
          return () => { if (timer) clearTimeout(timer) }
        }
        if(graphOn){
          //chartLineValue();
          let newLineValue = Object.assign({}, modisDataConfig);
          newLineValue.plugins.annotation.annotations[0].value = getChartLineValue();
          newLineValue.plugins.annotation.annotations[0].label.content = modisData.labels[dateRangeIndex];
          setModisDataConfig(newLineValue);
        }
      }
    }, [hasDateRangeIndexChanged, dateRangeIndex, productIndex])

    // Hook: Animation button clicked - add all layers to the map
    useEffect(() => {
      if (!animating) { return }
      wmsLayers.forEach(layer => {
        layer.leafletLayer.setOpacity(0)
        if (!map.hasLayer(layer.leafletLayer)) {
          map.addLayer(layer.leafletLayer)
        }
      })
    }, [animating])
    // hook: has date range changed - update graph data range
    useEffect(() => {
      if(hasStartDateChanged || hasEndDateChanged){
        if(graphOn){
          getChartData(currentGraphCoords[1], currentGraphCoords[0])
        }
      }
    }, [hasStartDateChanged, hasEndDateChanged, startDate, endDate])
    //hook: different coordinates selected, update graph data
    useEffect(() => {
      if(hasGraphCoordsChanged){
        if(graphOn){
          getChartData(currentGraphCoords[1], currentGraphCoords[0])
        }
      }
    }, [hasGraphCoordsChanged, currentGraphCoords])
    if(isInitialRender){ //check if initilization is complete so we don't reinitilize components
    search.addTo(map);
    const legend = L.control({ position: "bottomright"});
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      div.innerHTML =
      "<img src=" + forwarn2Legend + "" +" width=\"128.5px\" height=\"210.5px\">";
      return div;
    };
    legend.addTo(map);

    //create loading indicator
    var leafletLoading = L.Control.loading({
      separate: true,
      //position: 'topcenter'
    });
    leafletLoading.addTo(map);
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
      >{ animating ? "Stop" : "Play" }
    </Button>
  )

}
function GraphBtn(props){

  //const handleGraphClose = () => setGraphOn(false);
  //getChartData(-78.65678578328217,35.45115625827913)
  return(
    <Button
      letiant="contained"
      color="secondary"
      className={classes.button}
      startIcon={ graphOn ? <StopIcon/> : <AssessmentIcon />}
      onClick={handleGraphOpen}
      >{ graphOn ? "Hide Graph" : "Show Graph" }
    </Button>
  )
}
function GraphWindow(){
  /*
  <Modal className ={classes.modal}
    open={graphOn}
    onClose={handleGraphOpen}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box className={classes.paper}>
      <Line data={modisData} options={modisDataConfig} />
    </Box>
  </Modal>
  */
  return(
    <Grid item xs={12}>
    { graphOn ? <GraphData /> : null }
    </Grid>
  )
}

const GraphData = () =>(

    <Box className={classes.paper}>
      <Typography variant="h4" align="center"> MODIS NDVI {(modisData.coordinates[0]).toFixed(2) + ', ' + (modisData.coordinates[1]).toFixed(2)} </Typography>
      <div style={{height:"35vh"}}>
      <Line data={modisData} options={modisDataConfig} plugins={[]}/>
      </div>
    </Box>

)

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
        max={wmsLayers.length-1}
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

// App
return (
  <div>
    <Grid container>
      <NavigationBar/>
      <Grid item xs={12}>
        <MapContainer
          className='mapContainer'
          //loadingControl={true}
          whenCreated={(map) => {
              map.on("click", function (e) {
              const { lat, lng } = e.latlng;
              setCurrentGraphCoords([lat,lng]);
              //getChartData(lng, lat)
            });
          }}
          center={center}
          zoom={zoom}
          style={{ height: mapHeight,
          display: "flex"}}
        >
          <MapController />
        </MapContainer>
      </Grid>
              <GraphWindow/>
    </Grid>
  </div>
)

}
