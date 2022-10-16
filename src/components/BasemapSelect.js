import { DropDownSelector } from "./DropDownSelector";
import React, {
  useContext, useDebugValue, useEffect, useState
} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectBasemaps, selectBasemapIndex, changeBasemapIndex } from '../reducers/basemapsSlice';


export const BasemapSelect = () => {
    const dispatch = useDispatch();
    const basemaps = useSelector(selectBasemaps);
    const basemapIndex = useSelector(selectBasemapIndex);

    const onBasemapChange = (event) => {
      dispatch(changeBasemapIndex(event.target.value));
    };
  
    return (
        <DropDownSelector buttonText={'Basemap'} labelId={'fcav-basemap-select-label'} id={'fcav-basemap-select'}
        value={basemapIndex} onChange={onBasemapChange} options={basemaps} getOptionName={option => option.name} />
    );
  };
