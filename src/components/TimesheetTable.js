import React, { useState } from "react";

function TimesheetTable(props) {
  return (
    <table id="timeSheetTable" className="display" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Delete</th>
          <th>Project</th>
          <th>Work Area</th>
          <th>Task Area</th>
          {/* <!--th>Segment 2</th--> */}
          <th>Ticket #</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
          <th>Total Hours</th>
        </tr>
      </thead>
      <tbody id="tabBod">{console.log(props.timesheetRecords)}</tbody>
    </table>
  );
}

export default TimesheetTable;
