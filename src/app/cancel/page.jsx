"use client";
import { useEffect } from "react";
import Pricing from "../pricing/page";
import { toast } from "react-toastify";

const Success = () => {
  const notifyOnSuccess = () => {
    toast.warn("Payment Cancelled", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  useEffect(() => {
    notifyOnSuccess();
  }, []);

  return (
    <div>
      <Pricing />
    </div>
  );
};

export default Success;
