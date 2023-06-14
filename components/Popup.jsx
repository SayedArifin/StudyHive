import "./popup.css";

const Popup = ({ onClose, msg }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          x
        </button>
        <h1>{msg}</h1>
      </div>
    </div>
  );
};

export default Popup;
