import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

const Graph = ({ coinData }) => {
  const labels = Object.keys(coinData);
  const datas = Object.values(coinData);

  const data = {
    labels,
    datasets: [
      {
        label: "BitCoinPrice",
        data: datas,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  const options = {
    scales: {
      y: {
        ticks: {
          callback: function (value, index, values) {
            return "$ " + (value / 1000).toFixed(2) + "K";
          },
        },
      },
    },
  };
  return (
    <div>
      <Line data={data} options={options}></Line>
    </div>
  );
};

Graph.propTypes = {
  coinData: PropTypes.object.isRequired,
};

export default Graph;
