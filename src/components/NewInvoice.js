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
      console.log("initialize state");
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

      // Filter projects arr by action.companyId and return only the projects associated with that companyId

      let filteredProjects = state.companyProjectsList.filter((project) => {
        return project.CompanyId === action.companyId;
      });
      return {
        ...state,
        selectedCompanyId: action.companyId,
        companyProjectsList: filteredProjects,
      };
    }
    case "chooseProject": {
      // set selectedProjectSowId
      console.log("choose project reducer case", state);
      console.log(action);
      return {
        ...state,
        selectedProjectSowId: action.data.sowId,
        selectedProjectName: action.data.projectName,
      };
    }
    case "chooseDateFrom": {
      // set dateRangeFrom to selected date
      console.log("choose date from reducer case", state);

      return {
        ...state,
        dateRangeFrom: action.dateFrom,
      };
    }
    case "chooseDateTo": {
      // set dateRangeTo to selected date
      console.log("choose date to reducer case", state);

      return {
        ...state,
        dateRangeTo: action.dateTo,
      };
    }
    case "filterByProject": {
      console.log(action);

      return {
        ...state,
        filteredHours: [
          ...state.filteredHours,
          { projectName: action.projectName, data: action.data },
        ],
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function NewInvoice(props) {
  let initialDataState = {
    selectedCompanyId: "",
    selectedCompanyName: "",
    selectedProjectSowId: "",
    selectedProjectName: "",
    companiesList: [],
    companyProjectsList: [],
    companyAdminsDetail: [],
    filteredHours: [],
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
        setIsLoading(false);
      }
    );
  });
  //   resolvePromises();
  useEffect(() => {
    console.log("use effect run");
    resolvePromises();
  }, []);

  // Show loading component while data is being fetched
  if (isLoading) {
    return <LoadingData />;
  }

  // Choose company from filter dropdown and update state
  const selectCompanyFilter = (e) => {
    let selectedCompanyId =
      e.target[e.target.selectedIndex].getAttribute("data-companyid");
    console.log(selectedCompanyId);

    let selectedCompanyName =
      e.target[e.target.selectedIndex].getAttribute("value");
    console.log(selectedCompanyName);
    // dispatch state action to update the selected company Id and filter list of projects in state to only return projects that share the selected company Id
    dispatchData({
      type: "chooseCompanyAndFilterProjects",
      companyId: selectedCompanyId,
    });
  };

  // Choose company project from dropdown and update state
  const selectProjectFilter = (e) => {
    // get project SOW Id
    let selectedProjectSowId =
      e.target[e.target.selectedIndex].getAttribute("data-sowid");
    console.log(selectedProjectSowId);

    // get the name of the selected project
    let selectedProjectName =
      e.target[e.target.selectedIndex].getAttribute("value");
    // dispatch state action and set selected project sow id to state
    //  dispatchData({
    //    type: "chooseProject",
    //      sowId: selectedProjectSowId,

    //  });
    dispatchData({
      type: "chooseProject",
      data: { sowId: selectedProjectSowId, projectName: selectedProjectName },
    });
  };

  // =====================================
  // HANDLE FILTER BY PROJECT
  // =====================================

  // filter Timesheet data to get records for selected sow Id
  const getRecordsPerProject = (name, id, arr) => {
    console.log("function to filter hours by selected project");
    if (
      !dataState.filteredHours.some((project) => project.hasOwnProperty(name))
    ) {
      // setFilteredHours([
      //   ...dataState.filteredHours,
      //   {
      //     projectName: record.ProjectCategory,
      //     data: [],
      //   },
      // ]);
      dispatchData({
        type: "filterByProject",
        action: { projectName: name, data: [] },
      });
    }
    // filter resulting array per company id filter and sow id filter
    let filterHrs = arr.filter((record, i) => {
      return record.SowId === id;
    });
    console.log(filterHrs);

    // Group results by name and task area
    let groupedData = groupFilteredData(filterHrs);
    // setFilteredHoursArray(groupedData);
    console.log(groupedData);
    // setFilteredHours(...dataState.filteredHours, {
    //   projectName: selectedProjectName,
    //   data: groupedData,
    // });

    console.log("state of hours to group for UI:", dataState.filteredHours);
  };

  // Group data by resource - per project, all the hours billed user. This gets pushed to filtered hours array that will be looped over to render UI
  const groupFilteredData = (arr) => {
    let grouped = {};
    arr.forEach((obj) => {
      let fullName = obj.FullName;

      if (!grouped[fullName]) {
        grouped[fullName] = [];
      }

      grouped[fullName].push(obj);
    });
    return grouped;
  };

  // =====================================

  // Choose filter for date range start
  const selectDateFromFilter = (e) => {
    console.log(e.target.value);
    let filterDateFrom = e.target.value;

    dispatchData({
      type: "chooseDateFrom",
      dateFrom: filterDateFrom,
    });
  };

  // function to handle both from and to date filters
  const selectDateRangeFilter = (e) => {
    let filterDateFrom = "";
    let filterDateTo = "";
    if (e.target.name === "date-filter-from") {
      filterDateFrom = e.target.value;
    } else if (e.target.name === "date-filter-to") {
      filterDateTo = e.target.value;
    }

    console.log(filterDateFrom);
    console.log(filterDateTo);
  };

  // Choose filter for date range end
  const selectDateToFilter = (e) => {
    console.log(e.target.value);
    let filterDateTo = e.target.value;

    dispatchData({
      type: "chooseDateTo",
      dateTo: filterDateTo,
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
          {console.log("state data", dataState)}
          {/* Date Range Filter Form */}
          <form method="POST" className="invoice-filter-form">
            <fieldset className="invoice-filter--company">
              <label htmlFor="company-selection">Company</label>
              <select
                id="company-selection"
                name="company-selection"
                typeof="text"
                onChange={selectCompanyFilter}
              >
                <option value=""></option>
                {/* map over list of companies */}
                {console.log(dataState)}
                {dataState.companiesList.map((company, i) => {
                  return (
                    <option
                      key={i}
                      value={company.CompanyName}
                      data-companyid={company.CompanyId}
                    >
                      {company.CompanyName}
                    </option>
                  );
                })}
              </select>
            </fieldset>
            <fieldset
              className="invoice-filter--project"
              style={{
                display: dataState.selectedCompanyId === "" ? "none" : "flex",
              }}
            >
              <label htmlFor="project-selection">Project</label>
              <select
                id="project-selection"
                name="project-selection"
                typeof="text"
                onChange={selectProjectFilter}
              >
                <option value=""></option>
                {dataState.companyProjectsList.map((project, i) => {
                  return (
                    <option
                      key={i}
                      value={project.ProjectCategory}
                      data-sowid={project.SowId}
                    >
                      {project.ProjectCategory}
                    </option>
                  );
                })}
              </select>
            </fieldset>

            <fieldset
              className="invoice-date-rage-form-group"
              style={{
                display:
                  dataState.selectedCompanyId === "" ||
                  dataState.selectedProjectSowId == ""
                    ? "none"
                    : "flex",
              }}
            >
              <h5>Date Range</h5>
              <div className="invoice-filter-date-wrapper">
                <div>
                  <label htmlFor="date-filter-from">Start Date</label>
                  <input
                    id="date-filter-from"
                    name="date-filter-from"
                    type="date"
                    onChange={selectDateFromFilter}
                  />
                </div>

                <div>
                  <div>
                    <label htmlFor="date-filter-to">End Date</label>
                    <input
                      id="date-filter-to"
                      name="date-filter-to"
                      type="date"
                      onChange={selectDateToFilter}
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
            <CreateTimesheetInvoice
              companyId={dataState.selectedCompanyId}
              sowId={dataState.selectedProjectSowId}
              from={dataState.dateRangeFrom}
              to={dataState.dateRangeTo}
              projectName={dataState.selectedProjectName}
              filterByProject={getRecordsPerProject}
            />
          )}
        </>
      ) : (
        <>"This is the Blank Invoice UI section</>
      )}
    </section>
  );
}

export default NewInvoice;
