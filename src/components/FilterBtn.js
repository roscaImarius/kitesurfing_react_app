import React, { useState } from "react";
import filterIcon from "../imgs/filter.png";
import Modal from "react-bootstrap/Modal";

export const FilterBtn = ({
  filteredSpots,
  allSpots,
  setAllSpots,
  setFilteredSpots,
}) => {
  const [showM, setShowM] = useState(false);
  const [searchTermCountry, setSearchTermCountry] = useState("");
  const [searchTermWind, setSearchTermWind] = useState("");

  function handleFilters() {
    setShowM(true);
    setSearchTermCountry("");
    setSearchTermWind("");
  }
  function handleCloseFilterModal() {
    setShowM(false);
  }

  function handleSubmitFilter() {
    handleCloseFilterModal();
  }

  function handleChangeInputF(e) {
    e.target.id === "searchTermCountry"
      ? setSearchTermCountry(e.target.value)
      : setSearchTermWind(e.target.value);

    if (searchTermCountry !== "" || searchTermWind !== "") {
      setFilteredSpots(
        allSpots.filter((spotToFilter) => {
          if (
            spotToFilter.country.includes(searchTermCountry) &&
            spotToFilter.probability.includes(searchTermWind)
          ) {
            return spotToFilter;
          } else {
            return false;
          }
        })
      );
    }
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
        // onSubmit={handleSubmit}
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
              onChange={(e) => handleChangeInputF(e)}
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
            onChange={(e) => handleChangeInputF(e)}
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
