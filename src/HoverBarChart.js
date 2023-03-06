import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FaDownload, FaTimes, FaBars } from "react-icons/fa";
import { useState, useRef } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";

const data = {
  labels: [
    "Facebook",
    "Instagram",
    "Twitter",
    "Youtube",
    "Tiktok",
    "Text",
    "Email",
  ],
  datasets: [
    {
      data: [2000, 121, 12312, 1231, 63453, 23, 234],
      backgroundColor: [
        "#D3D3D3",
        "#D3D3D3",
        "#D3D3D3",
        "#D3D3D3",
        "#D3D3D3",
        "#D3D3D3",
        "#D3D3D3",
      ],
      hoverBackgroundColor: [
        "#f29e5f",
        "#f29e5f",
        "#f29e5f",
        "#f29e5f",
        "#f29e5f",
        "#f29e5f",
        "#f29e5f",
      ],
      barThickness: 10,
    },
  ],
};

const options = {
  legend: {
    display: false,
  },
  plugins: {
    legend: {
      position: "bottom",
      usePointStyle: false,
      pointStyle: "circle",
      padding: 20,
    },
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          color: "transparent",
        },
      },
    ],
  },
};

const HoverBarChart = () => {
  const [showFullChart, setShowFullChart] = useState(false);
  const chartRef = useRef();

  const toggleFullChart = () => {
    setShowFullChart(!showFullChart);
  };

  const exportChart = () => {
    const canvas = chartRef.current?.canvas;
    if (!canvas) {
      console.log("Chart canvas is not available");
      return;
    }
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "chart.png";
    document.body.appendChild(link);
    link.click(); // Added this line to trigger the download
    document.body.removeChild(link);
  };

  return (
    <div className="card shadow border">
      <div className="card-header  d-flex justify-content-between align-items-center">
        <h6>Bar chart</h6>
        <div className="d-flex justify-content-between align-items-center ">
          <button
            className="btn btn-md expand-btn  mr-2 d-flex align-items-center border border-secondary"
            onClick={toggleFullChart}
          >
            <BsBoxArrowUpRight className="me-2" />
            <span className="d-none d-md-block"></span>
          </button>
          <button
            className="btn btn-md btn-light mr-2 d-flex align-items-center border border-secondary"
            onClick={toggleFullChart}
          >
            <FaBars className="me-2" />
          </button>
          <button
            className="btn btn-sm btn-light d-flex align-items-center border border-secondary"
            onClick={exportChart}
          >
            <FaDownload className="me-2" />
            <span className="d-none d-md-block">Export</span>
          </button>
        </div>
      </div>
      <div className="card-body">
        <Bar ref={chartRef} data={data} options={options} />
      </div>
      {showFullChart && (
        <div className="full-chart-popup">
          <div className="full-chart-container">
            <div className="full-chart-content">
              <Bar id="chart" data={data} options={options} />
              <button
                className="btn btn-sm btn-light d-flex align-items-center text-primary border-primary"
                onClick={toggleFullChart}
              >
                <FaTimes className="me-2" />
                <span className="d-none d-md-block">Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoverBarChart;
