import React from "react";
import "../assets/styles/ControlCenter.css";

function CompanyHoursKPI(props) {
  return (
    <article>
      <h1>
        {props.hoursBilled}/{props.avgHoursPerCompany}
      </h1>
      <section>
        <h5>Total Hours Billed / Avg Hours per Company</h5>
      </section>
    </article>
  );
}

export default CompanyHoursKPI;
