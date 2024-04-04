import React from "react";
// import { Gauge } from "@mui/x-charts";
import { Gauge } from "@mui/x-charts/Gauge";
import "../assets/styles/ControlCenter.css";
import { getTotalBilledHours } from "../hooks/FetchData";

function BurnRateChartKPI(props) {
  return (
    <div className="BurnRateChart--container">
      <h4>{props.projectDetails.ProjectCategory}</h4>
      <Gauge
        width={100}
        height={100}
        value={
          props.projectDetails.TotalBilledHours === NaN
            ? "0"
            : props.projectDetails.TotalBilledHours
        }
        valueMin={0}
        valueMax={props.projectDetails.TotalProjectedHours}
        text={({ value, valueMax }) =>
          `${value === NaN ? 0 : value} / ${valueMax}`
        }
      />
    </div>
  );
}

export default BurnRateChartKPI;
