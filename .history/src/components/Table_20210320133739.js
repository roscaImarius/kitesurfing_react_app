import React from "react";
import PaginationComp from "./PaginationComp";
import TableHeader from "./TableHeader";

const Table = ({
  spots,
  removeFromFavorites,
  addToFavorites,
  favoriteSpots,
}) => {
  return (
    <div>
      <PaginationComp />
      <TableHeader />
      <h5>Name Country Latitude, Longitude, Wind Probability When to go</h5>
      {spots.map((spot) => (
        <div key={spot.id}>
          {favoriteSpots.includes(spot.id) ? null : <span>nu e favorite</span>}
          {favoriteSpots.includes(spot.id) ? (
            <button onClick={() => removeFromFavorites(spot.id)}>Remove</button>
          ) : (
            <button onClick={() => addToFavorites(spot.id)}>Add</button>
          )}
          {spot.id},{spot.name}, {spot.country}, {spot.lat}, {spot.long},
          {spot.probability}, {spot.month}
        </div>
      ))}
    </div>
  );
};

export default Table;
