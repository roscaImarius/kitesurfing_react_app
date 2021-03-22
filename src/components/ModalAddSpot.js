import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
// import ReactMapGL, { Marker } from "react-map-gl";
import Axios from "axios";

export default function ModalAddSpot({ show, filteredSpots, handleClose }) {
  //   const [viewport, setViewport] = useState({
  //     width: 260,
  //     height: 300,
  //     latitude: 46.7577,
  //     longitude: 25.4376,
  //     zoom: 2.5,
  //     pitch: 40,
  //   });

  const url = "https://605301db45e4b30017290936.mockapi.io/spot";
  const [newSpot, setNewSpot] = useState({
    name: "",
    country: "",
    lat: "",
    long: "",
    month: "",
  });

  function handleNewSpot(e) {
    const newSpott = { ...filteredSpots };
    newSpott[e.target.id] = e.target.value;
    setNewSpot(newSpott);
    console.log(newSpott);
  }

  function handleSubmit(e) {
    e.preventDefault();
    Axios.post(url, {
      name: newSpot.name,
      country: newSpot.country,
      lat: "",
      long: "",
      month: newSpot.month,
    }).then((res) => {
      console.log(res.data);
    });
  }
  return (
    <div className="modal">
      <Modal show={show} onHide={handleClose}>
        <form>
          <input
            type="text"
            id="name"
            value={newSpot.name}
            onChange={(e) => handleNewSpot(e)}
          ></input>
          <input
            type="text"
            id="country"
            value={newSpot.country}
            onChange={(e) => handleNewSpot(e)}
          ></input>

          <input
            className="mb-2"
            id="month"
            value={newSpot.month}
            onChange={(e) => handleNewSpot(e)}
            type="date"
          ></input>
          <button onClick={(e) => handleSubmit(e)}>OK</button>
        </form>
      </Modal>
    </div>
  );
}

//  <Modal
//    // dialogClassName="modal-50w"
//    show={show}
//    size="sm"
//    onHide={handleClose}
//  >
//    <Modal.Header>
//      <Modal.Title>
//        <h5>Add Spot</h5>
//      </Modal.Title>
//    </Modal.Header>
//    <Modal.Body>
//      <label htmlFor="spotName">
//        <b> Name</b>
//      </label>
//      <br />
//      <input
//        type="text"
//        id="name"
//        value={newSpot.name}
//        placeholder="Spot Name"
//        onChange={(e) => handleNewSpot(e)}
//      />

//      <div className="mt-3 ">
//        <label htmlFor="spotCountry">
//          <b> Country</b>
//        </label>
//        <br />
//        <input
//          type="text"
//          id="country"
//          value={newSpot.country}
//          placeholder="Spot Country"
//          onChange={(e) => handleNewSpot(e)}
//        />
//      </div>
//      <p className="mt-3 mb-1">
//        <b>High Seasson</b>
//      </p>
//      <input
//        className="mb-2"
//        id="month"
//        value={newSpot.month}
//        onChange={(e) => handleNewSpot(e)}
//        type="date"
//      />

//      {/* SMALL MAP*/}
//      <ReactMapGL
//        className="smallMapbox"
//        mapStyle="mapbox://styles/mapbox/dark-v9"
//        mapboxApiAccessToken={
//          "pk.eyJ1IjoiaWhhdmVyZWFkIiwiYSI6ImNramFjcmh2djI3Z3Qyem5xdW0yeHBvdjIifQ.THAZaIzqTC_0w1bW_aAm7A"
//        }
//        {...viewport}
//        onViewportChange={(newViewport) => setViewport(newViewport)}
//      ></ReactMapGL>
//    </Modal.Body>
//    <Modal.Footer>
//      <button>CANCEL</button>
//      <button onClick={(e) => handleSubmit(e)}>OK</button>
//    </Modal.Footer>
//  </Modal>;
