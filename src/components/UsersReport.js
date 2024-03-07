import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../assets/styles/Reports.css";
import "../assets/styles/EmployeesDetail.css";

function UsersReport(props) {
  let [columnVisibilityModel, setColumnVisibilityModel] = useState({
    EmpId: true,
    Name: true,
    KashOperationsUsn: true,
    AdminLevel: true,
    EmployeeType: true,
    EmailAddress: true,
    PhoneNumber: true,
    EmpLocationCity: true,
    EmpLocationState: true,
    EmpLocationCountry: true,
    ContractorName: true,
  });

  // Transform the data
  const transformedRows = props.users.map((item, i) => ({
    id: i,
    EmpId: item.EmpId,
    Name: item.FirstName + " " + item.LastName,
    KashOperationsUsn: item.KashOperationsUsn,
    AdminLevel: item.AdminLevel,
    EmployeeType: item.EmployeeType,
    EmailAddress: item.EmailAddress,
    PhoneNumber: item.PhoneNumber,
    EmpLocationCity: item.EmpLocationCity,
    EmpLocationState: item.EmpLocationState,
    EmpLocationCountry: item.EmpLocationCountry,
    ContractorName: item.ContractorName,
  }));

  //   const initialHiddenColumns = ["TotalProjectedHours"];

  const customColumnOrder = [
    "Name",
    "EmpId",
    "KashOperationsUsn",
    "AdminLevel",
    "EmployeeType",
    "EmailAddress",
    "PhoneNumber",
    "EmpLocationCity",
    "EmpLocationState",
    "EmpLocationCountry",
    "EmployeeContractorName",
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

export default UsersReport;
