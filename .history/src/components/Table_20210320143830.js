import React, { useMemo } from "react";
import PaginationComp from "./PaginationComp";
import TableHeader from "./TableHeader";
// import ReactTable from "react-table";

const Table = ({
  spots,
  removeFromFavorites,
  addToFavorites,
  favoriteSpots,
}) => {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const headers = [
    { name: "Name", field: "name", sortable: false },
    { name: "Country ", field: "country", sortable: true },
    { name: "Latitude", field: "lat", sortable: true },
    { name: "Longitude", field: "long", sortable: false },
    { name: "Wind Prob.", field: "probability", sortable: false },
    { name: "When to go", field: "month", sortable: false },
    { name: "Favorite", field: "fav", sortable: false },
  ];

  const spotDate = useMemo(() => {
    let computedSpot = spots;

    return computedSpot;
  }, [spots]);

  return (
    <div className="m-5">
      <PaginationComp />
      <table className="table table-striped">
        <TableHeader headers={headers} />
        <tbody>
          {spotDate.map((spot) => (
            <tr key={spot.id}>
              <td>{spot.name}</td>
              <td>{spot.country}</td>
              <td>{spot.lat}</td>
              <td>{spot.long}</td>
              <td>{spot.probability}</td>
              <td>{spot.month}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
