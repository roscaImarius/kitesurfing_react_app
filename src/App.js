import "./App.css";
import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Header from "./components/Header";

const BASE_URL = "https://605301db45e4b30017290936.mockapi.io/spot";

function App() {
  // data state
  const [spots, setSpots] = useState([]);
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: 400,
    latitude: 46.7577,
    longitude: 25.4376,
    zoom: 2.5,
    pitch: 40,
  });

  useEffect(() => {
    loadData();
  }, []);

  const markers = React.useMemo(
    () =>
      spots.map((spot) => (
        <Marker
          key={spot.id}
          latitude={parseFloat(spot.lat)}
          longitude={parseFloat(spot.long)}
          offsetTop={(-viewport.zoom * 5) / 2}
        >
          <img
            alt="map pointer"
            src="/marker.png"
            width={viewport.zoom * 5}
            heigth={viewport.zoom * 5}
          />
        </Marker>
      )),
    [spots]
  );

  const loadData = async () => {
    await fetch(BASE_URL)
      .then((response) => response.json())
      .then((recivedData) => setSpots(recivedData));
  };
  console.log(spots);
  return (
    <div className="App">
      <Header />
      {/* Mapbox  - displaying map */}
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={
          "pk.eyJ1IjoiaWhhdmVyZWFkIiwiYSI6ImNramFjcmh2djI3Z3Qyem5xdW0yeHBvdjIifQ.THAZaIzqTC_0w1bW_aAm7A"
        }
        {...viewport}
        onViewportChange={(newViewport) => setViewport(newViewport)}
      >
        {/* Displying pointers for each spot */}
        {markers}
      </ReactMapGL>

      <h5>Name Country Latitude, Longitude, Wind Probability When to go</h5>
      {spots.map((spot) => (
        <div key={spot.id}>
          {spot.name}, {spot.country}, {spot.lat}, {spot.long},
          {spot.probability}, {spot.month}
        </div>
      ))}
    </div>
  );
}

export default App;
