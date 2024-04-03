import React from "react";
import "../assets/styles/ControlCenter.css";
import PieChartKPI from "./PieChartKPI";

const colorPalette = [
  "#FFC300", // Vivid Yellow
  "#FF5733", // Sunset Orange
  "#C70039", // Crimson Red
  "#900C3F", // Dark Raspberry
  "#581845", // Eggplant Purple
  "#7D3C98", // Royal Purple
  "#2E86C1", // Cerulean Blue
  "#00B4D8", // Sky Blue
  "#FF5733", // Tangerine
  "#FFC300", // Goldenrod
  "#2ECC71", // Emerald Green
  "#27AE60", // Jungle Green
  "#FF5733", // Coral
  "#F39C12", // Mango
  "#F39C12", // Golden
  "#D4AC0D", // Olive
  "#FF5733", // Saffron
  "#F4D03F", // Saffron Yellow
  "#F7DC6F", // Sunshine Yellow
  "#58D68D", // Emerald
  "#82E0AA", // Mint
  "#1ABC9C", // Turquoise
  "#2E86C1", // Ocean Blue
  "#5499C7", // Cornflower Blue
  "#AF7AC5", // Lavender
  "#A569BD", // Amethyst
  "#F1948A", // Salmon Pink
  "#EC7063", // Terracotta
  "#5D6D7E", // Slate Gray
  "#34495E", // Steel Blue
];

function ProjectPieChartsHolder(props) {
  const projectGroups = {};
  // Alter billed data to group all projects together with total number of hours billed by each user to a project
  // Show a pie chart for each project that contains segments for each user and their total billed hours on project
  props.hrsBilledByUserByProjDet.forEach((obj, i) => {
    let sowId = obj["SowId"];
    let projectName = obj["ProjectCategory"];
    let value = obj.TotalHoursBilled;
    let color = colorPalette[Math.floor(Math.random() * 30)];
    // Get only the first string if more than one first name
    // Get only first letter of last name
    let label =
      obj.FirstName.split(" ").shift() + " " + obj.LastName.split("").shift();

    if (!projectGroups[sowId]) {
      projectGroups[sowId] = [];
    }

    projectGroups[sowId].push({ label, value, sowId, projectName, color });
  });
  console.log(Object.values(projectGroups));
  return (
    <div className="ProjectListPieCharts-container">
      {/* loop over array of projects to show pie chart for each project */}
      <h3>Employee Hours Billed Per Project</h3>
      {Object.values(projectGroups).map((projectArr, i) => {
        return (
          <PieChartKPI className="pie-chart-kpi" projectArr={projectArr} />
        );
      })}
    </div>
  );
}

export default ProjectPieChartsHolder;
