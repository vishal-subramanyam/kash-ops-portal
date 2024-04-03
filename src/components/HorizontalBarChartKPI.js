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

const valueFormatter = (value) => `${value}hr`;

function HorizontalBarChartKPI(props) {
  let hoursBilledDataObj = props.hrsBilledByUserByProjDet.reduce(
    (acc, project) => {
      const id = project.EmpId;
      const hrs = project.TotalHoursBilled;
      // Get only the first string if more than one first name
      // Get only first letter of last name
      const name =
        project.FirstName.split(" ").shift() +
        " " +
        project.LastName.split("").shift();

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
      slotProps={{
        legend: {
          labelStyle: {
            fontSize: 14,
          },
        },
      }}
      layout="horizontal"
      {...chartSetting}
    />
  );
}

export default HorizontalBarChartKPI;
