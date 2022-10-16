// This component will be for the start and end date
import React, {
  useDebugValue, useEffect, useRef, useState
} from 'react';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Slider from '@material-ui/core/Slider';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { makeStyles } from '@material-ui/core/styles';
import { getNextFWDate, toWMSDate } from '../datemanagement';
import config from '../config';
import { useStateWithLabel, useCompare, getWMSLayersYearRange } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { 
  changeStartDate,
  changeEndDate,
  changeDateRangeIndex,
  selectLayerProperty
} from '../reducers/layersSlice';

export const DateRangePicker = () => {
  const dispatch = useDispatch();
  const startDate = useSelector(state => selectLayerProperty(state, 'startDate'));
  const endDate = useSelector(state => selectLayerProperty(state, 'endDate'));
  const dateRangeIndex = useSelector(state => selectLayerProperty(state, 'dateRangeIndex'));
  const wmsLayers = useSelector(state => selectLayerProperty(state, 'wmsLayers'));

  const useStyles = makeStyles({
    root: {
      width: 300
    }
  });

  const classes = useStyles();

  const onStartDateChange = (date) => {
    let day = date.getDate().toString();
    if (day.length < 2) {
      day = `0${day}`;
    }
    let month = (date.getMonth() + 1).toString();
    if (month.length < 2) {
      month = `0${month}`;
    }

    dispatch(changeStartDate(date.toISOString()));
    dispatch(changeDateRangeIndex(0));
    // getChartData(modisData.coordinates[0], modisData.coordinates[1]);
  };

  const onSliderChange = (e, v) => {
    //    console.log('slider change')
    //    console.log('slider value is ' + String(v))
    if (v !== dateRangeIndex) {
      dispatch(changeDateRangeIndex(v));
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

    dispatch(changeEndDate(date.toISOString())); // set end date state
    dispatch(changeDateRangeIndex(0));
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
        key={`slider-${dateRangeIndex}`}
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
