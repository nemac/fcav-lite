/*
This component will be a high level
component that encapsulates the following:
Basemap Dropdown - DropdownSelector.js
Start Date - Datepicker.js
Animation Slider - AnimationSlider.js
End Date - Datepicker.js
Product - DropdownSelector.js
Theme - DropdownSelector.js
*/
import React, { useDebugValue, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid } from '@material-ui/core';
import L from 'leaflet';
import { makeStyles } from '@material-ui/core/styles';
import { BasemapSelect, ThemeSelect, ProductSelect } from './DropDownSelector';
import { DateRangePicker } from './Datepicker';
import { GraphButton } from './GraphButton';
import nemacLogoWhite from '../nemac_logo_white.png';
import nemacLogoBlack from '../nemac_logo_black.png';
import { useStateWithLabel } from '../utils';

export const NavigationBar = ({
  graphOn, setGraphOn, map, startDate, setStartDate, endDate, setEndDate,
  dateRangeIndex, setDateRangeIndex, basemaps, basemapIndex, setBasemapIndex,
  productIndex, setProductIndex, wmsLayers, setWmsLayers
}) => {
  const [darkMode, setDarkMode] = useStateWithLabel(true);

  return (
    // <ThemeProvider theme={fcavtheme}>
    <Grid item xs={12}>
      <AppBar
      // id='menu'
      position="static"
      style={{ zIndex: '0', flexWrap: 'flex', flexDirection: 'column' }}
      >
        <Toolbar>
          <img src={ darkMode ? nemacLogoWhite : nemacLogoBlack} width="150" alt="your mom"></img>
          <BasemapSelect basemaps={basemaps} basemapIndex={basemapIndex}
                           setBasemapIndex={setBasemapIndex} />
          <DateRangePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                           setEndDate={setEndDate} dateRangeIndex={dateRangeIndex}
                           setDateRangeIndex={setDateRangeIndex} productIndex={productIndex}
                           wmsLayers={wmsLayers} setWmsLayers={setWmsLayers} />
          <ProductSelect startDate={startDate} endDate={endDate}
                         setDateRangeIndex={setDateRangeIndex} productIndex={productIndex}
                         setProductIndex={setProductIndex} setWmsLayers={setWmsLayers} />
          <ThemeSelect setDarkMode={setDarkMode} />
          <GraphButton graphOn={graphOn} setGraphOn={setGraphOn} map={map} />
        </Toolbar>
      </AppBar>
    </Grid>
    // </ThemeProvider>
  );
};

NavigationBar.propTypes = {
  graphOn: PropTypes.bool.isRequired,
  setGraphOn: PropTypes.func.isRequired,
  map: PropTypes.instanceOf(L.Map).isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  setStartDate: PropTypes.func.isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  setEndDate: PropTypes.func.isRequired,
  dateRangeIndex: PropTypes.number.isRequired,
  setDateRangeIndex: PropTypes.func.isRequired,
  basemaps: PropTypes.array.isRequired,
  basemapIndex: PropTypes.number.isRequired,
  setBasemapIndex: PropTypes.func.isRequired,
  productIndex: PropTypes.number.isRequired,
  setProductIndex: PropTypes.func.isRequired,
  wmsLayers: PropTypes.array.isRequired,
  setWmsLayers: PropTypes.func.isRequired
};
