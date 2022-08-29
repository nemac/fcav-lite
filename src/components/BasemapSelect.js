import { DropDownSelector } from "./DropDownSelector";
import React, {
  useContext, useDebugValue, useEffect, useState
} from 'react';
import PropTypes from 'prop-types';


export const BasemapSelect = ({ basemaps, basemapIndex, setBasemapIndex }) => {
    const onBasemapChange = (event) => {
      const index = event.target.value;
      setBasemapIndex(index);
    };
  
    return (
        <DropDownSelector buttonText={'Basemap'} labelId={'fcav-basemap-select-label'} id={'fcav-basemap-select'}
        value={basemapIndex} onChange={onBasemapChange} options={basemaps} getOptionName={option => option.name} />
    );
  };

  BasemapSelect.propTypes = {
    basemaps: PropTypes.array.isRequired,
    basemapIndex: PropTypes.number.isRequired,
    setBasemapIndex: PropTypes.func.isRequired
  };
