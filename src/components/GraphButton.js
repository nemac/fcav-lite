import Button from '@material-ui/core/Button';
import StopIcon from '@material-ui/icons/Stop';
import AssessmentIcon from '@material-ui/icons/Assessment';
import React, { useDebugValue, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'eslint-plugin-react/lib/rules/prop-types';
import L from 'leaflet';

export const GraphButton = ({ graphOn, setGraphOn, map }) => {
  const handleGraphOpen = () => {
    // setModisData(getChartData(-78.65678578328217,35.45115625827913));
    // console.log(fetchChartData(-78.65678578328217,35.45115625827913));
    setGraphOn(!graphOn);
    // if(graphOn){
    const mapContainer = document.querySelector('.mapContainer');
    if (!graphOn) {
      mapContainer.style.setProperty('height', '45vh');
    } else {
      mapContainer.style.setProperty('height', '90vh');
    }
    map.invalidateSize();
    // }
  };

  // const handleGraphClose = () => setGraphOn(false);
  // getChartData(-78.65678578328217,35.45115625827913)
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
  graphOn: propTypes.bool.isRequired,
  setGraphOn: propTypes.function.isRequired,
  map: propTypes.instanceOf(L.Map).isRequired
};
