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
  const { label, selection, selectionList, handleChange } = props;

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Layer</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selection}
          label={label}
          onChange={handleChange}
        >
          {selectionList.map((layer, index) => (
            <MenuItem key={index} value={layer}>
              {layer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}