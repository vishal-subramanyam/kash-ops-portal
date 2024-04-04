import React from "react";
import "../assets/styles/ControlCenter.css";
import BurnRateChartKPI from "./BurnRateChartKPI";

function ProjectBurnRateHolder(props) {
  return (
    <div className="ProjectListBurnRateCharts-container">
      {/* loop over array of projects to show pie chart for each project */}
      <h3>Hours Billed/ Alloted Hours Per Project</h3>
      {props.hrsAllottedBilledByProj.map((project, i) => {
        return <BurnRateChartKPI projectDetails={project} />;
      })}
    </div>
  );
}

export default ProjectBurnRateHolder;
