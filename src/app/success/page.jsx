"use client";
import { useEffect } from "react";
import Course from "../course/page";
import { toast } from "react-toastify";

const Success = () => {
  const notifyOnSuccess = () => {
    toast.success("Payment Successfull", {
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
      <Course />
    </div>
  );
};

export default Success;
