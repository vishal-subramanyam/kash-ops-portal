import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import "../assets/styles/ControlCenter.css";

function PieChartKPI(props) {
  return (
    <div className="PieChart-container">
      <h4>{props.projectArr[0].projectName}</h4>
      <PieChart
        //   colors={["red", "blue", "green"]} // Use palette
        margin={{ top: 0, bottom: 0, left: 100, right: 100 }}
        series={[
          {
            data: [...props.projectArr],
            innerRadius: 20,
            // cx: 0,
            // cy: 95,
          },
        ]}
        // width={450}
        height={props.projectArr.length <= 5 ? 200 : 300}
        slotProps={{
          legend: {
            // hidden: true,
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
            padding: { top: 0, bottom: 0, left: 0, right: 0 },
            labelStyle: {
              fontSize: 12,
            },
          },
        }}
      />
      <hr />
    </div>
  );
}

export default PieChartKPI;
