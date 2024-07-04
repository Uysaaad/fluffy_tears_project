import React, { useEffect } from "react";
import Spline from "@splinetool/react-spline";

const Garden = ({ gardenState }) => {
  useEffect(() => {
    // Handle garden state updates here (e.g., growing seeds, adding sun or water effects)
    console.log("Garden state updated:", gardenState);
  }, [gardenState]);

  return (
    <div className="w-full h-screen bg-none">
        <Spline
        scene="https://prod.spline.design/9FwmyjV2j5yQ7-cB/scene.splinecode" 
      />
    </div>
  );
};




export default Garden;
