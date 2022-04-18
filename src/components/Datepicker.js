// This component will be for the start and end date
import React, {useDebugValue, useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Slider from '@material-ui/core/Slider';
import DateFnsUtils from '@date-io/date-fns';
import {getNextFWDate, toWMSDate} from "../datemanagement";
import config from "../config";
import L from "leaflet";
import {makeStyles} from "@material-ui/core/styles";

function useStateWithLabel(initialValue, name) {
    const [value, setValue] = useState(initialValue)
    useDebugValue(`${name}: ${value}`)
    return [value, setValue]
}

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

export function DateRangePicker () {

    // Date State
    const [startDate, setStartDate] = useStateWithLabel(new Date("2020-01-16"), "startDate")
    const [endDate, setEndDate] = useStateWithLabel(new Date("2021-02-17"), "endDate")
    const [dateRangeIndex, setDateRangeIndex] = useStateWithLabel(0, "dateRangeIndex")
    const [currentDate, setCurrentDate] = useStateWithLabel(new Date("2020-01-16"), "currentDate");
    const hasDateRangeIndexChanged = useCompare(dateRangeIndex);
    const hasStartDateChanged = useCompare(startDate);
    const hasEndDateChanged = useCompare(endDate);

    const getWMSLayersYearRange = (startDate, endDate, productIdx) => {
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

    // Basemap
    const [productIndex, setProductIndex] = useStateWithLabel(0, "productIndex")

    // Layers
    const [wmsLayers, setWmsLayers] = useStateWithLabel(getWMSLayersYearRange(startDate, endDate, productIndex), "fullWMSLayers")

    const classes = useStyles();

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

    const onSliderChange = (e, v) => {
//    console.log('slider change')
//    console.log('slider value is ' + String(v))
        if (v !== dateRangeIndex) {
            setDateRangeIndex(v);
            setCurrentDate(wmsLayers[v].date);
        }
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