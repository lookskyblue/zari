import React, { Component, useState, useEffect } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";



//import "./MapAPI.scss";






class MapAPI extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    const mapStyles = {
      width: '100%',
      height: '100%'
    }
    const storeArray = this.props.storeList;
    console.log(this.props)
    return (
      
      <div className='MapAPI' style={{ height: '100vh', width: '100vh', }} >
        
        <Map
          onClick={this.onMapClicked}
          google={this.props.google}
          zoom={15}
          initialCenter={this.props.initialCenter}
          style={mapStyles}
        >

          <Marker onClick={this.onMarkerClick} name={"현재위치"} >
          <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
          </Marker>

          {storeArray.map((obj) => (
                <Marker key={obj.id} name={obj.storeName} title={'근처매장'}
                name={'매장'} position={{lat: obj.location.latitude, lng:obj.location.longitude} }>
                  <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
                      <div>
                        <h1>{}</h1>
                      </div>
                    </InfoWindow>
                </Marker>
            ))}

          <Marker
            onClick={this.onMarkerClick} name={"매장위치"}
            title={'근처매장'}
            name={'매장'}
            position={{ lat: 35.778519, lng: 128.405640 }} >

            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
              <div>
                <h1>test
                </h1>
              </div>
            </InfoWindow>
          </Marker>
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