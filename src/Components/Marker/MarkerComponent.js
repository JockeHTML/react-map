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
        scaleSize: new window.google.maps.Size(0, 0),
        anchor: new window.google.maps.Point(15, 0),
      }}
      onClick={() => props.panTo(props)}
    />
  );
};

export default MarkerComponent;
