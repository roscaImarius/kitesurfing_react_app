import React from "react";

const TableHeader = ({ headers }) => {
  return (
    <>
      <thead>
        <tr>
          {headers.map((item) => (
            <th key={item.name}>{item.name}</th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;
