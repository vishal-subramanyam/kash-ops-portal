import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import EmployeeHub from "./pages/EmployeeHub";
import AddEmployee from "./pages/AddEmployee";
import EmployeeRoleAndResponsibilities from "./pages/EmployeeRoleAndResponsibilities";
import ClientsHub from "./pages/ClientsHub";
import AddCompany from "./pages/AddCompany";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import EditCompanyAdmin from "./pages/EditCompanyAdmin";
import TimesheetsHub from "./pages/TimesheetsHub";
import UpdateTimesheet from "./pages/UpdateTimesheet";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/safetyapp" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        {/* Operations Hub. Set props to pass if logged in user is Admin Level or not*/}
        <Route path="/employee-hub" element={<EmployeeHub />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route
          path="/employee-roles-and-responsibilities"
          element={<EmployeeRoleAndResponsibilities />}
        />
        <Route path="/clients-hub" element={<ClientsHub />} />
        <Route path="/add-company" element={<AddCompany />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/edit-project" element={<EditProject />} />
        <Route path="/edit-company-admin" element={<EditCompanyAdmin />} />
        <Route path="/timesheets-hub" element={<TimesheetsHub />} />
        <Route path="/update-timesheet" element={<UpdateTimesheet />} />
      </Routes>
    </div>
  );
}

export default App;
