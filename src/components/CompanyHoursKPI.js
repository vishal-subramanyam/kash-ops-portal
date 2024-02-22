import React from "react";
import "../assets/styles/ControlCenter.css";

function CompanyHoursKPI(props) {
  return (
    <article>
      <h1>
        {props.hoursBilled}/{props.avgHoursPerCompany}
      </h1>
      <section>
        <p>Total Hours Billed / Avg Hours per Company</p>
      </section>
    </article>
  );
}

export default CompanyHoursKPI;
