// This component will be for the start and end date
import React, {
  useDebugValue, useEffect, useRef, useState
} from 'react';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Slider from '@material-ui/core/Slider';
import DateFnsUtils from '@date-io/date-fns';
import propTypes from 'eslint-plugin-react/lib/rules/prop-types';
import L from 'leaflet';
import { makeStyles } from '@material-ui/core/styles';
import { getNextFWDate, toWMSDate } from '../datemanagement';
import config from '../config';
import { useStateWithLabel, useCompare, getWMSLayersYearRange } from '../utils';

export const DateRangePicker = ({
  startDate, setStartDate, endDate, setEndDate, dateRangeIndex,
  setDateRangeIndex, productIndex, wmsLayers, setWmsLayers
}) => {
  const useStyles = makeStyles({
    root: {
      width: 300
    }
  });

  const classes = useStyles();

  // Date State
  const [currentDate, setCurrentDate] = useStateWithLabel(new Date('2020-01-16'), 'currentDate');
  const hasDateRangeIndexChanged = useCompare(dateRangeIndex);
  const hasStartDateChanged = useCompare(startDate);
  const hasEndDateChanged = useCompare(endDate);

  const onStartDateChange = (date) => {
    let day = date.getDate().toString();
    if (day.length < 2) {
      day = `0${day}`;
    }
    let month = (date.getMonth() + 1).toString();
    if (month.length < 2) {
      month = `0${month}`;
    }

    setStartDate(date);
    const newLayerRange = getWMSLayersYearRange(date, endDate, productIndex);
    setWmsLayers(newLayerRange);
    setDateRangeIndex(0);
    // getChartData(modisData.coordinates[0], modisData.coordinates[1]);
  };

  const onSliderChange = (e, v) => {
    //    console.log('slider change')
    //    console.log('slider value is ' + String(v))
    if (v !== dateRangeIndex) {
      setDateRangeIndex(v);
      setCurrentDate(wmsLayers[v].date);
    }
  };

  const onEndDateChange = (date) => {
    let day = date.getDate().toString();
    if (day.length < 2) {
      day = `0${day}`;
    }
    let month = (date.getMonth() + 1).toString();
    if (month.length < 2) {
      month = `0${month}`;
    }

    setEndDate(date); // set end date state
    const newLayerRange = getWMSLayersYearRange(startDate, date, productIndex);
    setWmsLayers(newLayerRange);
    setDateRangeIndex(0);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker style={{ marginRight: 16 }}
      disableToolbar
      letiant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      id="date-picker-inline"
      label="Start Date"
      maxDate={endDate}
      value={startDate}
      onChange={onStartDateChange}
      KeyboardButtonProps={{
        'aria-label': 'change date'
      }}
    />
    <div className={classes.root} style={{ marginRight: 16, marginTop: 16 }}>
      <Slider color="secondary"
        defaultValue={dateRangeIndex}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={wmsLayers.length - 1}
        onChangeCommitted={ onSliderChange }
      />
    </div>
    <KeyboardDatePicker style={{ marginRight: 16 }}
      disableToolbar
      letiant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      id="date-picker-inline"
      label="End Date"
      minDate={startDate}
      value={endDate}
      onChange={onEndDateChange}
      KeyboardButtonProps={{
        'aria-label': 'change date'
      }}
    />
    </MuiPickersUtilsProvider>
  );
};

DateRangePicker.propTypes = {
  startDate: propTypes.instanceOf(Date).isRequired,
  setStartDate: propTypes.function.isRequired,
  endDate: propTypes.instanceOf(Date).isRequired,
  setEndDate: propTypes.function.isRequired,
  dateRangeIndex: propTypes.number.isRequired,
  setDateRangeIndex: propTypes.function.isRequired,
  productIndex: propTypes.number.isRequired,
  wmsLayers: propTypes.array.isRequired,
  setWmsLayers: propTypes.function.isRequired
};
