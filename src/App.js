import React from "react";
import "./styles/app.css";
import Map from "./Components/GoogleMap/Map";

function App() {
  return (
    <div className="App">
      <img className="logo" src="/logo.png" alt="" />
      <Map />
    </div>
  );
}

export default App;
