import { useState, useEffect } from 'react';
import { useLeafletContext } from '@react-leaflet/core';
import PropTypes from 'prop-types';
import 'leaflet-spin';
import { useDispatch, useSelector } from 'react-redux';
import { selectLayerProperty, changeDateRangeIndex, incrementDateRangeIndex } from '../reducers/layersSlice';

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
    console.log(layers[0]);

    if (!layersLoaded) {
      context.map.spin(true);
      return;
    }

    context.map.spin(false);
    console.log('Updating frame.');
    const layer = layers[dateRangeIndex];
    layers.forEach((_layer) => {
      _layer.leafletLayer.bringToBack();
    });
    layer.leafletLayer.bringToFront();
    layer.leafletLayer.setOpacity(1);
    const timer = setTimeout(() => {
      if (dateRangeIndex === layers.length - 1) {
        dispatch(changeDateRangeIndex(0));
      } else {
        dispatch(incrementDateRangeIndex());
      }
      layer.leafletLayer.setOpacity(0);
    }, animationTime * timeMultiplicationFactor);
    return () => { clearTimeout(timer); };
  }, [animating, dateRangeIndex, loaded]);
  
  // Initial load
  useEffect(() => {
    if (!animating) {
      setLoaded(false);
      context.map.spin(false);
      return;
    }

    console.log('Hey there!');
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

    //document.body.style.cursor='wait';
    //setDateRangeIndex(0);
  }, [layers, animating]);
});

  return null;
};

AnimationController.propTypes = {
  animating: PropTypes.bool.isRequired,
  animationTime: PropTypes.number.isRequired
};
