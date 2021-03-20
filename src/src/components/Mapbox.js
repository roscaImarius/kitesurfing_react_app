import React from "react";
import ReactMapGL, { Popup, Marker } from "react-map-gl";

export const Mapbox = ({
  spots,
  selectedSpot,
  setSelectedSpot,
  setViewport,
  viewport,
}) => {
  const markers = React.useMemo(
    () =>
      spots.map((spot) => (
        <Marker
          key={spot.id}
          latitude={parseFloat(spot.lat)}
          longitude={parseFloat(spot.long)}
          offsetTop={(-viewport.zoom * 5) / 2}
        >
          <button
            className="spotBtn"
            onClick={(e) => {
              e.preventDefault();
              setSelectedSpot(spot);
            }}
          >
            <img
              alt="map pointer"
              src="/marker.png"
              width={viewport.zoom * 8}
              heigth={viewport.zoom * 8}
            />
          </button>
        </Marker>
      )),
    [spots, viewport.zoom, setSelectedSpot]
  );

  return (
    <div>
      {/* Display map - Mapbox */}
      <ReactMapGL
        className="mapbox"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={
          "pk.eyJ1IjoiaWhhdmVyZWFkIiwiYSI6ImNramFjcmh2djI3Z3Qyem5xdW0yeHBvdjIifQ.THAZaIzqTC_0w1bW_aAm7A"
        }
        {...viewport}
        onViewportChange={(newViewport) => setViewport(newViewport)}
      >
        {/* Displying pointers for each spot */}
        {markers}

        {/* Displaying popups */}
        {selectedSpot ? (
          <Popup
            latitude={parseFloat(selectedSpot.lat)}
            longitude={parseFloat(selectedSpot.long)}
            className="popup"
            onClose={() => setSelectedSpot(null)}
          >
            <h4>{selectedSpot.name}</h4>
            <h5>{selectedSpot.country}</h5>
            <p>Wind prob: {selectedSpot.probability}</p>
            <p>LATITUDE</p>
            {selectedSpot.lat}
            <p>LONGITUDE:</p>
            {selectedSpot.long}
            <p>When to go: {selectedSpot.month}</p>
            <button>ADD TO FAVORITES</button>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};
