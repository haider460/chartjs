import { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { FaFolderMinus, FaTimes, FaBars } from "react-icons/fa";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "twiter",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: "#FF6384",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderWidth: 2,
      lineTension: 0.5,
      borderCapStyle: "round",
      pointRadius: 3,
      pointBackgroundColor: "#FF6384",
    },
    {
      label: "instagram",
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: "#36A2EB",
      backgroundColor: "rgba(54,162,235,0.2)",
      borderWidth: 2,
      lineTension: 0.5,
      borderCapStyle: "round",
      pointRadius: 3,
      pointBackgroundColor: "#36A2EB",
    },
    {
      label: "facebook",
      data: [45, 80, 50, 70, 56, 75, 30],
      borderColor: "#FFCE56",
      backgroundColor: "rgba(255,206,86,0.2)",
      borderWidth: 2,
      lineTension: 0.5,
      borderCapStyle: "round",
      pointRadius: 3,
      pointBackgroundColor: "#FFCE56",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      align: "start",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        boxWidth: 7,
        boxHeight: 7,
        font: {
          size: 12,
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

const LargeLineChart = () => {
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
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullChart = () => {
    setShowFullChart(!showFullChart);
  };

  return (
    <div className="card shadow border ">
      <div className="card-body">
        <div className=" d-flex justify-content-between align-items-center">
          <h6>Ambassador Purchase</h6>
          <div className="d-flex justify-content-between align-items-center ">
            <button className="btn btn-md expand-btn  mr-2 d-flex align-items-center border border-secondary">
              <BsBoxArrowUpRight className="me-2" />
              <span className="d-none d-md-block"></span>
            </button>
            <button
              className="btn btn-md btn-light mr-2 d-flex align-items-center border border-secondary"
              onClick={toggleFullChart}
            >
              <FaBars className="me-2" />
              <span className="d-none d-md-block"></span>
            </button>
            <button
              className="btn btn-sm btn-light d-flex align-items-center border border-secondary"
              onClick={handleExport}
            >
              <FaFolderMinus className="me-2 mr-2" />
              <span className="d-none d-md-block mr-1">Last week</span>
              <RiArrowDropDownLine />
            </button>
          </div>
        </div>

        <p className="text-secondary">
          Sales the comapny has converted htrought Ambassadors
        </p>
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

export default LargeLineChart;
