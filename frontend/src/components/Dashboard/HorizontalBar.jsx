import React from "react";

const HorizontalBar = ({ label, probability }) => {
  const barStyle = {
    width: `${probability * 100}%`,
    backgroundColor: "#4caf50",
    height: "10px",
    borderRadius: "5px",
  };

  return (
    <div className="horizontal-bar-container mb-[10px]">
      <span className="label mr-[10px] text-sm">
        {label}
      </span>
      <div
        className="bar-background"
        style={{ width: "100%", backgroundColor: "#ddd", borderRadius: "5px" }}
      >
        <div className="bar" style={barStyle}></div>
      </div>
    </div>
  );
};

export default HorizontalBar;
