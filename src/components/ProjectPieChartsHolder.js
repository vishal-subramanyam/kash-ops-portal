import React from "react";
import "../assets/styles/ControlCenter.css";
import PieChartKPI from "./PieChartKPI";

function ProjectPieChartsHolder(props) {
  const projectGroups = {};
  // Alter billed data to group all projects together with total number of hours billed by each user to a project
  // Show a pie chart for each project that contains segments for each user and their total billed hours on project
  props.hrsBilledByUserByProjDet.forEach((obj) => {
    let sowId = obj["SowId"];
    let projectName = obj["ProjectCategory"];
    let value = obj.TotalHoursBilled;
    // Get only the first string if more than one first name
    // Get only first letter of last name
    let label =
      obj.FirstName.split(" ").shift() + " " + obj.LastName.split("").shift();

    if (!projectGroups[sowId]) {
      projectGroups[sowId] = [];
    }

    projectGroups[sowId].push({ label, value, sowId, projectName });
  });
  console.log(Object.values(projectGroups));
  return (
    <>
      {/* loop over array of projects to show pie chart for each project */}
      <h1>Employee Hours Billed Per Project</h1>
      {Object.values(projectGroups).map((projectArr, i) => {
        return (
          <PieChartKPI className="pie-chart-kpi" projectArr={projectArr} />
        );
      })}
    </>
  );
}

export default ProjectPieChartsHolder;
