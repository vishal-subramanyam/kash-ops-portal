import React, { useState, useEffect } from "react";
import AlertMessage from "./AlertMessage";
import { DataGrid } from "@mui/x-data-grid";
import { domain } from "../assets/api/apiEndpoints";
import "../assets/styles/Reports.css";

function ProjectsReport() {
  let [allProjectSubAssignments, setAllProjectSubAssignments] = useState([]);
  let [columnVisibilityModel, setColumnVisibilityModel] = useState({
    SowId: true,
    ProjectSubTaskId: true,
    SubTaskTitle: true,
    Segment1: true,
    Segment2: false,
    Segment3: false,
  });
  let alertMessage = useRef();
  let [message, setMessage] = useState("");

  useEffect(() => {
    getAllProjectSubAssignments();
  }, []);

  const alertMessageDisplay = (entry) => {
    return entry;
  };

  const closeAlert = () => {
    alertMessage.current.close();
    addEmployeeForm.current.reset();
  };

  const getAllProjectSubAssignments = async () => {
    await fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "KASH_OPERATIONS_PROJECT_SUB_CATEGORY_TABLE",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setAllProjectSubAssignments(res.data);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(
            `Unable to get project sub assignments from database. Error: ${err}`
          )
        );
        alertMessage.current.showModal();
      });
  };

  // Transform the data
  const transformedRows = allProjectSubAssignments.map((item, i) => ({
    id: i,
    SowId: item.SowId,
    ProjectSubTaskId: item.ProjectSubTaskId,
    SubTaskTitle: item.SubTaskTitle,
    Segment1: item.Segment1,
  }));

  const initialHiddenColumns = ["Segment2", "Segment3"];

  const customColumnOrder = [
    "SowId",
    "ProjectSubTaskId",
    "SubTaskTitle",
    "Segment1",
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
      <h1 className="report-title">KASH OPS PROJECT SUB ASSIGNMENTS</h1>
      <div className="report-container">
        <DataGrid
          rows={transformedRows}
          columns={visibleColumns}
          getRowId={(row) => row.id}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={handleToggleColumnVisibility}
        />
      </div>
      <AlertMessage ref={alertMessage} close={closeAlert} message={message} />
    </div>
  );
}

export default ProjectsReport;
