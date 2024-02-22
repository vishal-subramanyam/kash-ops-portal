import React from "react";
import "../assets/styles/ControlCenter.css";

function ProjectHoursKPI(props) {
  return (
    <article>
      <section>
        <h1>
          {props.hoursBilled}/{props.hoursAllotted}
        </h1>
        <h1>{props.percentage}</h1>
      </section>
      <section>
        <h5>Hours Billed on Project / Hours Alloted on Project</h5>
      </section>
    </article>
  );
}

export default ProjectHoursKPI;
