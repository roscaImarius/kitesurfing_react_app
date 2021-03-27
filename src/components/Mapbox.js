import React from "react";
import ReactMapGL, { Popup, Marker } from "react-map-gl";
import starOff from "../imgs/star-off.png";
import starOn from "../imgs/star-on.png";
import { FilterBtn } from "./FilterBtn";

export const Mapbox = ({
  allSpots,
  setAllSpots,
  filteredSpots,
  setFilteredSpots,
  addToFavorites,
  removeFromFavorites,
  favoriteSpots,
  selectedSpot,
  setSelectedSpot,
  setViewport,
  viewport,
}) => {
  // console.log(allSpots);
  const markers = React.useMemo(
    () =>
      filteredSpots.map((spot) => (
        <Marker
          key={spot.id}
          latitude={Number(spot.lat)}
          longitude={Number(spot.long)}
          offsetTop={(-viewport.zoom * 5) / 2}
        >
          <button
            className="spotBtn"
            onClick={(e) => {
              e.preventDefault();
              setSelectedSpot(spot);
            }}
          >
            {favoriteSpots.includes(spot.id) ? (
              <img
                alt="map pointer"
                src="markerGreen.png"
                width={viewport.zoom * 10}
                heigth={viewport.zoom * 10}
              />
            ) : (
              <img
                alt="map pointer"
                src="marker.png"
                width={viewport.zoom * 8}
                heigth={viewport.zoom * 8}
              />
            )}
          </button>
        </Marker>
      )),
    [filteredSpots, favoriteSpots, viewport.zoom, setSelectedSpot]
  );

  return (
    <div>
      <FilterBtn
        filteredSpots={filteredSpots}
        setFilteredSpots={setFilteredSpots}
        allSpots={allSpots}
        setAllSpots={setAllSpots}
      />
      {/* Display map - Mapbox */}
      <ReactMapGL
        className="mapbox"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={
          "pk.eyJ1IjoiaWhhdmVyZWFkIiwiYSI6ImNramFjcmh2djI3Z3Qyem5xdW0yeHBvdjIifQ.THAZaIzqTC_0w1bW_aAm7A"
        }
        {...viewport}
        onViewportChange={(newViewport) => {
          newViewport.width = "98%";
          return setViewport(newViewport);
        }}
      >
        {/* Displying pointers for each spot */}
        {markers}

        {/* Displaying popups */}
        {selectedSpot ? (
          <Popup
            closeOnClick={false}
            latitude={parseFloat(selectedSpot.lat)}
            longitude={parseFloat(selectedSpot.long)}
            className="popup"
            onClose={() => setSelectedSpot(null)}
          >
            <div className="d-flex">
              <h4>
                <b>{selectedSpot.name}</b>
              </h4>
              {favoriteSpots.includes(selectedSpot.id) ? (
                <img className="starOn" src={starOn} alt="starOnIcon"></img>
              ) : (
                <img className="starOff" src={starOff} alt="starOffIcon"></img>
              )}
            </div>
            <p className="mb-2 ">
              <b>{selectedSpot.country}</b>
            </p>
            <p> Wind prob:</p>
            <p className="mb-2">{selectedSpot.probability}</p>
            <p>LATITUDE</p>
            <p className="mb-2">{selectedSpot.lat}</p>
            <p>LONGITUDE:</p>
            <p className="mb-2">{selectedSpot.long}</p>
            <p>When to go:</p>
            <p> {selectedSpot.month}</p>
            {favoriteSpots.includes(selectedSpot.id) ? (
              <button
                onClick={() => removeFromFavorites(selectedSpot.id)}
                className="btn-danger favBtn"
              >
                <p>
                  <small>REMOVE FROM FAVORITES</small>
                </p>
              </button>
            ) : (
              <button
                onClick={() => addToFavorites(selectedSpot.id)}
                className="btn-success favBtn"
              >
                <p>
                  <small>ADD TO FAVORITES</small>
                </p>
              </button>
            )}
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};
