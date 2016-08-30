import React, { Component } from 'react';
import Searchbar from '../components/Searchbar';
import MapCanvas from '../components/MapCanvas';
import Results from '../components/ResultsList';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      region: {
        lat: 37.78825,
        lng: -122.4024,
      },
      results: [],
      resultsMarkers: [],
      lastPosition: null,
      watchID: null,
      refresh: false,
      error: false,
      currentPlace: null,
      currentPlaceIndex: 0,
    };
    this.map = null;
    this.searchPlaces = this.searchPlaces.bind(this);
    this.seePrevious = this.seePrevious.bind(this);
    this.seeNext = this.seeNext.bind(this);
  }
  componentDidMount() {
    // If geolocation is not available
    if (!navigator.geolocation) {
      console.log('Geolocation not available');
    }
    // Grab user's current location (available only for repo with server file)
    navigator.geolocation.getCurrentPosition((position) => {
      const initialPosition = JSON.stringify(position);
      this.setState({
        region: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    },
    (error) => {
      console.error(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    });
    this.watchID = navigator.geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      this.setState({ lastPosition });
    });

    // Create a map instance
    const location = new google.maps.LatLng(this.state.region.lat, this.state.region.lng);
    const newMap = new google.maps.Map(document.getElementById('map-canvas'), {
      center: location,
      zoom: 14,
    });
    this.map = newMap;

    // Create new location marker
    const initialMarker = new google.maps.Marker({
      map: newMap,
      position: this.state.region,
      draggable: true,
      title: 'Places near here',
      icon: 'https://maps.google.com/mapfiles/ms/micons/red-dot.png',
    });

    // Add ability to drag for location marker
    initialMarker.addListener('dragend', e => {
      const latitude = e.latLng.lat();
      const longitude = e.latLng.lng();
      this.setState({
        region: {
          lat: latitude,
          lng: longitude,
        }
      });
    });
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  // Text based search
  searchPlaces(e) {
    const searchQuery = document.querySelector('#search-input').value;
    const service = new google.maps.places.PlacesService(this.map);
    let placeType = document.getElementById('option-dropdown').value;
    
    // Initialize places search as restaurant if no selection
    if (!placeType) {
      placeType = 'restaurant';
    }
    // Search query options
    const options = {
      query: searchQuery,
      location: this.state.region,
      radius: 1000,
      type: placeType,
    };

    // Invoke google places search
    service.textSearch(options, results => {
      if (this.state.resultsMarkers) {
        this.removeMarkers();
      }
      if (results.length === 0) {
        this.setState({
          error: true,
        });
      } else {
        this.setState({
          results: results,
          error: false,
          currentPlace: results[0],
          currentPlaceIndex: 0,
        });
        this.createMarkers(this.state.results);
      }
    });
  }
  // Marker creation function
  createMarkers(array) {
    let markers = [];
    array.forEach(item => {
      markers.push(
        new google.maps.Marker({
          map: this.map,
          position: {
            lat: item.geometry.location.lat(),
            lng: item.geometry.location.lng(),
          },
          animation: google.maps.Animation.DROP,
          icon: 'https://maps.google.com/mapfiles/ms/micons/green-dot.png',
          title: item.name + '\n' + item.formatted_address,
        })
      );
    });
    this.setState({
      resultsMarkers: markers,
    });
    this.state.resultsMarkers[0].setAnimation(google.maps.Animation.BOUNCE);
  }
  // Marker removal function
  removeMarkers() {
    this.state.resultsMarkers.forEach(marker => {
      marker.setMap(null);
    });
    this.setState({
      resultsMarkers: [],
    });
  }
  // Allows user to click and see the previous location
  seePrevious() {
    let prevIndex;
    if (this.state.currentPlaceIndex === 0) {
      prevIndex = 0;
    } else {
      prevIndex = this.state.currentPlaceIndex - 1;
    }
    const prevPlace = this.state.results[prevIndex];

    // Marker functions
    this.state.resultsMarkers[prevIndex + 1].setAnimation(null);
    this.state.resultsMarkers[prevIndex].setAnimation(google.maps.Animation.BOUNCE);

    this.setState({
      currentPlaceIndex: prevIndex,
      currentPlace: prevPlace,
    });
  }
  // Allows user to click and see the next location
  seeNext() {
    let nextIndex;
    if (this.state.currentPlaceIndex === this.state.results.length - 1) {
      nextIndex = this.state.results.length - 1;
    } else {
      nextIndex = this.state.currentPlaceIndex + 1;
    }
    const nextPlace = this.state.results[nextIndex];

    // Marker functions
    this.state.resultsMarkers[nextIndex - 1].setAnimation(null);
    this.state.resultsMarkers[nextIndex].setAnimation(google.maps.Animation.BOUNCE);

    this.setState({
      currentPlaceIndex: nextIndex,
      currentPlace: nextPlace,
    });
  }
  render() {
    return (
      <div 
        className="container wrapper">
        <div className="row">
          <MapCanvas />
          <Searchbar
            searchPlaces={this.searchPlaces}
          />
          <Results
            error={this.state.error}
            current={this.state.currentPlace}
            previous={this.seePrevious}
            next={this.seeNext}
          />
        </div>
      </div>
    );
  }
}

export default AppContainer;
