import { useState, useEffect } from 'react';
import { useLeafletContext } from '@react-leaflet/core';
import PropTypes from 'prop-types';

export const AnimationController = ({ layers, animating, dateRangeIndex, setDateRangeIndex }) => {
  const context = useLeafletContext();

  // Frame update
  useEffect(() => {
    if (!animating) {
      return;
    }
    console.log('Updating frame.');
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
  }, [animating, dateRangeIndex]);

  // Initial load
  useEffect(() => {
    if (!animating) {
      return;
    }
    let layersToLoad = 0;
    layers.forEach((layer) => {
      if (!context.map.hasLayer(layer.leafletLayer)) {
        console.log('Adding layer to map with opacity 0...');
        console.log(layer);
        layer.leafletLayer.setOpacity(0);
        context.map.addLayer(layer.leafletLayer);
        layersToLoad++;
      } else {
        console.log('Layer is already on the map: ');
        console.log(layer);
      }
      layer.leafletLayer.on('load', () => {
        console.log('loaded');
        layersToLoad--;
        console.log(layersToLoad);
        if (layersToLoad === 0) {
          console.log('All layers loaded.');
          setDateRangeIndex(0);
        }
      });
    });
  }, [layers, animating]);

  return null;
};

AnimationController.propTypes = {
  layers: PropTypes.array.isRequired,
  animating: PropTypes.bool.isRequired
};
