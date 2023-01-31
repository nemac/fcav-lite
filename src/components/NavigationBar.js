/*
This component will be a high level
component that encapsulates the following:
Basemap Dropdown - BasemapSelect.js
Start Date - Datepicker.js
Animation Slider - AnimationSlider.js
End Date - Datepicker.js
Product - ProductSelect.js
Theme - ThemeSelect.js
*/
import React, { useDebugValue, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid } from '@material-ui/core';
import L from 'leaflet';
import { makeStyles } from '@material-ui/core/styles';
import { BasemapSelect } from './BasemapSelect';
import { ThemeSelect } from './ThemeSelect';
import { ProductSelect } from './ProductSelect';
import { DateRangePicker } from './DateRangePicker';
import { AnimateButton } from './AnimateButton';
import { GraphButton } from './GraphButton';
import nemacLogoWhite from '../nemac_logo_white.png';
import nemacLogoBlack from '../nemac_logo_black.png';
import { useStateWithLabel } from '../utils';
import { AnimationTimeSelect } from './AnimationTimeSelect';
import { selectLayerProperty, changeProductIndex, changeOverlayIndex } from '../reducers/layersSlice';
import config from '../config';
import { ProductIndicator } from './ProductIndicator';

export const NavigationBar = ({
  map, animating, setAnimating, animationTime, setAnimationTime 
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
          <BasemapSelect />
          <DateRangePicker />
          <ProductSelect selector={state => selectLayerProperty(state, 'productIndex')} actionCreator={changeProductIndex}
            productsList={config.productsList} />
          <ProductSelect selector={state => selectLayerProperty(state, 'overlayIndex')} actionCreator={changeOverlayIndex} 
            productsList={config.overlaysList} />
          <ThemeSelect setDarkMode={setDarkMode} />
          <AnimateButton animating={animating} setAnimating={setAnimating} />
          <AnimationTimeSelect animationTime={animationTime} setAnimationTime={setAnimationTime} />
          <GraphButton map={map} />
        </Toolbar>
      </AppBar>
    </Grid>
    // </ThemeProvider>
  );
};

NavigationBar.propTypes = {
  map: PropTypes.instanceOf(L.Map).isRequired,
  animating: PropTypes.bool.isRequired,
  setAnimating: PropTypes.func.isRequired,
  animationTime: PropTypes.number.isRequired,
  setAnimationTime: PropTypes.func.isRequired
};
