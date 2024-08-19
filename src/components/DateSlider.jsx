import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import { config } from '../config';

export default function DateSlider(props) {
  const { setSelectedDate, onSelectedDateChange, marks } = props;

  const markData = [
    {
      value: 0
    },
    {
      value: 1
    },
    {
      value: 2
    },
  ]

  function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
      <Tooltip open={open} interactive enterTouchDelay={0} title={value}>
        {children}
      </Tooltip>
    );
  }

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Date"
        slots={{valueLabel: ValueLabelComponent}}
        onChange={(event) => onSelectedDateChange(event)}
        step={1}
        marks={markData}
        min={0}
        max={markData.length - 1}
      />
    </Box>
  );
}