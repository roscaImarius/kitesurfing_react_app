import React, { useState } from "react";
import ModalAddSpot from "./ModalAddSpot";
const Header = ({ filteredSpots, loadData }) => {
  const [show, setShow] = useState(false);
  const [newSpot, setNewSpot] = useState({
    name: "",
    country: "",
    lat: "",
    long: "",
    month: "",
  });
  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setNewSpot({
      name: "",
      country: "",
      lat: "",
      long: "",
      month: "",
    });
  };

  return (
    <>
      <ModalAddSpot
        newSpot={newSpot}
        setNewSpot={setNewSpot}
        loadData={loadData}
        show={show}
        filteredSpots={filteredSpots}
        handleClose={handleClose}
      />
      <div className="header">
        <h3>Kite</h3>
        <div>
          <button
            className="addSpotBtn small mr-3 btn-primary"
            onClick={() => handleShow()}
          >
            ADD SPOT
          </button>
          <button className=" logIn ">
            <i className=" fa fa-user-circle-o" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
