import React, { useEffect } from "react";
import "./DarkBubblePage.scss"

const DarkBubblePage = () => {
  // useEffect(() => {
  //   const interBubble = document.querySelector(".interactive");
  //   let curX = 0;
  //   let curY = 0;
  //   let tgX = 0;
  //   let tgY = 0;

  //   function move() {
  //     curX += (tgX - curX) / 20;
  //     curY += (tgY - curY) / 20;
  //     interBubble.style.transform = `translate(${Math.round(
  //       curX
  //     )}px, ${Math.round(curY)}px)`;
  //     requestAnimationFrame(move);
  //   }

  //   window.addEventListener("mousemove", (event) => {
  //     tgX = event.clientX;
  //     tgY = event.clientY;
  //   });

  //   move();

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     window.removeEventListener("mousemove", () => {});
  //   };
  // }, []);

  useEffect(() => {
    function generateNoiseTexture() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let x = 0; x < width; x += 1) {
        for (let y = 0; y < height; y += 1) {
          const i = 4 * (x + y * width);
          const ns = -0.5 + Math.random(); // Random noise value
          for (let n = 0; n < 3; n += 1) {
            data[i + n] = ns * 255;
          }
          data[i + 3] = 32; // Alpha channel for noise effect
        }
      }

      ctx.putImageData(imageData, 0, 0);
      return canvas.toDataURL();
    }

    function applyNoiseTexture() {
      const bgElement = document.querySelector(".gradient-bg");
      const noiseTexture = generateNoiseTexture();
      bgElement.style.backgroundImage = `url(${noiseTexture}), linear-gradient(to bottom, #6F86A8, #F3EFDC)`;
      bgElement.style.backgroundBlendMode = "overlay";
    }

    applyNoiseTexture();
    window.addEventListener("resize", applyNoiseTexture);

    return () => {
      window.removeEventListener("resize", applyNoiseTexture);
    };
  }, []);

  return (
    <div className="bubble-background">
      <div className="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        {/* <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive"></div>
        </div> */}
      </div>
    </div>
  );
};

export default DarkBubblePage;
