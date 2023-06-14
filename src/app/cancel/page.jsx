"use client";
import React, { useState } from "react";
import Popup from "../../../components/Popup";
import Home from "../page";

const Cancel = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <div>
      <Home />
      {isPopupOpen && (
        <Popup msg="you have canceled the payment" onClose={closePopup} />
      )}
    </div>
  );
};

export default Cancel;
