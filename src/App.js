import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// const authContext = React.createContext();

// export function useAuth() {
//   const [authed, setAuthed] = React.useState(false);

//   return {
//     authed,
//     login() {
//       console.log("authorize login");
//       return new Promise((res) => {
//         setAuthed(true);
//         res();
//       });
//     },
//     logout() {
//       console.log("de-authorize on logout");
//       return new Promise((res) => {
//         setAuthed(false);
//         res();
//       });
//     },
//   };
// }

// export function AuthProvider({ children }) {
//   const auth = useAuth();

//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }

// export function AuthConsumer() {
//   return React.useContext(authContext);
// }

function App() {
  return (
    // <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/safetyapp" element={<HomePage />} /> */}
        <Route
          path="/update-password"
          element={
            // <RequireAuth>
            <UpdatePassword />
            //  </RequireAuth>
          }
        />
        <Route
          path="/home"
          element={
            // <RequireAuth>
            <HomePage />
            //  </RequireAuth>
          }
        />
        {/* Operations Hub. Set props to pass if logged in user is Admin Level or not*/}
        <Route
          path="/employee-hub"
          element={
            // <RequireAuth>
            <EmployeeHub />
            // </RequireAuth>
          }
        />
        <Route
          path="/add-employee"
          element={
            // <RequireAuth>
            <AddEmployee />
            // </RequireAuth>
          }
        />
        <Route
          path="/employee-roles-and-responsibilities"
          element={
            // <RequireAuth>
            <EmployeeRoleAndResponsibilities />
            // </RequireAuth>
          }
        />
        <Route
          path="/clients-hub"
          element={
            // <RequireAuth>
            <ClientsHub />
            // </RequireAuth>
          }
        />
        <Route
          path="/add-company"
          element={
            //  <RequireAuth>
            <AddCompany />
            //  </RequireAuth>
          }
        />
        <Route
          path="/add-project"
          element={
            // <RequireAuth>
            <AddProject />
            // </RequireAuth>
          }
        />
        <Route
          path="/edit-project"
          element={
            // <RequireAuth>
            <EditProject />
            // </RequireAuth>
          }
        />
        <Route
          path="/edit-company-admin"
          element={
            // <RequireAuth>
            <EditCompanyAdmin />
            // </RequireAuth>
          }
        />
        <Route
          path="/timesheets-hub"
          element={
            // <RequireAuth>
            <TimesheetsHub />
            //</RequireAuth>
          }
        />
        <Route
          path="/update-timesheet"
          element={
            //<RequireAuth>
            <UpdateTimesheet />
            //</RequireAuth>
          }
        />
      </Routes>
    </div>
    // </BrowserRouter>
  );
}

export default App;
