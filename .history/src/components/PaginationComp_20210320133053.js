import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComp = () => {
  return (
    <div>
      <Pagination>
        <Pagination.Prev />
        <Pagination.Item>1</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    </div>
  );
};

export default PaginationComp;
