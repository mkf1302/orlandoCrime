import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import "./style.css";




class MapContainer extends Component {
    state = {
    result: [],
    search: "",
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    points: [{
    lat: this.props.lat,
    lng: this.props.lng
    }],
    bounds: new this.props.google.maps.LatLngBounds()
  };


  onMarkerClick = (props, marker) =>
  this.setState({
    activeMarker: marker,
    selectedPlace: props,
    showingInfoWindow: true
  });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };
  
  render() {



    if (!this.props.loaded) return <div>Loading...</div>;

    // console.log("Updated map with API data: ", this.props.data)
    console.log("In Map.js: lat: ", this.props.lat, "lng: ", this.props.lng)
    // console.log("In Map.js - Zip Code Entered: ", this.state.search, "lat and long", lat, lng);
   
     
    
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <Map
         google={this.props.google} 
         zoom={14}
         onClick={this.onMapClicked}
         center={{
          lat: this.props.lat, lng: this.props.lng  
          }}
        >
        
{/* Function to render crime data into a marker  */}

        { 
         this.props.data.map((item, key) => { 
          //  console.log("item: ", item) 
          return <Marker key={key}
            title={item.case_offense_category}
            onClick={this.onMarkerClick}
            name={item.case_offense_category}
            date={item.case_date_time}
            position={{lat: item.location.coordinates[1], lng: item.location.coordinates[0]}}
           />
          })  
        }
        <InfoWindow 
          onClose={this.onInfoWindowClose}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          >
          <div>
            <p>Type of Crime: {this.state.selectedPlace.name}</p>
            <p>Date and Time of Crime: {this.state.selectedPlace.date}</p>
          </div>
        </InfoWindow>
        </Map>
      </div>
    );
  }
}
// console.log('after map loads', this.props.data)
export default GoogleApiWrapper({
  // apiKey: ('AIzaSyA8hoZSROR8mXO5SCYTV2MIxRhtHNthwVY')
  apiKey: ('AIzaSyCnk106_VHUZFICwWr5UB_c2JYor-0BWpI')
})(MapContainer);