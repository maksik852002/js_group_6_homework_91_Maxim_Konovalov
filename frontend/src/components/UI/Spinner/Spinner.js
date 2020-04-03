import React from "react";
import "./Spinner.css";

const Spinner = () => (
  <div
    style={{
      position: "absolute",
      top: "45%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}
  >
    <div className="Spinner">Loading...</div>
  </div>
);

export default Spinner;
