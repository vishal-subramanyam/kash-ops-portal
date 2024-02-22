import React, { useState } from "react";
import { useAuth } from "./hooks/Authentication";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import EDITUpdateTimesheet from "./pages/EDITUpdateTimesheet";
import RequireAuth from "./components/RequireAuth";
import UpdatePassword from "./pages/UpdatePassword";
import ReportsHub from "./pages/ReportsHub";
import NavBar from "./components/NavBar";
import EditProjectDetails from "./pages/EditProjectDetails";
import EditCompanyDetails from "./pages/EditCompanyDetails";
import ControlCenter from "./pages/ControlCenter";

function App() {
  let { logout, user, loggedInUser, isAdmin } = useAuth();
  let username = window.localStorage.getItem("user");

  let loggedInUserLocal = JSON.parse(
    window.localStorage.getItem("loggedInUserInfo")
  );
  let isAdminLocal = window.localStorage.getItem("adminLevel");
  let navigate = useNavigate();
  let location = useLocation();

  return (
    <div className="App">
      {/* hide NavBar if username in local storage is "null" because value in local storage is a string */}
      {username !== "null" ? <NavBar userInfo={loggedInUserLocal} /> : <></>}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/update-password"
          element={
            <RequireAuth>
              <UpdatePassword
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage loggedInUser={loggedInUserLocal} admin={isAdminLocal} />
            </RequireAuth>
          }
        />
        {/* Operations Hub. Set props to pass if logged in user is Admin Level or not*/}
        <Route
          path="/employee-hub"
          element={
            <RequireAuth>
              <EmployeeHub />
            </RequireAuth>
          }
        />
        <Route
          path="/add-employee"
          element={
            <RequireAuth>
              <AddEmployee
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/employee-roles-and-responsibilities"
          element={
            <RequireAuth>
              <EmployeeRoleAndResponsibilities />
            </RequireAuth>
          }
        />
        <Route
          path="/clients-hub"
          element={
            <RequireAuth>
              <ClientsHub
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/add-company"
          element={
            <RequireAuth>
              <AddCompany />
            </RequireAuth>
          }
        />
        <Route
          path="/add-project"
          element={
            <RequireAuth>
              <AddProject
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/edit-project-details"
          element={
            <RequireAuth>
              <EditProjectDetails
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/edit-project"
          element={
            <RequireAuth>
              <EditProject
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/edit-company-details"
          element={
            <RequireAuth>
              <EditCompanyDetails
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/edit-company-admin"
          element={
            <RequireAuth>
              <EditCompanyAdmin
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/timesheets-hub"
          element={
            <RequireAuth>
              <TimesheetsHub />
            </RequireAuth>
          }
        />
        <Route
          path="/update-timesheet"
          element={
            <RequireAuth>
              <UpdateTimesheet
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/edit-update-timesheet"
          element={
            <RequireAuth>
              <EDITUpdateTimesheet
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/control-center"
          element={
            <RequireAuth>
              <ControlCenter
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/reports"
          element={
            <RequireAuth>
              <ReportsHub
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
              />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
