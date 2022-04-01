/* This component will be for the following:
Basemap dropdown
Product dropdown
Theme dropdown
*/
import React from 'react';
import ReactDOM from 'react-dom';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

function BasemapSelect () {

  return (
    <FormControl letiant="outlined" style={{marginRight: 16 }}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        Basemap
      </InputLabel>
      <Select
        labelId="fcav-basemap-select-label"
        id="fcav-basemap-select"
        value={basemapIndex}
        onChange={onBasemapChange}
        label="Product"
      >
      {
        basemaps.map((basemap, index) => (
        <MenuItem key={index} value={index}>{basemap.name}</MenuItem>
      ))
    }
    </Select>
    </FormControl>
  )
}

function ThemeSelect () {
  // Hook: Theme change
  useEffect(() => {
    //console.log(newWMS);
    let chosenTheme = themesList[themeIndex] // TODO: Find this variable in fcav.js
    chosenTheme = chosenTheme.toLowerCase()
//    console.log("chosen theme: " + chosenTheme)
    setTheme(chosenTheme)
    if(chosenTheme === 'dark'){
      setDarkMode(true);
    }
    else{
      setDarkMode(false);
    }
  }, [themeIndex])
  return (
    <FormControl letiant="outlined" style={{marginRight: 16 }}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
      Theme
      </InputLabel>
      <Select
        labelId="fcav-theme-select-label"
        id="fcav-theme-select"
        value={themeIndex}
        onChange={onThemeChange}
        label="Theme"
      >
      {
        themesList.map((theme, index) => (
          <MenuItem key={index} value={index}>{theme}</MenuItem>
        ))
      }
      </Select>
    </FormControl>
  )
}

function ProductSelect () {

  return (
    <FormControl letiant="outlined" style={{marginRight: 16 }}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        Product
      </InputLabel>
      <Select
        labelId="fcav-product-select-label"
        id="fcav-product-select"
        value={productIndex}
        onChange={onProductChange}
        label="Product"
      >
        {
          productsList.map((product, index) => (
            <MenuItem key={index} value={index}>{product}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}