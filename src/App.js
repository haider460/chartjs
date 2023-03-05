import "./App.css";
import BarChart from "./Bar";
import DoughnutChart from "./DoughnutChart";
import MultiLineChart from "./LineChart";

function App() {
  return (
    <div className="main-container">
      <div className="App">
        <div className="line-chart">
          <MultiLineChart />
        </div>
        <div className="doughnut-chart">
          <DoughnutChart />
        </div>
      </div>
      <div className="App">
        <div className="bar-chart">
          <BarChart />
        </div>
        <div className="bar-chart">
          <BarChart />
        </div>
      </div>
      <div className="App">
        <div className="footer-line-chart">
          <MultiLineChart />
        </div>
      </div>
    </div>
  );
}

export default App;
