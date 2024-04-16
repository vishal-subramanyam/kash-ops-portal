import React, { useState } from "react";

function InvoiceDateRangeFilter(props) {
  let [selectedCompanyId, setSelectedCompanyId] = useState("");
  let [companyProjects, setCompanyProjects] = useState([]);
  // Write function to track filter choices and run function sent via props to update state on parent in order to pass to new invoice component

  // Getting list of companies from NewInvoice parent. Will pass in all the created projects array and filter that by selected company since the project dropdown depends on which company is selected in the company dropdown
  //   console.log(props.companies);
  //   console.log(props.projects);
  // Extract projects data and set to state
  //   props.projects().then((res) => setCompanyProjects(res));
  //   let filteredProjects = props.projects.filter((project) => {
  //     return project.CompanyId === selectedCompanyId;
  //   });

  //   console.log(props.companies);
  return (
    <form method="POST" className="invoice-filter-form">
      <fieldset>
        <label htmlFor="company-selection">Company</label>
        <select
          id="company-selection"
          name="company-selection"
          typeof="text"
          onChange={(e) => console.log(e.target)}
        >
          <option value=""></option>
          {/* map over list of companies */}
          {/* {props.companies.map((company, i) => {
           return <option
              key={i}
              value={company.CompanyName}
              data-id={company.CompanyId}
            >
              {company.CompanyName}
            </option>;
            
          })} */}
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="project-selection">Project</label>
        <select id="project-selection" name="project-selection" typeof="text">
          <option value=""></option>
          {/* map over list of companies */}
        </select>
      </fieldset>

      <fieldset className="invoice-date-rage-form-group">
        <h5>Date Range</h5>
        <div>
          <div>
            <label htmlFor="date-filter-from">Start Date</label>
            <input id="date-filter-from" name="date-filter-from" type="date" />
          </div>

          <div>
            <div>
              <label htmlFor="date-filter-to">End Date</label>
              <input id="date-filter-to" name="date-filter-to" type="date" />
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
}

export default InvoiceDateRangeFilter;
