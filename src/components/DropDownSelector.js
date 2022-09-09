/* This component will be for the following:
Basemap dropdown
Product dropdown
Theme dropdown
*/
import React, {
  useContext, useDebugValue, useEffect, useState
} from 'react';
import ReactDOM from 'react-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import L from 'leaflet';
import config from '../config';
import { CustomThemeContext } from '../CustomThemeProvider';
import { getNextFWDate, toWMSDate } from '../datemanagement';
import { useStateWithLabel, getWMSLayersYearRange } from '../utils';

export const DropDownSelector = ({
  buttonText, labelId, id, value, onChange, options, getOptionName}) => {
  
    return (
    <FormControl letiant="outlined" style={{ marginRight: 16 }}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        {buttonText}
      </InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        onChange={onChange}
        label={buttonText}
      >
      {
        options.map((option, index) => (
        <MenuItem key={index} value={index}>{getOptionName === undefined ? option : getOptionName(option)}</MenuItem>
        ))
    }
    </Select>
    </FormControl>
  );
};

DropDownSelector.propTypes = {
  buttonText: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  getOptionName: PropTypes.func
};
