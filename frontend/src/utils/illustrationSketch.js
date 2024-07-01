export const createIllustrationSketch = (
  predictedValues,
  setIllustrations,
  journalId,
  containerId
) => {
  const colors = {
    anger: "#FF4500", // OrangeRed
    joy: "#FFD700", // Gold
    fear: "#000000", // Black
    sadness: "#1E90FF", // DodgerBlue
  };

  const values = predictedValues.reduce((acc, { label, probability }) => {
    acc[label] = probability;
    return acc;
  }, {});

  const sortedEmotions = Object.keys(values).sort(
    (a, b) => values[b] - values[a]
  );

  const primaryColor = colors[sortedEmotions[0]] || "#2A292E"; // Default color
  const secondaryColor = colors[sortedEmotions[1]] || "#9E2721"; // Default sun color
  const shadowColor = colors[sortedEmotions[2]] || "#7C7B80"; // Default shadow color

  return (p) => {
    let scaling, w, h;

    p.setup = () => {
      const container = document.getElementById(containerId);
      w = container.offsetWidth;
      h = container.offsetHeight;
      scaling = 0.2; // Adjust the scaling factor here if needed

      p.pixelDensity(1);
      p.createCanvas(w, h).parent(container);
      p.noStroke();
      p.background("#ECEDE8");
      p.colorMode(p.HSB);
      p.noLoop();
      p.noStroke();

      p.drawingContext.shadowColor = shadowColor;
      p.drawingContext.shadowBlur = 200;
      p.drawingContext.shadowOffsetY = 20;
      drawMountains(p, primaryColor);
      addTexture(p, w, h);

      const image = p.canvas.toDataURL("image/jpeg");
      console.log("Generated image:", image); // Debugging log
      setIllustrations((prevIllustrations) => ({
        ...prevIllustrations,
        [journalId]: image,
      }));
    };

    const drawMountains = (p, color) => {
      p.fill(color);
      for (let y = 200 * scaling; y <= h + 100 * scaling; y += 50 * scaling) {
        let xnoise = 0;
        let ynoise = p.random(20);
        let ymin = 100;
        let xstep = 0.01;
        p.beginShape();
        p.vertex(0, y);
        for (let x = 0; x <= w + 1; x += 2) {
          let y2 = ymin + (y - ymin) * p.noise(x * xstep, ynoise);
          p.vertex(x, y2);
        }
        p.vertex(w, y);
        p.endShape();
      }

      // Add some fog at the bottom.
      p.drawingContext.shadowBlur = 6000 * scaling;
      p.rect(-200 * scaling, h, w + 400 * scaling, 700 * scaling);
      p.drawingContext.shadowBlur = 500;
      p.drawingContext.shadowOffsetY = 5;
      p.rect(-200 * scaling, -500, w + 400 * scaling, 400);

      p.fill(secondaryColor);
      p.circle(w / 3, 60, 90);
    };

    const addTexture = (p, width, height) => {
      p.loadPixels();
      for (let x = 0; x < width; x += 1) {
        for (let y = 0; y < height; y += 1) {
          const i = 4 * (x + y * width);
          const ns = -0.5 + p.noise(x * 0.5, y * 1.5);
          for (let n = 0; n < 3; n += 1) {
            p.pixels[i + n] += ns * 32;
          }
        }
      }
      p.updatePixels();
    };
  };
};
