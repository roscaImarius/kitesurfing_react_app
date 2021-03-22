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
        <div>Kite</div>
        <button className="small btn-info" onClick={() => handleShow()}>
          ADD SPOT
        </button>
      </div>
    </>
  );
};

export default Header;
