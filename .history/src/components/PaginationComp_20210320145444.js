import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

const PaginationComp = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];
    for (let i = 1; i < totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  }, [totalPages, currentPage]);

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
