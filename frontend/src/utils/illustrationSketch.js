export const createIllustrationSketch = (
  predictedValues,
  setIllustrations,
  journalId,
  containerId
) => {
  const morandiColors = {
    anger: ["#F782C8", "#FE6F9A", "#E58BA6"],
    joy: ["#FFFF63", "#FFFFAA", "#FAFABE", "#EF87C5"],
    fear: ["#85E64F", "#B5E998", "#B6F5C0"],
    sadness: ["#BFC3E6", "#6F79D7", "#C5D6E4"],
  };

  const values = predictedValues.reduce((acc, { label, probability }) => {
    acc[label] = probability;
    return acc;
  }, {});

  const sortedEmotions = Object.keys(values).sort(
    (a, b) => values[b] - values[a]
  );

  const primaryColors = morandiColors[sortedEmotions[0]] || ["#2A292E"];
  const secondaryColors = morandiColors[sortedEmotions[1]] || ["#9E2721"];
  const shadowColors = morandiColors[sortedEmotions[2]] || ["#7C7B80"];

  const getRandomColor = (colorArray) =>
    colorArray[Math.floor(Math.random() * colorArray.length)];

  const primaryColor = getRandomColor(primaryColors);
  const secondaryColor = getRandomColor(secondaryColors);
  const shadowColor = getRandomColor(shadowColors);

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
      p.drawingContext.shadowBlur = 1000;
      p.drawingContext.shadowOffsetY = 0;
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

      const sunX = p.random(w);
      const sunY = p.random(60, 120);
      const sunSize = p.random(40, 70);
      const sunColor = getRandomColor(secondaryColors);
      p.fill(sunColor);
      p.circle(sunX, sunY, sunSize);
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
