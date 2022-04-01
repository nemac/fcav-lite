// This component will be for the start and end date
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import Slider from '@material-ui/core/Slider'

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