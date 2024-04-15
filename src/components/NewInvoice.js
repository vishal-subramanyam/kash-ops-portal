import React, { useRef, useState } from "react";
import CreateTimesheetInvoice from "./CreateTimesheetInvoice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/ManageInvoices.css";
import InvoiceDateRangeFilter from "./InvoiceDateRangeFilter";
import {
  getCompanies,
  fetchCompanyAdmins,
  getCompanyProjects,
} from "../hooks/FetchData";

function NewInvoice(props) {
  let loggedInUser = props.loggedInUserInfo;
  let [filterRangeParams, setFilterRangeParams] = useState({
    company: "",
    project: "",
    from: "",
    to: "",
  });
  let [companiesListDropdown, setCompaniesListDropdown] = useState([]);
  let [companyAdminsDet, setCompanyAdminsDet] = useState([]);
  // Run fetch functions to get relavent data
  let companyAdmins = fetchCompanyAdmins;
  let companies = getCompanies;
  let projects = getCompanyProjects;

  //  Write function to get timesheet entries and set to state
  //  Determine if logged in user is "Admin" or "Super Admin"
  //  If user is just "Admin", only show companies for whome "Admin" user is an admin
  //  Show all companies in dropdown if user is "Super Admin"

  if (loggedInUser.AdminLevel === "Super Admin") {
    // Fetch list of all companies and assign to state
    companies().then((res) => {
      console.log(res);
      setCompaniesListDropdown(res);
    });
  } else if (loggedInUser.AdminLevel === "Admin") {
    // filter fetch response from company admins table to return only the companies for which the logged in user is just an company Admin
    // Fetch list of all company admins and their respective company details
    companyAdmins().then((res) => console.log(res));
    companyAdmins().then((res) => setCompanyAdminsDet(res.compAdminsOverall));
  }

  return (
    <section className="ManageInvoices--new-invoice-tab-content">
      <button
        className="ManageInvoices--create-new-invoice-btn"
        type="button"
        onClick={(e) => props.openNewInvoiceModal(e)}
        style={{ display: props.newInvoiceType === "" ? "flex" : "none" }}
      >
        <FontAwesomeIcon className="create-new-invoice-icon" icon={faPlus} />
        Create New Invoice
      </button>
      {console.log("invoice type chosen", props.newInvoiceType)}

      {/* If newInvoiceType state not updated with user selection, show nothing. If "New Timesheet Invoice" button clicked, show that UI and blank invoice UI if "Blank Invoice" button clicked */}
      {props.newInvoiceType === "" ? (
        <></>
      ) : props.newInvoiceType === "new-timesheet-invoice" ? (
        <>
          <h5 className="new-invoice-heading">New Timesheet Invoice</h5>
          {/* Filter invoice params. Set filter params as a state object and update said object with the values from the filters. Pass those values back up to run filters on data. */}
          <InvoiceDateRangeFilter setFilterParams={setFilterRangeParams} />
          <CreateTimesheetInvoice />
        </>
      ) : (
        <>"This is the Blank Invoice UI section</>
      )}
    </section>
  );
}

export default NewInvoice;
