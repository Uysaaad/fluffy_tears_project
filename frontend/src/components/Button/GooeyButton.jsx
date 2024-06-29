import React, { useEffect } from "react";

const GooeyButtonComponent = () => {
  useEffect(() => {
    const moveBg = (e) => {
      const rect = e.target.getBoundingClientRect();
      e.target.style.setProperty(
        "--x",
        ((e.clientX - rect.left) / rect.width) * 100
      );
      e.target.style.setProperty(
        "--y",
        ((e.clientY - rect.top) / rect.height) * 100
      );
    };

    const button = document.querySelector("button");
    button.addEventListener("pointermove", moveBg);

    return () => {
      button.removeEventListener("pointermove", moveBg);
    };
  }, []);

  useEffect(() => {
    let i = 4;
    const button = document.querySelector("button");
    button.style.setProperty("--a", "100%");
    const x = setInterval(() => {
      button.style.setProperty("--x", ((Math.cos(i) + 2) / 3.6) * 100);
      button.style.setProperty("--y", ((Math.sin(i) + 2) / 3.6) * 100);
      i += 0.03;
      if (i > 11.5) {
        clearInterval(x);
        button.style.setProperty("--a", "");
      }
    }, 16);

    button.addEventListener("pointerover", () => {
      clearInterval(x);
      button.style.setProperty("--a", "");
    });

    return () => {
      clearInterval(x);
      button.style.setProperty("--a", "");
    };
  }, []);

  return (
    <main id="app" className="dark">
      <header>
        <h1>A Gooey button</h1>
        <p>Hover to experience!</p>
      </header>

      <div>
        <button type="button" className="gooey-button">
          Gooey Button
        </button>
      </div>

      <p>
        Inspired by <em>(and svg filter copied from)</em>{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://codepen.io/thebabydino/pen/NWVdKaG"
        >
          Ana's codepen
        </a>
        , go give her a ❤️ !
      </p>

      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 1"></feFuncA>
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="5"></feGaussianBlur>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="-5 11"></feFuncA>
          </feComponentTransfer>
        </filter>
      </svg>
    </main>
  );
};

export default GooeyButtonComponent;
