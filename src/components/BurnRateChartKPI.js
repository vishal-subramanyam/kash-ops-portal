import React from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import "../assets/styles/ControlCenter.css";

function BurnRateChartKPI(props) {
  return (
    <div className="BurnRateChart--container">
      <h4>Project Title</h4>
      <Gauge width={100} height={100} value={50} valueMin={10} valueMax={60} />
    </div>
  );
}

export default BurnRateChartKPI;
