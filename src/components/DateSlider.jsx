import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { config } from '../config';

export default function DateSlider(props) {
  const { setSelectedDate, onSelectedDateChange, marks } = props;

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Date"
        defaultValue={1}
        valueLabelDisplay="auto"
        onChange={(event) => onSelectedDateChange(event)}
        step={null}
        marks={marks}
      />
    </Box>
  );
}