import React from "react";
import "../assets/styles/ControlCenter.css";

function ProjectHoursKPI(props) {
  return (
    <article>
      <h1>
        {props.hoursBilled}/{props.hoursAllotted}
      </h1>
      <section>
        <p>Hours Billed on Project / Hours Alloted on Project</p>
      </section>
    </article>
  );
}

export default ProjectHoursKPI;
