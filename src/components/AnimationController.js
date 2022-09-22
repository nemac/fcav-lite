import { useState, useEffect } from 'react';
import { useLeafletContext } from '@react-leaflet/core';
import PropTypes from 'prop-types';
import { isReturningOnlyNull } from 'eslint-plugin-react/lib/util/jsx';

export const AnimationController = ({ layers, animating, dateRangeIndex, setDateRangeIndex, numLayersLoaded }) => {
  const context = useLeafletContext();
  const [loaded, setLoaded] = useState(false);

  // Helper function to check if all layers have been loaded
  const allLayersLoaded = () => {
    for (const layer of layers) {
      if (layer.leafletLayer.isLoading()) {
        layer.leafletLayer.on('load', allLayersLoaded);
        setLoaded(false);
        return;
      }
    }

    setLoaded(true);
    return;
  }

  // Frame update
  useEffect(() => {
    if (!animating) {
      return;
    }

    console.log('Will I animate?');
    console.log('Number of layers loaded is ' + numLayersLoaded);
    console.log('Length is ' + layers.length);

    // if (!(numLayersLoaded === layers.length)) {
    //   return;
    // }

    // call again
    allLayersLoaded();

    if (!loaded) {
      return;
    }

    console.log('Updating frame.');
    document.body.style.cursor='default';
    if (dateRangeIndex === null) return;
    const layer = layers[dateRangeIndex];
    layers.forEach((_layer) => {
      _layer.leafletLayer.bringToBack();
    });
    layer.leafletLayer.bringToFront();
    layer.leafletLayer.setOpacity(1);
    const timer = setTimeout(() => {
      setDateRangeIndex(prevDateRangeIndex => (prevDateRangeIndex + 1) === layers.length ? 0 : prevDateRangeIndex + 1);
      layer.leafletLayer.setOpacity(0);
    }, 1000);
    return () => { clearTimeout(timer); };
  }, [animating, dateRangeIndex, loaded]);
  
  // Initial load
  useEffect(() => {
    if (!animating) {
      setLoaded(false);
      return;
    }

    console.log('Hey there!');
    layers.forEach((layer) => {
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

    //document.body.style.cursor='wait';
    setDateRangeIndex(0);
  }, [layers, animating]);

  return null;
};

AnimationController.propTypes = {
  layers: PropTypes.array.isRequired,
  animating: PropTypes.bool.isRequired
};
