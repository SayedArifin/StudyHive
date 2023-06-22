"use client";
import { useEffect } from "react";
import Course from "../course/page";
import { toast } from "react-toastify";

const Success = () => {
  const notifyOnSuccess = () => {
    toast.success("Payment Successful", {
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
  useEffect(() => {
    document.title = `Payment Successful`;
  }, []);

  return (
    <div>
      <Course />
    </div>
  );
};

export default Success;
