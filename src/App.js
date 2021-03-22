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
  // console.log(allSpots);
  console.log(window.innerWidth);
  const [favoriteSpots, setFavoriteSpots] = useState(["1", "2"]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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
    const escListener = (e) => {
      if (e.key === "Escape") {
        setSelectedSpot(null);
      }
    };

    window.addEventListener("keyup", escListener);
    return () => {
      window.removeEventListener("keyup", escListener);
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
      allSpots.filter((spotsToFilter) => {
        if (
          spotsToFilter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          spotsToFilter.country.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return spotsToFilter;
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
    <div className="App ">
      <Header filteredSpots={filteredSpots} />
      <Mapbox
        favoriteSpots={favoriteSpots}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        filteredSpots={filteredSpots}
        selectedSpot={selectedSpot}
        setSelectedSpot={setSelectedSpot}
        viewport={viewport}
        setViewport={setViewport}
      />
      <div className="locationInput mt-2">
        <label htmlFor="locations">
          <h4>Locations</h4>
        </label>
        <br />
        <input
          type="text"
          name="locations"
          id="locations"
          placeholder="Search..."
          onChange={(event) => {
            handleOnChange(event.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <Table
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filteredSpots={filteredSpots}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        favoriteSpots={favoriteSpots}
      />
    </div>
  );
}

export default App;
