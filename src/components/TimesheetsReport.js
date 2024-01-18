import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { domain } from "../assets/api/apiEndpoints";
import "../assets/styles/Reports.css";

function TimesheetsReport() {
  const [allTimesheetRecords, setAllTimesheetRecords] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    Billable: false,
    CompanyName: true,
    EmpId: true,
    FridayHours: true,
    MondayHours: true,
    NonBillableReason: false,
    PeriodStartDate: true,
    SaturdayHours: true,
    SowId: true,
    SubAssignment: true,
    SubAssignmentSegment1: true,
    SubAssignmentSegment2: false,
    SundayHours: true,
    ThursdayHours: true,
    TicketNum: true,
    TimesheetEntryId: true,
    TimesheetStatusEntry: false,
    TuesdayHours: true,
    WednesdayHours: true,
  });

  useEffect(() => {
    getTimesheets();
  }, []);
  const getTimesheets = () => {
    fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "TIMESHEETS_AND_COMPANY_INFO_TABLE",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        // save all timesheet records to state
        setAllTimesheetRecords(res.data);
      })
      .catch((err) => alert(err));
  };

  const transformedRowsTS = allTimesheetRecords.map((item) => ({
    idTS: item.TimesheetEntryId,
    Billable: item.Billable,
    SundayHours: item.SundayHours,
    SubAssignmentSegment2: item.SubAssignmentSegment2,
    SubAssignmentSegment1: item.SubAssignmentSegment1,
    ThursdayHours: item.ThursdayHours,
    PeriodStartDate: item.PeriodStartDate,
    TicketNum: item.TicketNum,
    WednesdayHours: item.WednesdayHours,
    CompanyName: item.CompanyName,
    SowId: item.SowId,
    NonBillableReason: item.NonBillableReason,
    FridayHours: item.FridayHours,
    TimesheetEntryId: item.TimesheetEntryId,
    SubAssignment: item.SubAssignment,
    SaturdayHours: item.SaturdayHours,
    TuesdayHours: item.TuesdayHours,
    EmpId: item.EmpId,
    TimesheetStatusEntry: item.TimesheetStatusEntry,
    MondayHours: item.MondayHours,
  }));

  const initialHiddenColumns = [
    "Billable",
    "SubAssignmentSegment2",
    "NonBillableReason",
    "TimesheetStatusEntry",
  ];

  //   const initialColumnVisibilityModel = Object.fromEntries(
  //     Object.keys(allTimesheetRecords[0]).map((item) => [
  //       item,
  //       !initialHiddenColumns.includes(item),
  //     ])
  //   );
  //   console.log(initialColumnVisibilityModel);

  const customColumnOrder = [
    "idTS",
    "EmpId",
    "PeriodStartDate",
    "SowId",
    "SubAssignment",
    "SubAssignmentSegment1",
    "TicketNum",
    "MondayHours",
    "TuesdayHours",
    "WednesdayHours",
    "ThursdayHours",
    "FridayHours",
    "SaturdayHours",
    "SundayHours",
    "Billable",
    "CompanyName",
  ];

  const columnList = customColumnOrder.map((item) => ({
    field: item,
    width: 150,
  }));

  const handleToggleColumnVisibility = (column) => {
    setColumnVisibilityModel((prevModel) => ({
      ...prevModel,
      [column]: !prevModel[column],
    }));
  };

  const visibleColumns = columnList.filter(
    (column) => columnVisibilityModel[column.field]
  );

  return (
    <div>
      <h1 className="report-title"> KASH OPS TIMESHEETS </h1>
      <div className="report-container">
        <DataGrid
          rows={transformedRowsTS}
          columns={visibleColumns}
          getRowId={(row) => row.idTS}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={handleToggleColumnVisibility}
        />
      </div>
    </div>
  );
}

export default TimesheetsReport;
