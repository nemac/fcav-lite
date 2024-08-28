import React from 'react';
import { createRoot } from 'react-dom/client';
import * as L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import { useMap } from 'react-leaflet';
import { Button } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useQuery } from '@tanstack/react-query';
import { convertStringToDate } from '../utils.js';

const createNdviButtonControl = (props) => {
  const { handler } = props;
  const ndviButtonStyle = {
    minHeight: '30px',
    minWidth: '30px',
    width: '30px',
    height: '30px',
    color: '#000000',
    backgroundColor: '#FFFFFF',
  };
  const control = L.control({ position: 'topleft' });

  control.onAdd = () => {
    const container = L.DomUtil.create('div', '');
    const root = createRoot(container);

    root.render(
      <Button variant="contained" onClick={handler} style={ndviButtonStyle}>
        <ShowChartIcon />
      </Button>
    );

    return container;
  };

  return control;
};

const NDVIButton = createControlComponent(createNdviButtonControl);

export default function NDVIButtonWrapper(props) {
  const { popupPosition, setPopupPosition, setShowGraph, setNdviData } = props;
  // TODO: Change this to actual ForWarn data and not LanDAT
  const ndviEndpoint = 'https://4desh2uig8.execute-api.us-east-1.amazonaws.com/prod/landat-ndvi';
  const map = useMap();

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [popupPosition],
    queryFn: async () => {
      const response = await fetch(`${ndviEndpoint}?lat=${popupPosition[0]}&lng=${popupPosition[1]}`);
      return await response.json();
    },
  });

  if (isPending) console.log('isPending');
  if (error) return 'An error has occurred: ' + error.message;

  React.useEffect(() => {
    if (!data) return;
    // maps over data and returns something like [{ name: '20000108', ndvi: 50 }, {...}],
    const ndviData = data.map((item) => {
      const [name, ndvi] = item.split(',');
      return {
        name,
        ndvi: parseInt(ndvi, 10),
      };
    });
    setNdviData(ndviData);
    console.log(ndviData);
  }, [data]);

  const ndviClickHandler = (e) => {
    if (!map) {
      return null;
    }
    e.stopPropagation();
    map.getContainer().style.cursor = 'crosshair';
    map.once('click', (e) => {
      console.log('click', e.latlng);
      setPopupPosition([e.latlng.lat, e.latlng.lng]);
      setShowGraph(true);
      map.getContainer().style.cursor = 'grab';
    });
  };

  return <NDVIButton handler={ndviClickHandler} />;
}
