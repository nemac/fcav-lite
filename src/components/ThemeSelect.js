import { DropDownSelector } from "./DropDownSelector";
import React, {
  useContext, useDebugValue, useEffect, useState
} from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import { CustomThemeContext } from '../CustomThemeProvider';
import { useStateWithLabel, getWMSLayersYearRange } from '../utils';

export const ThemeSelect = ({ setDarkMode }) => {
    // theme switching
    const themesList = config.themesList;
    const [themeIndex, setThemeIndex] = useStateWithLabel(0, 'themeIndex');
    const { setTheme } = useContext(CustomThemeContext);
  
    // State change and event handlers
  
    const onThemeChange = (event) => {
      const index = event.target.value;
      setThemeIndex(index);
    };
  
    // Hook: Theme change
    useEffect(() => {
      // console.log(newWMS);
      let chosenTheme = themesList[themeIndex]; // TODO: Find this variable in fcav.js
      chosenTheme = chosenTheme.toLowerCase();
      //    console.log("chosen theme: " + chosenTheme)
      setTheme(chosenTheme);
      if (chosenTheme === 'dark') {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    }, [themeIndex]);
    
    return (
        <DropDownSelector buttonText={'Theme'} labelId={'fcav-theme-select-label'} id={'fcav-theme-select'}
        value={themeIndex} onChange={onThemeChange} options={themesList} getOptionName={option => option} />
    );
  };

  ThemeSelect.propTypes = {
    setDarkMode: PropTypes.func.isRequired
  };
