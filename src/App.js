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

const App = () => {
  const [graphOn, setGraphOn] = useStateWithLabel(false, 'GraphOn');

  const [map, setMap] = useStateWithLabel('', 'map');

  const [startDate, setStartDate] = useStateWithLabel(new Date('2020-01-16'), 'startDate');
  const [endDate, setEndDate] = useStateWithLabel(new Date('2021-02-17'), 'endDate');

  const [dateRangeIndex, setDateRangeIndex] = useStateWithLabel(0, 'dateRangeIndex');

  const basemaps = config.baseLayers;
  const [basemapIndex, setBasemapIndex] = useStateWithLabel(2, 'basemapIndex');

  const [productIndex, setProductIndex] = useStateWithLabel(0, 'productIndex');

  const [wmsLayers, setWmsLayers] = useStateWithLabel(
    getWMSLayersYearRange(startDate, endDate, productIndex),
    'fullWMSLayers'
  );

  return (
      <div>
          <NavigationBar graphOn={graphOn} setGraphOn={setGraphOn} map={map} startDate={startDate}
                         setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
                         dateRangeIndex={dateRangeIndex} setDateRangeIndex={setDateRangeIndex}
                         basemaps={basemaps} basemapIndex={basemapIndex}
                         setBasemapIndex={setBasemapIndex} productIndex={productIndex}
                         setProductIndex={setProductIndex} wmsLayers={wmsLayers}
                         setWmsLayers={setWmsLayers} />
          <LeafletMap graphOn={graphOn} setMap={setMap} startDate={startDate} endDate={endDate}
                      dateRangeIndex={dateRangeIndex} setDateRangeIndex={setDateRangeIndex}
                      basemaps={basemaps} basemapIndex={basemapIndex} productIndex={productIndex}
                      wmsLayers={wmsLayers} />
      </div>
  );
};

export default App;