import React, { useState, useRef, useEffect } from "react";
import AlertMessage from "./AlertMessage";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { domain } from "../assets/api/apiEndpoints";
import "../assets/styles/Reports.css";

function ProjectsReport(props) {
  let [allProjectsArr, setAllProjectsArr] = useState([]);
  let [columnVisibilityModel, setColumnVisibilityModel] = useState({
    CompanyId: false,
    CompanyName: true,
    CurrentStatus: true,
    OriginalEndDate: true,
    OriginalStartDate: true,
    ProjectCategory: true,
    SowId: true,
    ProjectSubTaskId: true,
    SubTaskTitle: true,
    Segment1: true,
    TotalProjectedHours: false,
  });
  let alertMessage = useRef();
  let [message, setMessage] = useState("");

  useEffect(() => {
    if (props.loggedInUser.AdminLevel === "Super Admin") {
      getAllProjects();
    } else {
      getAllProjectsByCompanyAdmin();
    }
  }, []);

  const getAllProjects = async () => {
    await fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "PROJECTS_AND_SUB_CATEGORY_AND_COMPANY_TABLE",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setAllProjectsArr(res.data);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(`Unable to get projects from database. ${err}`)
        );
        alertMessage.current.showModal();
      });
  };

  // PROJECTS_AND_COMPANY_BY_COMPANY_ADMIN_TABLE;
  const getAllProjectsByCompanyAdmin = async () => {
    await fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "PROJECTS_SUB_CATEGORY_COMPANY_BY_COMPANY_ADMIN",
        EmpId: props.loggedInUser.EmpId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setAllProjectsArr(res.data);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(`Unable to get projects from database. ${err}`)
        );
        alertMessage.current.showModal();
      });
  };

  // Transform the data
  const transformedRows = allProjectsArr.map((item, i) => ({
    id: i,
    CompanyId: item.CompanyId,
    ProjectCategory: item.ProjectCategory,
    OriginalEndDate: item.OriginalEndDate,
    CurrentStatus: item.CurrentStatus,
    OriginalStartDate: item.OriginalStartDate,
    TotalProjectedHours: item.TotalProjectedHours,
    CompanyName: item.CompanyName,
    SowId: item.SowId,
    ProjectSubTaskId: item.ProjectSubTaskId,
    SubTaskTitle: item.SubTaskTitle,
    Segment1: item.Segment1,
  }));

  const initialHiddenColumns = ["TotalProjectedHours"];

  const customColumnOrder = [
    "id",
    "CompanyName",
    "SowId",
    "ProjectCategory",
    "OriginalStartDate",
    "OriginalEndDate",
    "CurrentStatus",
    "ProjectSubTaskId",
    "SubTaskTitle",
    "Segment1",
  ];

  const columnList = customColumnOrder.map((item) => ({
    field: item,
    headerName: item.replace(/([A-Z0-9])/g, " $1").trim(),
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

  const alertMessageDisplay = (entry) => {
    return entry;
  };

  const closeAlert = () => {
    alertMessage.current.close();
  };

  return (
    <div>
      <h1 className="report-title">KASH OPS PROJECTS</h1>
      <div className="report-container">
        <DataGrid
          rows={transformedRows}
          columns={visibleColumns}
          getRowId={(row) => row.id}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={handleToggleColumnVisibility}
          slots={{
            toolbar: GridToolbar,
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
          pageSizeOptions={[25, 50, 75]}
        />
      </div>
      <AlertMessage ref={alertMessage} close={closeAlert} message={message} />
    </div>
  );
}

export default ProjectsReport;
