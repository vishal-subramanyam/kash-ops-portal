import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import "../assets/styles/ControlCenter.css";

function PieChartKPI(props) {
  return (
    <>
      {console.log(props.projectArr)}
      <h1>{props.projectArr[0].projectName}</h1>
      <PieChart
        //   colors={["red", "blue", "green"]} // Use palette
        series={[
          {
            data: [...props.projectArr],
            innerRadius: 27,
          },
        ]}
        width={400}
        height={200}
        slotProps={{
          legend: {
            hidden: true,
            direction: "column",
            position: { vertical: "bottom", horizontal: "right" },
          },
        }}
      />
    </>
  );
}

export default PieChartKPI;
