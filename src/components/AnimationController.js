import { useState, useEffect } from 'react';
import { useLeafletContext } from '@react-leaflet/core';
import PropTypes from 'prop-types';
import 'leaflet-spin';
import { useDispatch, useSelector } from 'react-redux';
import { selectLayerProperty, changeDateRangeIndex, incrementDateRangeIndex, incrementDateRangeIndexAsync } from '../reducers/layersSlice';

export const AnimationController = ({ 
  animating, animationTime 
}) => {
  const dispatch = useDispatch();
  const layers = useSelector(state => selectLayerProperty(state, 'wmsLayers'));
  const dateRangeIndex = useSelector(state => selectLayerProperty(state, 'dateRangeIndex'));
  
  const timeMultiplicationFactor = 1000; // number of milliseconds per second of animation time
  const context = useLeafletContext();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('reloaded');
  })

  // Helper function to check if all layers have been loaded
  const allLayersLoaded = () => {
    for (const layer of layers) {
      if (layer.leafletLayer.isLoading() || !context.map.hasLayer(layer.leafletLayer)) {
        setLoaded(false);
        return false;
      }
    }

    setLoaded(true);
    return true;
  }

  // Frame update
  useEffect(() => {
    if (!animating) {
      return;
    }

    // call again
    const layersLoaded = allLayersLoaded();

    console.log('Will I animate?');
    console.log(layersLoaded ? "All layers loaded" : "Not loaded.");

    if (!layersLoaded) {
      context.map.spin(true);
      return;
    }

    context.map.spin(false);
    console.log('Updating frame.');

    // if (dateRangeIndex == layers.length - 1) {
    //   dispatch(changeDateRangeIndex(0))
    // } else {
    //   dispatch(incrementDateRangeIndexAsync());
    // }

    const timer = setTimeout(() => {
      if (dateRangeIndex === layers.length - 1) {
        dispatch(changeDateRangeIndex(0));
      } else {
        dispatch(incrementDateRangeIndex());
      }
    }, animationTime * timeMultiplicationFactor);
    return () => { clearTimeout(timer); };
  }, [animating, animationTime, dateRangeIndex, loaded]);
  
  // Adds layers to the map and cleans up upon exit from animation
  useEffect(() => {
    if (!animating) {
      setLoaded(false);
      context.map.spin(false);
      return;
    }

    layers.forEach((layer) => {
      layer.leafletLayer.on('load', allLayersLoaded);
      if (!context.map.hasLayer(layer.leafletLayer)) {
        console.log('Adding layer to map with opacity 0...');
        console.log(layer);
        layer.leafletLayer.setOpacity(0);
        context.map.addLayer(layer.leafletLayer);
      } else {
        console.log('Layer is already on the map: ');
        console.log(layer);
      }

  });
}, [layers, animating]);

  return null;
};

AnimationController.propTypes = {
  animating: PropTypes.bool.isRequired,
  animationTime: PropTypes.number.isRequired
};
