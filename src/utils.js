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
const usePrevious = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

// Return a dictionary of layer objects indexed by URL WITHOUT the leaflet layer classes
export const getWmsLayerObjects = (startDate, endDate, productIndex) => {
  const wmsLayers = {};
  let tempDate = getNextFWDate(startDate);

  while (tempDate <= endDate) {
    const wmsDate = toWMSDate(tempDate);
    const layerObject = config.wms_template(wmsDate, productIndex);
    wmsLayers[layerObject.baseUrl + '/' + layerObject.options.layers] = layerObject;
    tempDate.setDate(tempDate.getDate() + 1);
    tempDate = getNextFWDate(tempDate);
  }

  console.log(wmsLayers);
  return wmsLayers;
}

export const getLeafletLayer = wmsLayerObject => L.tileLayer.wms(wmsLayerObject.baseUrl, wmsLayerObject.options);
