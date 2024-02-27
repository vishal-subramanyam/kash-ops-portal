import React from "react";
import "../assets/styles/ControlCenter.css";

function KPI(props) {
  return (
    <article
      className={
        props.caption === "Employees Assigned"
          ? "ControlCenter--employees-assigned-component"
          : ""
      }
    >
      <h1>{props.value}</h1>
      <h5>{props.caption}</h5>
    </article>
  );
}

export default KPI;
