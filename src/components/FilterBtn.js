import React, { useState, useEffect } from "react";
import filterIcon from "../imgs/filter.png";
import Modal from "react-bootstrap/Modal";

export const FilterBtn = ({
  filteredSpots,
  setFilteredSpots,
  allSpots,
  setAllSpots,
}) => {
  const [showM, setShowM] = useState(false);
  const [tempSpots, setTempSpots] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [searchTermWind, setSearchTermWind] = useState("");
  const [searchTermCountry, setSearchTermCountry] = useState("");

  console.log(allSpots, filteredSpots);

  function handleFilters() {
    setShowM(true);
    setFilteredSpots(allSpots);
  }

  function handleCloseFilterModal() {
    setShowM(false);
  }

  function handleSubmitFilter() {
    handleCloseFilterModal();
  }

  useEffect(() => {
    setIsMounted(true);
    if (isMounted)
      setFilteredSpots(
        allSpots.filter((spotToFilter) => {
          return spotToFilter.probability.includes(searchTermWind.toString()) &&
            spotToFilter.country.includes(searchTermCountry)
            ? spotToFilter
            : false;
        })
      );
    return () => {
      setIsMounted(false);
    };
  }, [searchTermWind, searchTermCountry, setFilteredSpots]);

  // function handleChangeInputC(termCountry) {
  //   setFilteredSpots(
  //     tempSpots.filter((spotToFilter) => {
  //       if (spotToFilter.country.includes(termCountry)) {
  //         return spotToFilter;
  //       } else {
  //         return false;
  //       }
  //     })
  //   );
  // }

  return (
    <div>
      {/* FILTER MODAL */}
      <Modal
        onSubmit={handleSubmitFilter}
        className="modalFilter"
        show={showM}
        size="sm"
        onHide={handleCloseFilterModal}
        style={{ width: "200px", left: "45%", top: "5%" }}
      >
        <Modal.Body>
          {/* COUNTRY */}
          <div className="mb-3">
            <label htmlFor="filterCountry">
              <b> Country</b>
            </label>
            <br />
            <input
              type="text"
              id="searchTermCountry"
              placeholder="Spot Country"
              onChange={(e) => {
                // handleChangeFilter();
                setSearchTermCountry(e.target.value);
              }}
            />
          </div>
          {/* Wind */}
          <label htmlFor="windProb">
            <b> Wind Probability</b>
          </label>{" "}
          <br />
          <input
            className="mb-3"
            id="searchTermWind"
            type="number"
            placeholder="Wind"
            onChange={(e) => {
              // handleChangeFilter();
              setSearchTermWind(e.target.value);
            }}
          />
          <br />
          <button
            className="btn applyFbtn btn-light"
            onClick={() => handleSubmitFilter()}
          >
            APPLY FILTER
          </button>
        </Modal.Body>
      </Modal>

      <button
        className="filterBtn   mr-5 small"
        onClick={() => handleFilters()}
      >
        <img src={filterIcon} alt="filter icon" width="20" />
        FILTERS
      </button>
    </div>
  );
};
