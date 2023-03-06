import { Doughnut } from "react-chartjs-2";
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
        "#379EA9",
        "#e96b83",
        "#bd91d1",
        "#f29e5f",
        "#4c8077",
        "#b4c3bf",
        "#BB6B8D",
      ],
    },
  ],
};

const options = {
  cutout: 60,
  plugins: {
    legend: {
      position: "right",
      rtl: true,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        boxWidth: 7,
        boxHeight: 7,
        generateLabels: (chart) => {
          const data = chart.data;
          if (data.labels.length && data.datasets.length) {
            return data.labels.map((label, index) => {
              const value = data.datasets[0].data[index];
              return {
                fillStyle: data.datasets[0].backgroundColor[index],
                text: `${value} ${label}`,
                hidden: isNaN(value) || value <= 0,
                index: index,
              };
            });
          } else {
            return [];
          }
        },
      },
    },
  },

  text: "360",
  font: {
    size: 36,
  },
  color: "#000",
};

const ChartCard = () => {
  const [showFullChart, setShowFullChart] = useState(false);
  const chartRef = useRef();

  const toggleFullChart = () => {
    setShowFullChart(!showFullChart);
  };

  const exportChart = () => {
    const canvas = chartRef.current?.canvas;
    console.log(chartRef.current);
    if (!canvas) {
      console.log("Chart canvas is not available");
      return;
    }
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "chart.png";
    link.setAttribute("crossOrigin", "anonymous"); // Add this line to set the CORS attribute
    document.body.appendChild(link);
    link.click(); // Added this line to trigger the download
    document.body.removeChild(link);
  };

  return (
    <div className="card shadow border">
      <div className="card-body">
        <div className=" d-flex justify-content-between align-items-center">
          <h6>Unique Clicks</h6>
          <div className="d-flex justify-content-between align-items-center ">
            <button className="btn btn-md expand-btn mr-2 d-flex align-items-center border border-secondary">
              <BsBoxArrowUpRight className="me-2" />
              <span className="d-none d-md-block"></span>
            </button>
            <button
              className="btn btn-md mr-2 btn-light d-flex align-items-center border border-secondary"
              onClick={toggleFullChart}
            >
              <FaBars className="me-2" />
              <span className="d-none d-md-block"></span>
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

        <p className="text-secondary">Unique Clicks the comapny received</p>
      </div>
      <div className="card-body">
        <Doughnut ref={chartRef} data={data} options={options} />
      </div>

      {showFullChart && (
        <div className="full-chart-popup">
          <div className="full-chart-container">
            <div className="full-chart-content">
              <Doughnut id="chart" data={data} options={options} />
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

export default ChartCard;
