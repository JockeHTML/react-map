import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { data } from "../../data/data";
import { mapContainerStyle, options, center } from "./MapStyles";
import MarkerComponent from "../Marker/MarkerComponent";
import InfoWindowComponent from "../InfoWindow/InfoWindowComponent";
import Search from "../Search/Search";

function MyComponent() {
  //<----------STATE---------->
  const [map, setMap] = useState([]);
  const [showBusDetails, setShowBusDetails] = useState([]);

  //<----------ONLOAD, UNMOUNT & API---------->
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  const removeShowBusDetails = React.useCallback(
    () => setShowBusDetails([]),
    []
  );

  //<----------REF TO THE MAP---------->
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  });

  const [latLng, setLatLng] = useState({
    lat: null,
    lng: null,
  });
  const panTo = (lat) => {
    setLatLng(() => {
      return { lat: lat[0], lng: lat[1] };
    });
    map.panTo(latLng);
    map.setCenter(latLng);
  };

  //<----------ONLOAD CHECKER---------->
  if (!isLoaded) {
    return <h1>Loading Map...</h1>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={{ lat: 45.4211, lng: -75.6903 }}
      zoom={10}
      onLoad={onLoad}
      options={options}
      onUnmount={onUnmount}
    >
      <Search panTo={panTo} />
      {data.features.map((data) => {
        return (
          <MarkerComponent
            key={data.properties.PARK_ID}
            setShowBusDetails={setShowBusDetails}
            {...data}
          />
        );
      })}

      {showBusDetails.length !== 0 ? (
        <InfoWindowComponent
          removeShowBusDetails={removeShowBusDetails}
          showBusDetails={showBusDetails}
        />
      ) : null}
    </GoogleMap>
  ) : (
    <>
      <h1>Error with loading map...</h1>
    </>
  );
}

export default MyComponent;
