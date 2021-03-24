import React, { useState } from "react";
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
  function handleFilters() {
    setShowM(true);
    setTempSpots(allSpots);
  }
  function handleCloseFilterModal() {
    setShowM(false);
  }

  function handleSubmitFilter() {
    handleCloseFilterModal();
  }

  function handleChangeInputW(termWind) {
    setFilteredSpots(
      tempSpots.filter((spotToFilter) => {
        return spotToFilter.probability.includes(termWind.toString())
          ? spotToFilter
          : false;
      })
    );
  }

  function handleChangeInputC(termCountry) {
    setFilteredSpots(
      tempSpots.filter((spotToFilter) => {
        if (spotToFilter.country.includes(termCountry)) {
          return spotToFilter;
        } else {
          return false;
        }
      })
    );
  }

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
                handleChangeInputC(e.target.value);
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
              handleChangeInputW(e.target.value);
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
