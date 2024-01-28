import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import RequireAuth from "./components/RequireAuth";
import UpdatePassword from "./pages/UpdatePassword";
import { useAuth } from "./hooks/Authentication";
import ReportsHub from "./pages/ReportsHub";

function App() {
  let { logout, user, loggedInUser, isAdmin } = useAuth();
  let username = window.localStorage.getItem("user");
  let loggedInUserLocal = JSON.parse(
    window.localStorage.getItem("loggedInUserInfo")
  );
  let isAdminLocal = window.localStorage.getItem("adminLevel");

  let navigate = useNavigate();

  const userLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="App">
      {/* {console.log("USER from useAuth", user)}
      {console.log("logged in user info from useAuth", loggedInUser)}
      {console.log("admin from useAuth", isAdmin)}

      {console.log("USER", username)}
      {console.log("logged in user info", loggedInUserLocal)}
      {console.log("admin", isAdminLocal)} */}

      {/* hide button if username in local storage is "null" because value in local storage is a string */}
      {username !== "null" ? (
        <button
          style={{ float: "right", marginTop: "10px" }}
          type="submit"
          value="Submit"
          className="button sign_up-button"
          onClick={userLogout}
        >
          <p className="sign_up-button-text">Logout</p>
        </button>
      ) : (
        ""
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/update-password"
          element={
            <RequireAuth>
              <UpdatePassword />
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
              <AddProject />
            </RequireAuth>
          }
        />
        <Route
          path="/edit-project"
          element={
            <RequireAuth>
              <EditProject />
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
