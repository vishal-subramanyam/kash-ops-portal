import React, { useState } from "react";
import InvoiceDateRangeFilter from "./InvoiceDateRangeFilter";

function CreateTimesheetInvoice() {
  let [filterRangeParams, setFilterRangeParams] = useState({
    company: "",
    project: "",
    from: "",
    to: "",
  });
  return (
    <>
      <h5 className="new-invoice-heading">New Timesheet Invoice</h5>

      {/* Filter invoice params */}
      <InvoiceDateRangeFilter setFilterParams={setFilterRangeParams} />
    </>
  );
}

export default CreateTimesheetInvoice;
