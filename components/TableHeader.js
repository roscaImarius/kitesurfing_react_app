import React, { useState } from "react";

const TableHeader = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <>
      <thead>
        <tr>
          {headers.map(({ name, field, sortable }) => (
            <th
              className="thBtn"
              key={name}
              onClick={() => {
                return sortable ? onSortingChange(field) : null;
              }}
            >
              {name}
              {sortingField &&
                sortingField === field &&
                (sortingOrder === "asc" ? (
                  <i className="fa fa-arrow-up"></i>
                ) : (
                  <i className="fa fa-arrow-down"></i>
                ))}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;
