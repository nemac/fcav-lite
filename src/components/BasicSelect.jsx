import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { config } from '../config';

export default function BasicSelect(props) {
  const { label, selectedDate, changeProduct, setChangeProduct } = props;

  const handleChange = (event) => {
    const layer = event.target.value;
    layer.layer = layer.layer.concat(selectedDate).concat('MaskForForest');
    setChangeProduct(layer);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Layer</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={changeProduct}
          label={label}
          onChange={handleChange}
        >
          {config.wmsLayers.map((layer, index) => (
            <MenuItem key={index} value={layer}>
              {layer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}