import React from "react";

function CreateTimesheetInvoice() {
  return (
    <>
      <h5 className="new-invoice-heading">New Timesheet Invoice</h5>

      {/* Filter invoice params */}
      <form method="POST">
        <fieldset>
          <label htmlFor="company-selection">Company</label>
          <select id="company-selection" name="company-selection" typeof="text">
            <option value=""></option>
            {/* map over list of companies */}
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="project-selection">Project</label>
          <select id="project-selection" name="project-selection" typeof="text">
            <option value=""></option>
            {/* map over list of companies */}
          </select>
        </fieldset>

        <fieldset>
          <h5>Date Range</h5>
          <div>
            <div>
              <label htmlFor="date-filter-from">Start Date</label>
              <input
                id="date-filter-from"
                name="date-filter-from"
                type="date"
              />
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
    </>
  );
}

export default CreateTimesheetInvoice;
