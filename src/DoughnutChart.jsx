import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { FaDownload, FaTimes, FaExpand } from "react-icons/fa";
import { useState, useRef } from "react";

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
  plugins: {
    labels: {
      render: "label",
      fontColor: "#fff",
      position: "outside",
    },
  },
  layout: {
    padding: {
      right: 40,
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
      <div className="card-header  d-flex justify-content-between align-items-center">
        <h6>Doughnut Chart</h6>
        <div className="d-flex justify-content-between align-items-center ">
          <button
            className="btn btn-sm btn-light mr-2 d-flex align-items-center text-primary border-primary"
            onClick={toggleFullChart}
          >
            <FaExpand className="me-2" />
            <span className="d-none d-md-block">Expand</span>
          </button>
          <button
            className="btn btn-sm btn-light d-flex align-items-center text-primary border-primary"
            onClick={exportChart}
          >
            <FaDownload className="me-2" />
            <span className="d-none d-md-block">Export</span>
          </button>
        </div>
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
