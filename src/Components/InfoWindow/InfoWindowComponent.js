import React from "react";
import { InfoWindow } from "@react-google-maps/api";

const InfoWindowComponent = (props) => {
  return (
    <InfoWindow
      onCloseClick={() => {
        props.removeShowBusDetails();
      }}
      position={{
        lat: props.showBusDetails.geometry.coordinates[1],
        lng: props.showBusDetails.geometry.coordinates[0],
      }}
    >
      <div>
        <h2>SKATEPARK NR: {props.showBusDetails.properties.PARK_ID}</h2>
        <h4>{props.showBusDetails.properties.NAME}</h4>
        <p>{props.showBusDetails.properties.DESCRIPTIO}</p>
      </div>
    </InfoWindow>
  );
};

export default InfoWindowComponent;
