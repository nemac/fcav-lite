import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet/hooks';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectLayerProperty, changeDateRangeIndex, incrementDateRangeIndex } from '../reducers/layersSlice';

export const AnimationController = ({ 
  animating, animationTime
}) => {
  const dispatch = useDispatch();
  const layers = useSelector(state => selectLayerProperty(state, 'wmsLayers'));
  const dateRangeIndex = useSelector(state => selectLayerProperty(state, 'dateRangeIndex'));
  
  const timeMultiplicationFactor = 1000; // number of milliseconds per second of animation time
  const loadingCheckInterval = 50; // interval in milliseconds
  const map = useMap();
  const [loaded, setLoaded] = useState(false);
  const [spinning, setSpinning] = useState(false);

  // Helper function to check if all layers have been loaded
  const allLayersLoaded = () => {
    let layersLoaded = true;
    map.eachLayer(layer => layersLoaded &&= !layer.isLoading());
    setLoaded(layersLoaded);
    return layersLoaded;
  }

  // Hook to check if layers are loaded at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      allLayersLoaded();
    }, loadingCheckInterval);

    return () => clearInterval(interval);
  }, []);

  // Animation handling hook
  useEffect(() => {
    if (!animating) {
      setLoaded(false);

      if (spinning) {
        map.spin(false);
      }

      setSpinning(false);
      return;
    }

    //call again to get most up to date value
    const layersLoaded = allLayersLoaded();
        
    console.log(layersLoaded ? "All layers loaded" : "Not loaded.");

    if (!layersLoaded) {
      console.log("Setting spin to true");
      map.eachLayer(layer => layer.on('load', allLayersLoaded));
      
      if (!spinning) {
        map.spin(true);
      }

      setSpinning(true);
      return;
    }

    if (spinning) {
      map.spin(false);
    }

    setSpinning(false);

    console.log('Updating frame.');

    const timer = setTimeout(() => {
      if (allLayersLoaded()) {
        if (dateRangeIndex === layers.length - 1) {
          dispatch(changeDateRangeIndex(0));
        } else {
          dispatch(incrementDateRangeIndex());
        }
      }
    }, animationTime * timeMultiplicationFactor);

    return () => clearTimeout(timer);
  }, [animating, animationTime, dateRangeIndex, loaded]);

  return null;
};

AnimationController.propTypes = {
  animating: PropTypes.bool.isRequired,
  animationTime: PropTypes.number.isRequired
};
