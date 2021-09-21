import React, { useState } from "react";
import { data } from "../../data/data";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { mapContainerStyle, options, center } from "./MapStyles";
import MarkerComponent from "../Marker/MarkerComponent";
import InfoWindowComponent from "../InfoWindow/InfoWindowComponent";
import Search from "../Search/Search";

const libraries = ["places"];

function MyComponent() {
  //<----------DETAILS STATE---------->
  const [showBusDetails, setShowBusDetails] = useState([]);

  //<----------USE LOAD SCRIPT HOOK & API KEY---------->
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  //<----------REF TO THE ACTUAL MAP---------->
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  //<----------PAN TO FUNCTION WITH LAT & LNG---------->
  //picking up the coordinates send from my search
  const panTo = React.useCallback((cord) => {
    console.log(cord);
  }, []);

  //<----------LOADING CHECK---------->
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={options}
      onLoad={onMapLoad}
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
          showBusDetails={showBusDetails}
          setShowBusDetails={setShowBusDetails}
        />
      ) : null}
    </GoogleMap>
  );
}

export default MyComponent;
