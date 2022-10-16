/*
We anticipate rendering the following here:
NavigationBar
LeafletMap
*/
import React from 'react';
import { NavigationBar } from './components/NavigationBar';
import { LeafletMap } from './components/LeafletMap/LeafletMap';
import { useStateWithLabel, getWMSLayersYearRange } from './utils';

const App = () => {
  const [map, setMap] = useStateWithLabel('', 'map');

  const [animating, setAnimating] = useStateWithLabel(false, 'animating');

  const [animationTime, setAnimationTime] = useStateWithLabel(1, 'animationTime');

  return (
      <div>
          <NavigationBar map={map} animating={animating} setAnimating={setAnimating} animationTime={animationTime} 
                        setAnimationTime={setAnimationTime} />
          <LeafletMap setMap={setMap} animating={animating} setAnimating={setAnimating} />
      </div>
  );
};

export default App;
