import React from "react";
import { Marker } from "@react-google-maps/api";

const MarkerComponent = (props) => {
  return (
    <Marker
      position={{
        lat: props.geometry.coordinates[1],
        lng: props.geometry.coordinates[0],
      }}
      icon={{
        url: "/bus.png",
        scaleSize: new window.google.maps.Size(20, 20),
        anchor: new window.google.maps.Point(20, 20),
      }}
      onClick={() => props.setShowBusDetails(props)}
    />
  );
};

export default MarkerComponent;
