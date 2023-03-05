import { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { FaDownload, FaTimes, FaExpand } from "react-icons/fa";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: "#FF6384",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderWidth: 2,
      lineTension: 0.5,
      borderCapStyle: "round",
    },
    {
      label: "Dataset 2",
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: "#36A2EB",
      backgroundColor: "rgba(54,162,235,0.2)",
      borderWidth: 2,
      lineTension: 0.5,
      borderCapStyle: "round",
    },
    {
      label: "Dataset 3",
      data: [45, 80, 50, 70, 56, 75, 30],
      borderColor: "#FFCE56",
      backgroundColor: "rgba(255,206,86,0.2)",
      borderWidth: 2,
      lineTension: 0.5,
      borderCapStyle: "round",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,

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
  legend: {
    display: true,
  },
};

const LineChart = () => {
  const [showFullChart, setShowFullChart] = useState(false);
  const chartRef = useRef();

  const handleExport = () => {
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

  const toggleFullChart = () => {
    setShowFullChart(!showFullChart);
  };

  return (
    <div className="card shadow border ">
      <div className="card-header  d-flex justify-content-between align-items-center">
        <h6>Line Chart</h6>
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
            onClick={handleExport}
          >
            <FaDownload className="me-2" />
            <span className="d-none d-md-block">Export</span>
          </button>
        </div>
      </div>
      <div className="card-body">
        <div>
          <Line ref={chartRef} data={data} options={options} height={400} />
        </div>
      </div>

      {showFullChart && (
        <div className="full-chart-popup">
          <div className="full-chart-container">
            <div className="full-chart-content">
              <Line ref={chartRef} data={data} options={options} />
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

export default LineChart;
