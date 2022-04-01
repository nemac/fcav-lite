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
import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import { Grid } from "@material-ui/core"
import { BasemapSelect, ThemeSelect, ProductSelect } from './DropDownSelector'
import { DateRangePicker } from './Datepicker'

function TopBar () {
  return (
    //<ThemeProvider theme={fcavtheme}>
    <Grid item xs={12}>
      <AppBar
      //id='menu'
      position="static"
      style={{ zIndex: '0', flexWrap: 'flex', flexDirection: 'column'}}
      >
        <Toolbar>
          <img src={ darkMode ? nemacLogoWhite : nemacLogoBlack} width="150" alt="your mom"></img>
          <BasemapSelect/>
          <DateRangePicker/>
          <ProductSelect/>
          <ThemeSelect/>
          <GraphBtn/>
        </Toolbar>
      </AppBar>
    </Grid>
    //</ThemeProvider>
  )
}