import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  xAxis: [
    {
      label: "hours (hr)",
    },
  ],
  width: 500,
  height: 400,
};
const dataset = [
  {
    FirstName: "Akshey",
    TotalBilledHours: parseFloat("22.50"),
    seoul: 21,
    month: "Jan",
  },
  {
    FirstName: "Akshey",
    TotalBilledHours: parseFloat("48.00"),
    seoul: 28,
    month: "Fev",
  },
  {
    FirstName: "Alex",
    TotalBilledHours: parseFloat("687.00"),
    seoul: 41,
    month: "Mar",
  },
  {
    FirstName: "Arshath",
    TotalBilledHours: parseFloat("240.00"),
    seoul: 73,
    month: "Apr",
  },
];

const valueFormatter = (value) => `${value}hr`;

function HorizontalBarChartKPI(props) {
  let hoursBilledDataObj = props.hrsBilledByUserByProjDet.reduce(
    (acc, project) => {
      const id = project.EmpId;
      const hrs = project.TotalHoursBilled;
      const name = project.FirstName + " " + project.LastName;

      if (acc[id]) {
        acc[name] += parseFloat(hrs);
      } else {
        acc[name] = parseFloat(hrs);
      }

      return acc;
    },
    {}
  );
  let hrsBilledArr = Object.keys(hoursBilledDataObj).map((emp) => ({
    name: emp,
    TotalBilledHours: hoursBilledDataObj[emp],
  }));
  console.log(hrsBilledArr);

  return (
    <BarChart
      dataset={hrsBilledArr}
      yAxis={[{ scaleType: "band", dataKey: "name" }]}
      series={[
        {
          dataKey: "TotalBilledHours",
          label: "Hours Billed By Employee",
          valueFormatter,
        },
      ]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}

export default HorizontalBarChartKPI;
