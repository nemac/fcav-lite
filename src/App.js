/*
We anticipate rendering the following here:
NavigationBar
LeafletMap
*/
import React from 'react';
import { NavigationBar } from './components/NavigationBar';
import { LeafletMap } from './components/LeafletMap';
import ReactDOM from 'react-dom';

export default function App() {

  return (
      <div>
          <NavigationBar/>
          <LeafletMap/>
      </div>
  );
}
