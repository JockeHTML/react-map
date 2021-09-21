import React from "react";
import { InfoWindow } from "@react-google-maps/api";

const InfoWindowComponent = ({ setShowBusDetails, showBusDetails }) => {
  const removeShowBusDetails = () => {
    setShowBusDetails([]);
  };

  return (
    <InfoWindow
      onCloseClick={() => {
        removeShowBusDetails();
      }}
      position={{
        lat: showBusDetails.geometry.coordinates[1],
        lng: showBusDetails.geometry.coordinates[0],
      }}
    >
      <div>
        <h2>SKATEPARK NR: {showBusDetails.properties.PARK_ID}</h2>
        <h4>{showBusDetails.properties.NAME}</h4>
        <p>{showBusDetails.properties.DESCRIPTIO}</p>
      </div>
    </InfoWindow>
  );
};

export default InfoWindowComponent;
