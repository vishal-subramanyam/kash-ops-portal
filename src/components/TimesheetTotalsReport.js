import React, { useState, useRef, useEffect } from "react";
import AlertMessage from "./AlertMessage";
import { DataGrid, GridToolbar, GridFilterModel } from "@mui/x-data-grid";
import { domain } from "../assets/api/apiEndpoints";
import "../assets/styles/Reports.css";

function TimesheetTotalsReport(props) {
  const [allTimesheetRecords, setAllTimesheetRecords] = useState(
    props.timesheetRecordsArr
  );
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    CompanyName: true,
    EmpId: false,
    FullName: true,
    ProjectDescription: true,
    NonBillableReason: true,
    TotalHours: true,
    SubAssignment: true,
    SubAssignmentSegment1: true,
    TicketNum: true,
    EntryStatus: true,
    EntryDate: false,
  });
  let alertMessage = useRef();
  let [message, setMessage] = useState("");
  // let [twoWeeksAgo, setTwoWeeksAgo] = useState(() => {
  //   let todayDate = new Date();
  //   todayDate.setDate(todayDate.getDate() - ((todayDate.getDay() + 6) % 7));
  //   let prevMondayFormat = todayDate;
  //   let twoWeeksAgo = prevMondayFormat.setDate(prevMondayFormat.getDate() - 14);
  //   return new Date(twoWeeksAgo).toISOString().split("T")[0];
  // });

  console.log(allTimesheetRecords);

  const transformedRowsTS = allTimesheetRecords.map((item, i) => ({
    idTS: i,
    FullName: item.FullName,
    ProjectDescription: item.ProjectDescription,
    SubAssignmentSegment1: item.SubAssignmentSegment1,
    TicketNum: item.TicketNum,
    CompanyName: item.CompanyName,
    NonBillableReason: item.NonBillableReason,
    SubAssignment: item.SubAssignment,
    EmpId: item.EmpId,
    EntryStatus: item.EntryStatus,
    TotalHours: item.TotalHours,
  }));
  // console.log(transformedRowsTS);
  // console.log(allTimesheetRecords);

  const initialHiddenColumns = [
    "Billable",
    "SubAssignmentSegment2",
    "Billable",
    "EmpId",
    "SowId",
  ];

  const customColumnOrder = [
    "idTS",
    "FullName",
    "ProjectDescription",
    "SubAssignment",
    "SubAssignmentSegment1",
    "NonBillableReason",
    "CompanyName",
    "TicketNum",
    "Status",
    "TotalHours",
  ];

  const columnList = customColumnOrder.map((item) => {
    if (item === "FullName") {
      return {
        field: item,
        headerName: item.replace(/([A-Z])/g, " $1").trim(),
        headerClassName: "timesheets-report--column-header",
        width: 150,
      };
    } else if (item === "NonBillableReason") {
      return {
        field: item,
        headerName: item.replace(/([A-Z])/g, " $1").trim(),
        headerClassName: "timesheets-report--column-header",
        width: 75,
      };
    } else if (item === "TicketNum") {
      return {
        field: item,
        headerName: item.replace(/([A-Z])/g, " $1").trim(),
        headerClassName: "timesheets-report--column-header",
        width: 95,
      };
    } else if (item === "TotalHours") {
      return {
        field: item,
        headerName: item.replace(/([A-Z])/g, " $1").trim(),
        headerClassName: "timesheets-report--column-header",
        width: 85,
      };
    } else {
      return {
        field: item,
        headerName: item.replace(/([A-Z0-9])/g, " $1").trim(),
        headerClassName: "timesheets-report--column-header",
        width: 250,
      };
    }
  });

  const handleToggleColumnVisibility = (column) => {
    console.log([column]);
    setColumnVisibilityModel((prevModel) => ({
      ...prevModel,
      [column]: !prevModel[column],
    }));
  };

  const visibleColumns = columnList.filter(
    (column) => columnVisibilityModel[column.field]
  );

  const alertMessageDisplay = (entry) => {
    return entry;
  };

  const closeAlert = () => {
    alertMessage.current.close();
  };

  return (
    <div className="timesheet-totals-report-content-warpper">
      {/* <h1 className="report-title"> KASH OPS TIMESHEETS </h1> */}
      <div className="timesheet-totals-report-container">
        <DataGrid
          rows={transformedRowsTS}
          columns={visibleColumns}
          getRowId={(row) => row.idTS}
          // columnVisibilityModel={columnVisibilityModel}
          // onColumnVisibilityModelChange={handleToggleColumnVisibility}
          slots={{
            toolbar: GridToolbar,
          }}
          initialState={{
            // filter: {
            //   filterModel: {
            //     items: [
            //       {
            //         field: "EntryDate",
            //         operator: "onOrAfter",
            //         value: twoWeeksAgo,
            //       },
            //     ],
            //   },
            // },
            pagination: { paginationModel: { pageSize: 15 } },
          }}
          pageSizeOptions={[15, 25, 50, 75]}
        />
      </div>
      <AlertMessage ref={alertMessage} close={closeAlert} message={message} />
    </div>
  );
}

export default TimesheetTotalsReport;
