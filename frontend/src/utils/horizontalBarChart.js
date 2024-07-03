import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement);

const HorizontalBarChart = ({ predictions }) => {
  const data = {
    labels: predictions.map((prediction) => prediction.label),
    datasets: [
      {
        label: "Probability",
        data: predictions.map((prediction) => prediction.probability),
        backgroundColor: predictions.map(
          (_, index) => `hsl(${index * 30}, 70%, 50%)`
        ), // Generate colors
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default HorizontalBarChart;
