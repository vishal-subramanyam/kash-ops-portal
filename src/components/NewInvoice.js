import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useReducer,
} from "react";
import CreateTimesheetInvoice from "./CreateTimesheetInvoice";
import LoadingData from "./LoadingData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/ManageInvoices.css";
import InvoiceDateRangeFilter from "./InvoiceDateRangeFilter";
import {
  getCompanies,
  fetchCompanyAdmins,
  getCompanyProjects,
} from "../hooks/FetchData";

// Reducer function to manipulate state
function dataReducer(state, action) {
  switch (action.type) {
    case "initialize": {
      return action.payload;
    }
    case "listCompanies": {
      // set list of all companies to be displayed in dropdown
      console.log("list companies reducer case", state);
    }
    case "listProjects": {
      // set list of all created projects to be filtered later
      console.log("list projects reducer case", state);
    }
    case "listCompanyAdminDetails": {
      // set list of all company admins and relevant details including companyId
      console.log("list company admin details reducer case", state);
    }
    case "chooseCompanyAndFilterProjects": {
      // set selectedCompanyId
      console.log("choose company reducer case", state);
      return {
        ...state,
        selectedCompanyId: action.companyId,
      };
    }
    case "chooseProject": {
      // set selectedProjectSowId
      console.log("choose project reducer case", state);
    }
    case "chooseDateFrom": {
      // set dateRangeFrom to selected date
      console.log("choose date from reducer case", state);
    }
    case "chooseDateTo": {
      // set dateRangeTo to selected date
      console.log("choose date to reducer case", state);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function NewInvoice(props) {
  let initialDataState = {
    selectedCompanyId: "",
    selectedProjectSowId: "",
    companiesList: [],
    companyProjectsList: [],
    companyAdminsDetail: [],
    dateRangeFrom: "",
    dateRangeTo: "",
  };
  let loggedInUser = props.loggedInUserInfo;
  let [isLoading, setIsLoading] = useState(true);
  let [dataState, dispatchData] = useReducer(dataReducer, initialDataState);
  //   let [selectedCompanyId, setSelectedCompanyId] = useState("");
  //   let [companyProjects, setCompanyProjects] = useState([]);
  //   let [filterRangeParams, setFilterRangeParams] = useState({
  //     companyId: "",
  //     projectSowId: "",
  //     from: "",
  //     to: "",
  //   });
  //   let [companiesListDropdown, setCompaniesListDropdown] = useState([]);
  //   let [companyAdminsDet, setCompanyAdminsDet] = useState([]);
  // Run fetch functions to get relavent data
  let companyAdmins = fetchCompanyAdmins;
  let companies = getCompanies;
  let projects = getCompanyProjects;

  //  Write function to get timesheet entries and set to state
  //  Determine if logged in user is "Admin" or "Super Admin"
  //  If user is just "Admin", only show companies for whome "Admin" user is an admin
  //  Show all companies in dropdown if user is "Super Admin"
  //   console.log(loggedInUser);
  //   useEffect(() => {
  //   const resolvePromisesAndDispatch = useCallback(() => {
  //     Promise.allSettled([projects(), companyAdmins(), companies()]).then(
  //       (values) => {
  //         console.log("Fetch Data: ", values);
  //         // setCompaniesListDropdown(values[2]);
  //         // filter fetch response from company admins table to return only the companies for which the logged in user is just an company Admin
  //         // Fetch list of all company admins and their respective company details
  //         // setCompanyAdminsDet(values[1].compAdminsOverall);

  //         setIsLoading(false);
  //       }
  //     );
  //   }, []);

  let resolvePromises = useCallback(() => {
    Promise.allSettled([projects(), companyAdmins(), companies()]).then(
      (values) => {
        console.log("Fetch Data: ", values);
        if (loggedInUser.AdminLevel === "Super Admin") {
          dispatchData({
            type: "initialize",
            payload: {
              ...initialDataState,
              companyProjectsList: values[0].value.companyProjects,
              companyAdminsDetail: values[1].value.compAdminsOverall,
              companiesList: values[2].value,
            },
          });
        } else if (loggedInUser.AdminLevel === "Admin") {
          dispatchData({
            type: "initialize",
            payload: {
              ...initialDataState,
              companyProjectsList: values[0].value.companyProjects,
              companyAdminsDetail: values[1].value.compAdminsOverall,
              companiesList: values[1].value.compAdminsOverall.filter(
                (admin) => admin.EmpId === loggedInUser.EmpId
              ), // filter the company admins and company details array to get records where emp id matched the logged in user emp id
            },
          });
        }

        // setCompaniesListDropdown(values[2]);
        // filter fetch response from company admins table to return only the companies for which the logged in user is just an company Admin
        // Fetch list of all company admins and their respective company details
        // setCompanyAdminsDet(values[1].compAdminsOverall);
        // setIsLoading(false);
      }
    );
  });
  //   resolvePromises();
  useEffect(() => {
    resolvePromises();
  }, []);

  //   // Show loading component while data is being fetched
  //   if (isLoading) {
  //     return <LoadingData />;
  //   }

  // Choose company from filter dropdown and update state
  const selectCompanyFilter = (e) => {
    let selectedCompanyId =
      e.target[e.target.selectedIndex].getAttribute("data-id");
    console.log(selectedCompanyId);

    // dispatch state action to update the selected company Id and filter list of projects in state to only return projects that share the selected company Id
    dispatchData({
      type: "chooseCompanyAndFilterProjects",
      companyId: selectedCompanyId,
    });
  };

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
          {/* {console.log(companiesArr)} */}
          {console.log(dataState)}
          {/* Date Range Filter Form */}
          <form method="POST" className="invoice-filter-form">
            <fieldset>
              <label htmlFor="company-selection">Company</label>
              <select
                id="company-selection"
                name="company-selection"
                typeof="text"
                onChange={selectCompanyFilter}
              >
                <option value=""></option>
                {/* map over list of companies */}
                {dataState.companiesList.map((company, i) => {
                  return (
                    <option
                      key={i}
                      value={company.CompanyName}
                      data-id={company.CompanyId}
                    >
                      {company.CompanyName}
                    </option>
                  );
                })}
              </select>
            </fieldset>
            <fieldset
              style={{
                display: dataState.selectedCompanyId === "" ? "none" : "block",
              }}
            >
              <label htmlFor="project-selection">Project</label>
              <select
                id="project-selection"
                name="project-selection"
                typeof="text"
              >
                <option value=""></option>
                {/* map over list of company projects */}
              </select>
            </fieldset>

            <fieldset
              className="invoice-date-rage-form-group"
              style={{
                display:
                  dataState.selectedCompanyId === "" ||
                  dataState.selectedProjectSowId == ""
                    ? "none"
                    : "block",
              }}
            >
              <h5>Date Range</h5>
              <div>
                <div>
                  <label htmlFor="date-filter-from">Start Date</label>
                  <input
                    id="date-filter-from"
                    name="date-filter-from"
                    type="date"
                  />
                </div>

                <div>
                  <div>
                    <label htmlFor="date-filter-to">End Date</label>
                    <input
                      id="date-filter-to"
                      name="date-filter-to"
                      type="date"
                    />
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
          {/* END Date Range Filter Form */}

          {/* Hide the create invoice component untill all filter fields are filled out */}

          {dataState.selectedCompanyId === "" ||
          dataState.selectedProjectSowId === "" ||
          dataState.dateRangeFrom === "" ||
          dataState.dateRangeTo === "" ? (
            <></>
          ) : (
            <CreateTimesheetInvoice />
          )}
        </>
      ) : (
        <>"This is the Blank Invoice UI section</>
      )}
    </section>
  );
}

export default NewInvoice;
