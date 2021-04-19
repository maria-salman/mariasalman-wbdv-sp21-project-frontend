// import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
// import {useState} from "react";
//
// export const SearchApi = () => {
//     const [ selected, setSelected ] = useState({});
//     const [ markers, setMarkers ] = useState({});
//
//     const onSelect = (item) => {
//         setSelected(item);
//     }
//
//
//     const locations = [
//         {
//             name: "Location 1",
//             location: {
//                 lat: 41.3954,
//                 lng: 2.162
//             },
//         },
//         {
//             name: "Location 2",
//             location: {
//                 lat: 41.3917,
//                 lng: 2.1649
//             },
//         },
//         {
//             name: "Location 3",
//             location: {
//                 lat: 41.3773,
//                 lng: 2.1585
//             },
//         },
//         {
//             name: "Location 4",
//             location: {
//                 lat: 41.3797,
//                 lng: 2.1682
//             },
//         },
//         {
//             name: "Location 5",
//             location: {
//                 lat: 41.4055,
//                 lng: 2.1915
//             },
//         }
//     ];
//
//     const mapStyles = {
//         height: "100vh",
//         width: "100%"};
//
//     const defaultCenter = {
//         lat: 41.3851, lng: 2.1734
//     }
//
//     return (
//         <LoadScript
//             googleMapsApiKey='AIzaSyBSwgx7lbwAMCgQa0yiAYgqBshsRDN244A'>
//             <GoogleMap
//                 mapContainerStyle={mapStyles}
//                 zoom={13}
//                 center={defaultCenter}
//                 onClick={(event) => {
//                     setMarkers(current => [...current,lat: event.lat])
//                 }}>
//                 {
//                     locations.map(item => {
//                         return (
//                             <Marker key={item.name}
//                                     position={item.location}
//                                     onClick={(event) => onSelect(item)}/>
//                         )
//                     })
//                 }
//                 {
//                     selected.location &&
//                     (
//                         <InfoWindow
//                             position={selected.location}
//                             clickable={true}
//                             onCloseClick={() => setSelected({})}
//                         >
//                             <p>{selected.name}</p>
//                         </InfoWindow>
//                     )
//                 }
//             </GoogleMap>
//         </LoadScript>
//     )
// }



import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
const center = {
    lat: 43.6532,
    lng: -79.3832,
};
const myTripLocations = [{}];
const SearchApi = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((e) => {
        console.log('within onMapLoad', e.latLng.lat(), ' ' ,e.latLng.lng(),)
        myTripLocations.push({lat: e.latLng.lat(), lng: e.latLng.lng()})
        console.log('trip loc', myTripLocations)

        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),

            },
        ]);
    }, []);

    // retains state without causing rerender
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {

        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        console.log(lat, ' ' ,lng)
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div>
            <h1>
                My travel spots{" "}
                <span role="img" aria-label="tent">
          ⛺️
        </span>
            </h1>

            <Locate panTo={panTo} />
            <Search panTo={panTo} />

            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
                    <Marker
                        key = {marker.name}

                        // key={`${marker.lat}-${marker.lng}`}
                        position={{ lat: marker.lat, lng: marker.lng }}
                         onClick={() => {
                             setSelected(marker);
                         }}
                    />
                 ))}
                {selected ? (<InfoWindow position={{lat: selected.lat, lng:selected.lng}}
                    onCloseClick={() => setSelected(null)
                    }>
                    <div>
                    <h3>
                        {selected.name}
                        {console.log(selected.name)}
                    </h3>
                    </div>

                </InfoWindow>): null}

            </GoogleMap>
        </div>
    );
}

function Locate({ panTo }) {
    return (
        <button
            className="locate"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            <img src="/compass.svg" alt="compass" />
        </button>
    );
}

// requestOptions lets you prefer places near this location
function Search({ panTo }) {
    // returns a number of variables in an option or in an object that we can deconstruct the values from
    // ready tells us if the it is set up and ready to go
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832 },
            radius: 100 * 1000,
        },
    });

    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {

        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            console.log('address', results)
            const { lat, lng } = await getLatLng(results[0]);
            console.log('lat and lng', lat, lng)
            panTo({ lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <div className="search container">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                        data.map(({ id, description }) => (
                            <ComboboxOption key={id} value={description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}

export default SearchApi;