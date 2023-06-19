import { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    const notifyOnSuccess = () => {
      toast.success("Payment Successfull, Enjoy our all course", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      notifyOnSuccess();
    };
  }, []);

  return (
    <div>
      <Course />
    </div>
  );
};

export default Success;
