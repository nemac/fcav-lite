import {
  useDebugValue, useEffect, useRef, useState
} from 'react';
import L from 'leaflet';
import { getNextFWDate, toWMSDate } from './datemanagement';
import config from './config';

export const useStateWithLabel = (initialValue, name) => {
  const [value, setValue] = useState(initialValue);
  useDebugValue(`${name}: ${value}`);
  return [value, setValue];
};

// Desired hook
export const useCompare = (val) => {
  const prevVal = usePrevious(val);
  return prevVal !== val;
};

// Helper hook
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const getWMSLayersYearRange = (startDate, endDate, productIdx, setNumLayersLoaded) => {
  const wmsLayers = [];
  let tempDate = getNextFWDate(startDate);
  //    console.log("tempdate: " + tempDate);
  //setNumLayersLoaded(0);
  while (tempDate <= endDate) {
    const wmsdate = toWMSDate(tempDate);
    const o = config.wms_template(wmsdate, productIdx);
    o.leafletLayer = L.tileLayer.wms(o.baseUrl, o.options);
    o.date = tempDate;
    o.leafletLayer.on('load', () => {
      console.log('loaded layer!');
      setNumLayersLoaded(prevNumLayersLoaded => prevNumLayersLoaded + 1);
    });
    o.leafletLayer.on('unload', () => setNumLayersLoaded(prevNumLayersLoaded => prevNumLayersLoaded - 1));
    wmsLayers.push(o);
    tempDate.setDate(tempDate.getDate() + 1);
    tempDate = getNextFWDate(tempDate);
  }
  return wmsLayers;
};
