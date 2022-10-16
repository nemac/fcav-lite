import Button from '@material-ui/core/Button';
import StopIcon from '@material-ui/icons/Stop';
import AssessmentIcon from '@material-ui/icons/Assessment';
import React, { useDebugValue, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { selectGraphOn, toggleGraphOn } from '../reducers/graphSlice';

export const GraphButton = ({ map }) => {
  const dispatch = useDispatch();
  const graphOn = useSelector(selectGraphOn);

  const handleGraphOpen = () => {
    dispatch(toggleGraphOn());
    const mapContainer = document.querySelector('.mapContainer');
    if (!graphOn) {
      mapContainer.style.setProperty('height', '45vh');
    } else {
      mapContainer.style.setProperty('height', '90vh');
    }
    map.invalidateSize();
  };

  return (
        <Button
            letiant="contained"
            color="secondary"
            startIcon={ graphOn ? <StopIcon/> : <AssessmentIcon />}
            onClick={handleGraphOpen}
        >{ graphOn ? 'Hide Graph' : 'Show Graph' }
        </Button>
  );
};

GraphButton.propTypes = {
  map: PropTypes.instanceOf(L.Map).isRequired
};
