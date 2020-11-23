/*

import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
//import "./MapAPI.scss";
 
class MapAPI extends Component {
  render() {
    return (
      <div className='MapAPI'>
        <Map
          google={this.props.google}
          zoom={15}
          initialCenter={{ lat: 37.5, lng: 127 }}
        ></Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: "AIzaSyCJq7PjoUUMcaeIfETDehCrORHHdiFlgaA",
})(MapAPI);
 

*/
import React, { Component } from 'react';
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '40vh', width: '50%' }}>
        <h2>hello</h2>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCJq7PjoUUMcaeIfETDehCrORHHdiFlgaA" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;