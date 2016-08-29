import React, { Component } from 'react';
import Searchbar from './Searchbar';
import MapCanvas from './MapCanvas';
import Results from './ResultsList';

const App = () => (
  <div>
    <h1>Google Places</h1>
    <Searchbar />
    <MapCanvas />
    <Results />
  </div>
)

export default App;
