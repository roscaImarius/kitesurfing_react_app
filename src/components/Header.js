import React, { useState } from "react";
import ModalAddSpot from "./ModalAddSpot";
const Header = ({ filteredSpots }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <ModalAddSpot
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
