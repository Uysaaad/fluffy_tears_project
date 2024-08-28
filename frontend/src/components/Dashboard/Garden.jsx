import React, { useEffect } from "react";
import Spline from "@splinetool/react-spline";
import ReactAudioPlayer from "react-audio-player";


const Garden = ({ gardenState }) => {
  useEffect(() => {
    // Handle garden state updates here (e.g., growing seeds, adding sun or water effects)
    console.log("Garden state updated:", gardenState);
  }, [gardenState]);

  return (
    <div className="w-full h-screen bg-none">
      
      <Spline scene="https://prod.spline.design/pw5jjdlxhSwFGoCK/scene.splinecode" />
    </div>
  );
};




export default Garden;
