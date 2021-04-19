// import {element} from "prop-types";
//
// const Search = () => {
//     return <div className= "container">
//         {/*<h1 className = "search grid">Search</h1>*/}
//         {/*<div>Let's get started</div>*/}
//         let map;
//
//
//         const localContextMapView = new google.maps.localContext.LocalContextMapView({
//         element: document.getElementById("map"),
//         placeTypePreferences: [
//     { type: "restaurant" },
//     { type: "tourist_attraction" },
//         ],
//         maxPlaceCount: 12,
//     });
//         map = localContextMapView.map;
//         map.setOptions({
//         center: { lat: 51.507307, lng: -0.08114 },
//         zoom: 14,
//     });
//     }
//
//         // Initialize without Local Context data.
//         const localContextMapView = new google.maps.localContext.LocalContextMapView({
//         element: document.querySelector('#map'),
//         placeTypePreferences: ['restaurant'],
//         maxPlaceCount: 0, // Avoids an automatic call to load places during initialization.
//     });
//
//     </div>
// }
//
// export default Search;
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';


const mapStyles = {
    width: '100%',
    height: '100%'
};



export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={
                    {
                        lat: 40.7484,
                        lng: -73.9857
                    }
                }
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Empire State Building'}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBSwgx7lbwAMCgQa0yiAYgqBshsRDN244A'
})(MapContainer);