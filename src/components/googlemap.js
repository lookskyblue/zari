
import React, { Component } from "react";
import { Map, GoogleApiWrapper,InfoWindow,Marker } from "google-maps-react";
//import "./MapAPI.scss";
 
class MapAPI extends Component {
  render() {
    const mapStyles = {
      width: '100%',
      height: '100%'
    }
    
    return (
      <div className='MapAPI' style={{ height: '100vh', width: '100vh',}} >
        <Map
          google={this.props.google}
          zoom={15}
          initialCenter={{ lat: 36.5, lng: 129 }}
          style={mapStyles}
        >
          <Marker name={"현재위치"}/>
          <InfoWindow>
            <div>
              <h1>test
                </h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
   
  }
}
 
export default GoogleApiWrapper({
  apiKey: "AIzaSyBo7P2RGGtra6b7xc61eqheHoeJrDfbfq4",
})(MapAPI);
 
/*
import React, { Component } from 'react';
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 35.95,
      lng: 128.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '40vh', width: '' }}>
        <h2>hello</h2>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBo7P2RGGtra6b7xc61eqheHoeJrDfbfq4" }}
          defaultCenter={{lat:35.95, lng:128.33}}
          defaultZoom={this.props.zoom}
        >
          
          <AnyReactComponent
            lat={35.955413}
            lng={128.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
*/