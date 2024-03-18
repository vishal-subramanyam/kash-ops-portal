import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../assets/styles/Reports.css";
import "../assets/styles/EmployeesDetail.css";

function CompaniesReport(props) {
  console.log("Companies", props.entries);
  console.log("Projects", props.projects);

  let [columnVisibilityModel, setColumnVisibilityModel] = useState({
    CompanyName: true,
    CompanyId: true,
    TotalProjects: true,
    ActiveProjects: true,
  });

  // Transform the data
  const transformedRows = props.entries.map((item, i) => ({
    id: i,
    CompanyName: item.CompanyName,
    CompanyId: item.CompanyId,
    TotalProjects: props.projects.filter(
      (project) => project.CompanyId === item.CompanyId
    ).length,
    ActiveProjects: props.projects.filter(
      (project) =>
        project.CompanyId === item.CompanyId &&
        project.CurrentStatus === "Active"
    ).length,
  }));

  //   const initialHiddenColumns = ["TotalProjectedHours"];

  const customColumnOrder = [
    "CompanyName",
    "CompanyId",
    "TotalProjects",
    "ActiveProjects",
  ];

  const columnList = customColumnOrder.map((item) => ({
    field: item,
    headerName: item.replace(/([A-Z0-9])/g, " $1").trim(), // Add a space between capital letters and numbers
    width: 250,
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
    <div className="report-container UsersReport--report-container">
      <DataGrid
        rows={transformedRows}
        columns={visibleColumns}
        getRowId={(row) => row.id}
        // columnVisibilityModel={columnVisibilityModel}
        // onColumnVisibilityModelChange={handleToggleColumnVisibility}
        slots={{
          toolbar: GridToolbar,
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 15 } },
        }}
        pageSizeOptions={[15, 25, 50, 75]}
      />
    </div>
  );
}

export default CompaniesReport;
