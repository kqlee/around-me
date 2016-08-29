import React, { Component } from 'react';
import MapCanvas from '../components/MapCanvas';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        lat: 37.78825,
        lng: -122.4324,
      },
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  onDragEnd(e) {
    const latitude = e.latLng.lat();
    const longitude = e.latLng.lng();
    this.setState({
      region: {
        lat: latitude,
        lng: longitude,
      }
    });
  }
  render() {
    return (
      <MapCanvas
        region={this.state.region}
        drag={this.onDragEnd}
      />
    );
  }
}

export default MapContainer;
