import React, { useState, useRef, useEffect } from "react";
import filterIcon from "../imgs/filter.png";
import Modal from "react-bootstrap/Modal";

export const FilterBtn = ({
  viewport,
  setViewPort,
  filteredSpots,
  setFilteredSpots,
  allSpots,
  setAllSpots,
}) => {
  const [showM, setShowM] = useState(false);
  const [searchTermWind, setSearchTermWind] = useState("");
  const [searchTermCountry, setSearchTermCountry] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const allSpotsRef = useRef(allSpots);
  const isMountedRef = useRef(isMounted);

  useEffect(() => {
    allSpotsRef.current = allSpots;
    isMountedRef.current = isMounted;
  });

  function handleFilters() {
    setShowM(true);
    setFilteredSpots(allSpots);
  }

  function handleCloseFilterModal() {
    setShowM(false);
    setFilteredSpots(allSpots);
  }

  function handleSubmitFilter() {
    handleCloseFilterModal();
  }

  useEffect(() => {
    setIsMounted(true);
    if (isMountedRef.current)
      setFilteredSpots(
        allSpotsRef.current.filter((spotToFilter) => {
          return spotToFilter.probability
            .toString()
            .includes(searchTermWind.toString()) &&
            spotToFilter.country
              .toLowerCase()
              .includes(searchTermCountry.toLowerCase())
            ? spotToFilter
            : false;
        })
      );
    return () => {
      setIsMounted(false);
    };
  }, [searchTermWind, searchTermCountry, setFilteredSpots]);

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
