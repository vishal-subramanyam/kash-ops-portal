import React from "react";
// import { Gauge } from "@mui/x-charts";
import { Gauge } from "@mui/x-charts/Gauge";
import "../assets/styles/ControlCenter.css";

function BurnRateChartKPI(props) {
  return (
    <div className="BurnRateChart--container">
      <h6>{props.projectDetails.ProjectCategory}</h6>
      <Gauge
        width={200}
        height={200}
        value={props.projectDetails.TotalBilledHours}
        valueMin={0}
        valueMax={props.projectDetails.TotalProjectedHours}
        text={({ value, valueMax }) =>
          `${value === NaN ? 0 : value} / ${valueMax}`
        }
      />
      <hr />
    </div>
  );
}

export default BurnRateChartKPI;
