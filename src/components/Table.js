import React, { useMemo, useState } from "react";
import PaginationComp from "./PaginationComp";
import TableHeader from "./TableHeader";
// import ReactTable from "react-table";

const Table = ({
  filteredSpots,
  currentPage,
  allSpots,
  setCurrentPage,
  removeFromFavorites,
  addToFavorites,
  favoriteSpots,
}) => {
  const [totalItems, setTotalItems] = useState(0);
  const [sorting, setSorting] = useState({ field: "", order: "asc" });
  const ITEMS_PER_PAGE = 10;

  const headers = [
    { name: "Name", field: "name", sortable: true },
    { name: "Country ", field: "country", sortable: true },
    { name: "Latitude", field: "lat", sortable: true },
    { name: "Longitude", field: "long", sortable: true },
    { name: "Wind Prob.", field: "probability", sortable: true },
    { name: "When to go", field: "month", sortable: true },
    // { name: "Favorite", field: "fav", sortable: false },
  ];

  const spotData = useMemo(() => {
    let computedSpots = filteredSpots;
    // let computedSpots = allSpots;

    setTotalItems(computedSpots.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedSpots = computedSpots.sort((a, b) => {
        if (isNaN(a[sorting.field])) {
          return reversed * (a[sorting.field] > b[sorting.field] ? 1 : -1);
        } else {
          return (
            reversed *
            (parseFloat(a[sorting.field]) > parseFloat(b[sorting.field])
              ? 1
              : -1)
          );
        }
      });
    }

    //Page slice
    return computedSpots.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [filteredSpots, currentPage, sorting]);

  return (
    <div className="m-3 tableContainer">
      <PaginationComp
        total={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <table className="table table-striped">
        <TableHeader
          headers={headers}
          onSorting={(field, order) => setSorting({ field, order })}
        />
        <tbody>
          {spotData.map((spot) => (
            <tr key={spot.id}>
              <td>{spot.name}</td>
              <td>{spot.country}</td>
              <td>{spot.lat}</td>
              <td>{spot.long}</td>
              <td>{spot.probability}</td>
              <td>{spot.month}</td>
              {/* <td>
                {favoriteSpots.includes(spot.id) ? " fav" : "not fav"}
                {favoriteSpots.includes(spot.id) ? (
                  <button onClick={() => removeFromFavorites(spot.id)}>
                    Remove
                  </button>
                ) : (
                  <button onClick={() => addToFavorites(spot.id)}>Add</button>
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
