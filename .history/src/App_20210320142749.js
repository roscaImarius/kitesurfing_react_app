import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { useState, useEffect } from "react";
// import { Marker } from "react-map-gl";
import Header from "./components/Header";
import Table from "./components/Table.js";
import { Mapbox } from "./components/Mapbox";

//Spots API
const BASE_URL = "https://605301db45e4b30017290936.mockapi.io";

function App() {
  //  states
  const [allSpots, setAllSpots] = useState([]);
  const [favoriteSpots, setFavoriteSpots] = useState(["1"]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: 400,
    latitude: 46.7577,
    longitude: 25.4376,
    zoom: 2.5,
    pitch: 40,
  });

  //Close popup when escape pushed
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedSpot(null);
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, []);

  //Loading data
  const loadData = async () => {
    await fetch(BASE_URL + "/spot")
      .then((response) => response.json())
      .then((receivedData) => {
        setAllSpots(receivedData);
        setFilteredSpots(receivedData);
      });
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleOnChange = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredSpots(allSpots);
    }
    setFilteredSpots(
      allSpots.filter((val) => {
        if (
          val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.country.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return val;
        }
        return false;
      })
    );
  };

  const addToFavorites = (spotId) => {
    setFavoriteSpots([...favoriteSpots, spotId]);
  };

  const removeFromFavorites = (spotId) => {
    setFavoriteSpots(favoriteSpots.filter((favSpotId) => favSpotId !== spotId));
  };

  return (
    <div className="App">
      <Header />
      <Mapbox
        spots={filteredSpots}
        setSelectedSpot={setSelectedSpot}
        setViewport={setViewport}
        viewport={viewport}
        selectedSpot={selectedSpot}
      />
      <label htmlFor="locations">
        <h2>Locations</h2>
      </label>
      <input
        type="text"
        name="locations"
        id="locations"
        placeholder="Search..."
        onChange={(event) => {
          handleOnChange(event.target.value);
        }}
      />
      <Table
        spots={filteredSpots}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        favoriteSpots={favoriteSpots}
      />
    </div>
  );
}

export default App;
