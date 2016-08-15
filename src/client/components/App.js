import React, { Component } from 'react';
import SearchbarContainer from '../containers/SearchbarContainer';
import MapCanvasContainer from '../containers/MapCanvasContainer';
import ResultsContainer from '../containers/ResultsContainer';

const App = () => (
  <div>
    <h1>Google Places</h1>
    <SearchbarContainer />
    <MapCanvasContainer />
    <ResultsContainer />
  </div>
)

export default App;
