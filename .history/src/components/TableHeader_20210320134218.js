import React from "react";

const TableHeader = ({ headers }) => {
  return (
    <>
      <thead>
        <tr>
          {headers.map((item) => {
            <th>{item.name}</th>;
          })}
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;
