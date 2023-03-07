import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { FaDownload, FaTimes, FaBars } from "react-icons/fa";
import { useState, useRef } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "My Dataset",
      data: [120, 19, 200, 59, 2, 300],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
  percentageData: [],
};

const sum = data.datasets[0].data.reduce((a, b) => a + b, 0);
data.datasets[0].data.forEach((value) => {
  data.percentageData.push(value);
});

const giveSpaces = (label, percentage) => {
  const labelLength = label?.length || 0;
  const percentageLength = percentage.toString()?.length || 0;
  const totalLength = 30;
  const space = " ";

  let returnLabel = "";
  if (labelLength + percentageLength + 1 > totalLength) {
    // If the combined length of label and percentage is too long, truncate the label
    const labelEndIndex = Math.max(totalLength - percentageLength - 4, 0);
    returnLabel = label.substr(0, labelEndIndex);
  } else {
    // Otherwise, pad with spaces
    const numSpaces = totalLength - labelLength - percentageLength - 1;
    returnLabel = label + space.repeat(numSpaces) + percentage.toString();
  }

  console.log(returnLabel);

  return returnLabel;
};

const options = {
  cutout: 72,
  plugins: {
    legend: {
      position: "right",
      rtl: false,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        boxWidth: 7,
        boxHeight: 7,
        generateLabels: function (chart) {
          const dataset = chart.data.datasets[0];
          return dataset.data.map((value, index) => {
            const label = giveSpaces(
              data.labels[index],
              data.percentageData[index]
            );
            return {
              text: label,
              fillStyle: dataset.backgroundColor[index],
              strokeStyle: dataset.borderColor[index],
              lineWidth: dataset.borderWidth,
              hidden:
                isNaN(value) || chart.getDatasetMeta(0).data[index].hidden,
              index: index,
            };
          });
        },
      },
    },
  },
  text: "360",
  font: {
    size: 16,
  },
  color: "#000",
  lineHeight: 1.2,
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  cutoutPercentage: 72,
};

const plugins = [
  {
    beforeDraw: function (chart) {
      var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
      ctx.restore();
      var fontSize = (height / 200).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";
      var text = ["2230", "clicks"],
        textX = Math.round(width / 2),
        textY = height / 2 - 10;
      const lineHeight = 20;
      text.forEach((line, i) => {
        ctx.font = fontSize * 1 + "em sans-serif";
        ctx.textBaseline = "middle";
        if (i === 0) {
          ctx.fillStyle = "black";
        } else {
          ctx.font = fontSize * 0.6 + "em sans-serif";
          ctx.fillStyle = "#999";
          line = "  " + line;
        }
        const y = textY + i * lineHeight + (i === 0 ? 0 : lineHeight / 2);
        ctx.fillText(line, textX / 2.4, y);
      });
      ctx.save();
    },
  },
];

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
    link.setAttribute("crossOrigin", "anonymous");
    document.body.appendChild(link);
    link.click();
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
              <FaBars className="me-2 " />
              <span className="d-none d-md-block"></span>
            </button>
            <button className="btn btn-sm btn-light d-flex align-items-center border border-secondary">
              <FaDownload className="me-2 mr-2" />
              <span className="d-none d-md-block">Export</span>
            </button>
          </div>
        </div>

        <p className="text-secondary">Unique Clicks the comapny received</p>
      </div>
      <div className="card-body">
        <Doughnut
          ref={chartRef}
          data={data}
          options={options}
          plugins={plugins}
          height={429}
          width={411}
        />
      </div>

      {showFullChart && (
        <div className="full-chart-popup">
          <div className="full-chart-container">
            <div className="full-chart-content">
              <Doughnut
                ref={chartRef}
                data={data}
                options={options}
                plugins={plugins}
                height={460}
                width={460}
              />
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
