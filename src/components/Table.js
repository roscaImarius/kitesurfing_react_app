import React from "react";

const Table = ({ spots, searchTerm, setSearchTerm }) => {
  return (
    <div>
      <label htmlFor="locations">
        <h2>Locations</h2>
      </label>
      <input
        type="text"
        name="locations"
        id="locations"
        placeholder="Search..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <h5>Name Country Latitude, Longitude, Wind Probability When to go</h5>
      {spots
        .filter((val) => {
          if (searchTerm == "") {
            return val;
          } else if (
            val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.country.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        })
        .map((spot) => (
          <div key={spot.id}>
            {spot.name}, {spot.country}, {spot.lat}, {spot.long},
            {spot.probability}, {spot.month}
          </div>
        ))}
    </div>
  );
};

export default Table;
