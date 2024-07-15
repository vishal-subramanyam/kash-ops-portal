import React, { useState, Suspense, startTransition } from "react";
import { useAuth } from "./hooks/Authentication";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import EmployeeHub from "./pages/EmployeeHub";
import ManageEmployee from "./pages/ManageEmployee";
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
import NavBar from "./components/NavBar";
import EditProjectDetails from "./pages/EditProjectDetails";
import EditCompanyDetails from "./pages/EditCompanyDetails";
import ControlCenter from "./pages/ControlCenter";
import EmployeesDetail from "./pages/EmployeesDetail";
import CompaniesDetail from "./pages/CompaniesDetail";
import LoadingData from "./components/LoadingData";
import TimesheetReportsPage from "./pages/TimesheetReportsPage";
import InvoiceHub from "./pages/InvoiceHub";
import ManageInvoices from "./pages/ManageInvoices";

function App() {
  //  let resource = useResources(); // Access the fetch functions to get the pertinent users data

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
      {username !== "null" ? (
        <NavBar userInfo={loggedInUserLocal} admin={isAdminLocal} />
      ) : (
        <></>
      )}
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
          path="/manage-employee"
          element={
            <RequireAuth>
              <ManageEmployee
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
          path="/employees-detail"
          element={
            <RequireAuth>
              <EmployeesDetail
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
                // users={resource.users}
                // companyAdmins={resource.companyAdmins}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/client-hub"
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
          path="/manage-company-admin"
          element={
            <RequireAuth>
              <EditCompanyAdmin
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
                // companyAdmins={resource.companyAdmins}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/companies-detail"
          element={
            <RequireAuth>
              <CompaniesDetail
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/timesheet-hub"
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
              <ControlCenter loggedInUser={loggedInUserLocal} />
            </RequireAuth>
          }
        />
        <Route
          path="/timesheet-reports"
          element={
            <RequireAuth>
              <TimesheetReportsPage
                loggedInUser={loggedInUserLocal}
                admin={isAdminLocal}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/invoice-hub"
          element={
            <RequireAuth>
              <InvoiceHub loggedInUser={loggedInUserLocal} />
            </RequireAuth>
          }
        />
        <Route
          path="/invoice-hub/manage-invoices"
          element={
            <RequireAuth>
              <ManageInvoices loggedInUser={loggedInUserLocal} />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
