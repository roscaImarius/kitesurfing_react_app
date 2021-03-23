import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ReactMapGL from "react-map-gl";
import Axios from "axios";

export default function ModalAddSpot({
  show,
  setShow,
  newSpot,
  setNewSpot,
  loadData,
  handleClose,
}) {
  const [viewport, setViewport] = useState({
    width: 260,
    height: 300,
    latitude: 46.7577,
    longitude: 25.4376,
    zoom: 2.5,
    pitch: 40,
  });
  const url = "https://605301db45e4b30017290936.mockapi.io/spot";

  function handleNewSpot(e) {
    const newSpott = { ...newSpot };
    if (isNaN(newSpott[e.target.id])) {
      newSpott[e.target.id] =
        e.target.value[0].toUpperCase() + e.target.value.substring(1);
    } else {
      newSpott[e.target.id] = e.target.value;
    }
    setNewSpot(newSpott);
    // console.log(newSpott);
  }

  function handleSubmit(e) {
    e.preventDefault();

    Axios.post(url, {
      name: newSpot.name,
      country: newSpot.country,
      lat: newSpot.lat,
      long: newSpot.long,
      month: newSpot.month,
    }).then((res) => {
      //   console.log(res.data);
      loadData();
      handleClose();
    });
    setNewSpot({
      name: "",
      country: "",
      lat: "",
      long: "",
      month: "",
    });
  }

  return (
    <div className="modal">
      <Modal
        // dialogClassName="modal-50w"
        show={show}
        size="sm"
        onHide={handleClose}
        onSubmit={handleSubmit}
      >
        <Modal.Body>
          <h5>Add Spot</h5>
          {/* NAME */}
          <label htmlFor="spotName">
            <b> Name</b>
          </label>
          <br />
          <input
            type="text"
            id="name"
            value={newSpot.name}
            placeholder="Spot Name"
            onChange={(e) => handleNewSpot(e)}
          />

          {/* COUNTRY */}
          <div className="mt-2 ">
            <label htmlFor="spotCountry">
              <b> Country</b>
            </label>
            <br />
            <input
              type="text"
              id="country"
              value={newSpot.country}
              placeholder="Spot Country"
              onChange={(e) => handleNewSpot(e)}
            />
          </div>

          {/* DATE */}
          <p className="mt-2 mb-1">
            <b>High Seasson</b>
          </p>
          <input
            className="mb-1 mb-1"
            id="month"
            value={newSpot.month}
            onChange={(e) => handleNewSpot(e)}
            type="date"
          />

          {/* Longitude */}
          <p className="mt-2 mb-1">
            <b>Longitude</b>
          </p>
          <input
            className="mb-1"
            id="long"
            value={
              newSpot.long >= -180 && newSpot.long <= 180 ? newSpot.long : ""
            }
            onChange={(e) => handleNewSpot(e)}
            type="number"
          />

          {/* Latitude */}
          <p className="mt-1 mb-1">
            <b>Latitude</b>
          </p>
          <input
            className="mb-2"
            id="lat"
            value={newSpot.lat > -84.5 && newSpot.lat <= 85 ? newSpot.lat : ""}
            onChange={(e) => handleNewSpot(e)}
            type="number"
          />

          {/* SMALL MAP*/}
          <ReactMapGL
            className="smallMapbox"
            mapStyle="mapbox://styles/mapbox/dark-v9"
            mapboxApiAccessToken={
              "pk.eyJ1IjoiaWhhdmVyZWFkIiwiYSI6ImNramFjcmh2djI3Z3Qyem5xdW0yeHBvdjIifQ.THAZaIzqTC_0w1bW_aAm7A"
            }
            {...viewport}
            onViewportChange={(newViewport) => setViewport(newViewport)}
          ></ReactMapGL>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <button className="btnF" onClick={() => handleClose()}>
            CANCEL
          </button>
          <button className="btnF" onClick={(e) => handleSubmit(e)}>
            OK
          </button>
        </Modal.Footer>
      </Modal>
      ;
    </div>
  );
}
