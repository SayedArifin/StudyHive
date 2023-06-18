import { RingLoader } from "react-spinners";

const Loading = () => {
  const loaderContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <div style={loaderContainerStyle}>
      <RingLoader color=" #000099" size={80} />
    </div>
  );
};

export default Loading;
