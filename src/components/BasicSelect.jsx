import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  useQuery,
} from '@tanstack/react-query'
import XMLParser from 'react-xml-parser';
import { config } from '../config';

export default function BasicSelect(props) {

  const {
    defaultValue,
    value,
    label,
    selectionList,
    handleChange
  } = props
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
          defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
          variant="outlined"
        >
          {selectionList.map((item) =>
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}