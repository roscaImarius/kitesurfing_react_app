import React, { useMemo } from "react";
import PaginationComp from "./PaginationComp";
import TableHeader from "./TableHeader";

const Table = ({
  spots,
  removeFromFavorites,
  addToFavorites,
  favoriteSpots,
}) => {
  const headers = [
    { name: "Name", field: "name", sortable: false },
    { name: "Country ", field: "country", sortable: true },
    { name: "Latitude", field: "lat", sortable: true },
    { name: "Longitude", field: "long", sortable: false },
    { name: "Wind Prob.", field: "probability", sortable: false },
    { name: "When to go", field: "month", sortable: false },
  ];

  const spotDate = useMemo(() => {
    let computedSpot = spots;

    return computedSpot;
  }, [spots]);

  return (
    <div>
      <PaginationComp />
      <table className="table table-striped">
        <TableHeader headers={headers} />
        <tbody>
          {spotDate.map((spot) => (
            <tr key={spot.id}>
              <td>
                {favoriteSpots.includes(spot.id) ? null : (
                  <span>nu e favorite</span>
                )}
                {favoriteSpots.includes(spot.id) ? (
                  <button onClick={() => removeFromFavorites(spot.id)}>
                    Remove
                  </button>
                ) : (
                  <button onClick={() => addToFavorites(spot.id)}>Add</button>
                )}
              </td>

              <td>{spot.name}</td>
              <td>{spot.country}</td>
              <td>{spot.lat}</td>
              <td>{spot.long}</td>
              <td>{spot.probability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
