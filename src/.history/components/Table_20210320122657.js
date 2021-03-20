import React from "react";

const Table = ({ spots, favoriteSpots }) => {
  return (
    <div>
      <h5>Name Country Latitude, Longitude, Wind Probability When to go</h5>
      {spots.map((spot) => (
        <div key={spot.id}>
          {if(favoriteSpots.includes(spot.id))}
          {spot.name}, {spot.country}, {spot.lat}, {spot.long},
          {spot.probability}, {spot.month}
        </div>
      ))}
    </div>
  );
};

export default Table;
