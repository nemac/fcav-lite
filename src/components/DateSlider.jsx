import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { config } from '../config';

export default function DateSlider(props) {
  const { setSelectedDate, onSelectedDateChange } = props;
  const hardCodedDates = config.nonLeapYearDays.map(date => '2023' + date);

  const valuetext = (value) => {
    const hardCodedDates = config.nonLeapYearDays.map(date => '2023' + date);
    return hardCodedDates[value];
  }

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Date"
        defaultValue={0}
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        valueLabelDisplay="auto"
        onChange={(event) => onSelectedDateChange(event)}
        step={1}
        marks
        min={0}
        max={10}
      />
    </Box>
  );
}