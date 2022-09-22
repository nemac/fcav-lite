/*
We anticipate rendering the following here:
NavigationBar
LeafletMap
*/
import React from 'react';
import { NavigationBar } from './components/NavigationBar';
import { LeafletMap } from './components/LeafletMap';
import config from './config';
import { useStateWithLabel, getWMSLayersYearRange } from './utils';
import { useEffect } from 'react';

const App = () => {
  const [graphOn, setGraphOn] = useStateWithLabel(false, 'GraphOn');

  const [map, setMap] = useStateWithLabel('', 'map');

  const [startDate, setStartDate] = useStateWithLabel(new Date('2021-01-02'), 'startDate');
  const [endDate, setEndDate] = useStateWithLabel(new Date('2021-02-17'), 'endDate');

  const [dateRangeIndex, setDateRangeIndex] = useStateWithLabel(0, 'dateRangeIndex');

  const basemaps = config.baseLayers;
  const [basemapIndex, setBasemapIndex] = useStateWithLabel(2, 'basemapIndex');

  const [productIndex, setProductIndex] = useStateWithLabel(0, 'productIndex');

  const [numLayersLoaded, setNumLayersLoaded] = useStateWithLabel(0, 'numLayersLoaded');

  const [wmsLayers, setWmsLayers] = useStateWithLabel(
    getWMSLayersYearRange(startDate, endDate, productIndex, setNumLayersLoaded),
    'fullWMSLayers'
  );

  const [animating, setAnimating] = useStateWithLabel(false, 'animating');

  // wmsLayers updated
  useEffect(() => {
    setNumLayersLoaded(0);
  }, [wmsLayers]);

  return (
      <div>
          <NavigationBar graphOn={graphOn} setGraphOn={setGraphOn} map={map} startDate={startDate}
                         setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
                         dateRangeIndex={dateRangeIndex} setDateRangeIndex={setDateRangeIndex}
                         basemaps={basemaps} basemapIndex={basemapIndex}
                         setBasemapIndex={setBasemapIndex} productIndex={productIndex}
                         setProductIndex={setProductIndex} wmsLayers={wmsLayers}
                         setWmsLayers={setWmsLayers} animating={animating}
                         setAnimating={setAnimating} setNumLayersLoaded={setNumLayersLoaded} />
          <LeafletMap graphOn={graphOn} setMap={setMap} startDate={startDate} endDate={endDate}
                      dateRangeIndex={dateRangeIndex} setDateRangeIndex={setDateRangeIndex}
                      basemaps={basemaps} basemapIndex={basemapIndex} productIndex={productIndex}
                      wmsLayers={wmsLayers} animating={animating} numLayersLoaded={numLayersLoaded} />
      </div>
  );
};

export default App;
