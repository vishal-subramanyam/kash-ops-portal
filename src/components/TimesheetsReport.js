import React, { useState, useRef, useEffect } from "react";
import AlertMessage from "./AlertMessage";
import { DataGrid, GridToolbar, GridFilterModel } from "@mui/x-data-grid";
import { domain } from "../assets/api/apiEndpoints";
import "../assets/styles/Reports.css";

function TimesheetsReport(props) {
  const [allTimesheetRecords, setAllTimesheetRecords] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    Billable: false,
    CompanyName: true,
    EmpId: false,
    FullName: true,
    ProjectCategory: true,
    FridayHours: true,
    MondayHours: true,
    NonBillableReason: false,
    PeriodStartDate: true,
    SaturdayHours: true,
    SowId: false,
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
  let alertMessage = useRef();
  let [message, setMessage] = useState("");
  let [twoWeeksAgo, setTwoWeeksAgo] = useState(() => {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() - ((todayDate.getDay() + 6) % 7));
    let prevMondayFormat = todayDate;
    let twoWeeksAgo = prevMondayFormat.setDate(prevMondayFormat.getDate() - 14);
    return new Date(twoWeeksAgo).toISOString().split("T")[0];
  });

  useEffect(() => {
    if (props.loggedInUser.AdminLevel === "Super Admin") {
      console.log("User is Super Admin", props.loggedInUser);
      getAllTimesheets();
    } else {
      console.log("User is basic or admin", props.loggedInUser);
      getTimesheetsByEmpId();
    }
  }, []);

  const getAllTimesheets = async () => {
    await fetch(`${domain}GenericResultBuilderService/buildResults`, {
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
      .catch((err) => {
        setMessage(
          alertMessageDisplay(
            `Unable to load timesheets from database. Error: ${err}`
          )
        );
        alertMessage.current.showModal();
      });
  };

  const getTimesheetsByEmpId = async () => {
    await fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "TIMESHEETS_BY_COMPANY_ADMIN_TABLE",
        EmpId: props.loggedInUser.EmpId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        // save all timesheet records to state
        setAllTimesheetRecords(res.data);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(
            `Unable to load timesheets from database. Error: ${err}`
          )
        );
        alertMessage.current.showModal();
      });
  };

  const transformedRowsTS = allTimesheetRecords.map((item, i) => ({
    idTS: i,
    Billable: item.Billable,
    FullName: item.FullName,
    ProjectCategory: item.ProjectCategory,
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
  console.log(transformedRowsTS);
  console.log(allTimesheetRecords);

  const initialHiddenColumns = [
    "Billable",
    "SubAssignmentSegment2",
    "NonBillableReason",
    "TimesheetStatusEntry",
    "EmpId",
    "SowId",
  ];

  const customColumnOrder = [
    "idTS",
    "PeriodStartDate",
    "CompanyName",
    "FullName",
    "ProjectCategory",
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
  ];

  const columnList = customColumnOrder.map((item) => {
    if (item === "PeriodStartDate") {
      return {
        field: item,
        headerName: item.replace(/([A-Z])/g, " $1").trim(),
        width: 150,
        type: "date",
        valueGetter: (params) => {
          let date = params.value;
          let dateSplit = date.split("-");
          if (!params.value) {
            return new Date(
              parseInt(dateSplit[0]),
              parseInt(dateSplit[1]) - 1,
              parseInt(dateSplit[2])
            );
          }
          return new Date(
            parseInt(dateSplit[0]),
            parseInt(dateSplit[1]) - 1,
            parseInt(dateSplit[2])
          );
        },
      };
    } else {
      return {
        field: item,
        headerName: item.replace(/([A-Z0-9])/g, " $1").trim(),
        width: 150,
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
    <div>
      <h1 className="report-title"> KASH OPS TIMESHEETS </h1>
      <div className="report-container">
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
            filter: {
              filterModel: {
                items: [
                  {
                    field: "PeriodStartDate",
                    operator: "onOrAfter",
                    value: twoWeeksAgo,
                  },
                ],
              },
            },
            pagination: { paginationModel: { pageSize: 15 } },
          }}
          pageSizeOptions={[15, 25, 50, 75]}
        />
      </div>
      <AlertMessage ref={alertMessage} close={closeAlert} message={message} />
    </div>
  );
}

export default TimesheetsReport;
