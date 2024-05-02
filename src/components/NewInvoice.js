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
import { getTimesheetEntryDetails } from "../hooks/FetchData";
import {
  getCompanies,
  fetchCompanyAdmins,
  getCompanyProjects,
} from "../hooks/FetchData";
import AlertMessage from "./AlertMessage";
import { GridColumnsPanel } from "@mui/x-data-grid";

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
      console.log(action);
      // Filter projects arr by action.companyId and return only the projects associated with that companyId

      let filteredProjects = state.companyProjectsList.filter((project) => {
        return project.CompanyId === action.data.companyId;
      });
      return {
        ...state,
        selectedCompanyId: action.data.companyId,
        selectedCompanyName: action.data.companyName,
        selectedCompanyProjects: filteredProjects,
        selectedProjectSowId: "",
        selectedProjectName: "",
        dateRangeFrom: "",
        dateRangeTo: "",
        filteredHours: [],
      };
    }
    case "chooseProject": {
      // set selectedProjectSowId
      console.log(action);
      return {
        ...state,
        selectedProjectSowId: action.data.sowId,
        selectedProjectName: action.data.projectName,
      };
    }
    case "chooseDateFrom": {
      // set dateRangeFrom to selected date
      console.log("updating state for DATE FROM filter");
      return {
        ...state,
        dateRangeFrom: action.data,
      };
    }
    case "chooseDateTo": {
      // set dateRangeTo to selected date
      console.log("updating state for DATE TO filter");

      return {
        ...state,
        dateRangeTo: action.data,
      };
    }
    case "filterByProject": {
      console.log("filter project dispatch - action:", action, "state:", state);

      // hrsArr.push({
      //   projectName: action.action.projectName,
      //   data: action.action.data,
      // });
      console.log("hrs by projet:", state.filteredHours);
      let projectHrs = state.filteredHours;
      console.log(projectHrs);
      projectHrs.push({
        projectName: action.data.projectName,
        projectSowId: action.data.projectSowId,
        data: action.data.data,
      });
      let trimmedArr = Object.values(
        projectHrs.reduce((c, e) => {
          if (!c[e.projectName]) c[e.projectName] = e;
          return c;
        }, {})
      );
      console.log("trying to filter out identical entries", trimmedArr);
      return {
        ...state,
        filteredHours: trimmedArr,
      };
    }
    // Update filteredHours Array with what is passed as action.data (including an empty array)
    case "updateFilteredHrsArr": {
      return {
        ...state,
        filteredHours: action.data,
      };
    }
    case "setDateRangeData": {
      console.log(action);
      return {
        ...state,
        dataPerDateRangeFilter: action.data,
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
    selectedCompanyProjects: [],
    companyAdminsDetail: [],
    dataPerDateRangeFilter: [],
    filteredHours: [],
    dateRangeFrom: "",
    dateRangeTo: "",
  };
  let loggedInUser = props.loggedInUserInfo;
  let [isLoading, setIsLoading] = useState(true);
  let [dataState, dispatchData] = useReducer(dataReducer, initialDataState);
  let selectProjectDropdown = useRef();
  let alertMessage = useRef();
  let [message, setMessage] = useState("");
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
  }, []);

  const checkStateProject = () => {
    console.log("Check project in state via useEffect");
    if (dataState.selectedProjectSowId !== "") {
      dataState.filteredHours.map((project) => {
        if (project.projectSowId === dataState.selectedProjectSowId) {
          alert("project already added to the invoice");
        } else {
          checkFilters();
        }
      });
    }
  };

  const checkStateDates = (e) => {
    console.log("Check dates in state via useEffect");
    if (
      dataState.dateRangeFrom !== "" &&
      // dataState.dateRangeFrom !== e.target.value &&
      dataState.dateRangeTo !== ""
    ) {
      console.log("date fetch triggered", dataState.dateRangeTo);
      // send dispatch to update state - clear the filteredHours array with empty array

      // TO-DO: set a promise to wait for the dispatch to state to to be success THEN trigger checkFilters()

      dispatchPromiseClearHrsArr()
        .then((res) => {
          // checkFilters()s
          console.log("checkFilters() call", dataState);
          checkFilters();
        })
        .catch((err) => alert("ERROR FILTERING"));
    }
  };
  //   resolvePromises();
  useEffect(() => {
    console.log("use effect run initial fetch calls");
    resolvePromises();
  }, []);

  useEffect(() => {
    checkStateDates();
  }, [dataState.dateRangeFrom, dataState.dateRangeTo]);

  useEffect(() => {
    checkStateProject();
  }, [dataState.selectedProjectSowId]);
  // useEffect(() => {
  //   checkFilters();
  // }, [
  //   dataState.selectedCompanyId,
  //   dataState.selectedProjectSowId,
  //   dataState.dateRangeFrom,
  //   dataState.dateRangeTo,
  // ]);

  const allFiltersSet = (...filters) => {
    let [
      selectedCompanyId,
      selectedProjectSowId,
      dateRangeFrom,
      dateRangeTo,
      selectedProjectName,
    ] = filters;
    console.log(
      "trigger fetch. all filters set:",
      selectedCompanyId,
      selectedProjectSowId,
      dateRangeFrom,
      dateRangeTo,
      selectedProjectName
    );

    fetchTSData(
      dateRangeFrom,
      dateRangeTo,
      selectedCompanyId,
      selectedProjectSowId,
      selectedProjectName
    );
  };

  // check to see if filters are filled out
  const checkFilters = (e) => {
    console.log("checkFilters function to check if all filters are filled out");
    // e.preventDefault();
    // if (!dataState.selectedCompanyId) {
    //   alert("Please select a company from the dropdown.");
    //   return false;
    // } else if (!dataState.selectedProjectSowId) {
    //   alert("Please select a project from the dropdown.");
    //   return false;
    // } else if (!dataState.dateRangeFrom) {
    //   alert("Please select a FROM date from the date from picker.");
    //   return false;
    // } else if (!dataState.dateRangeTo) {
    //   alert("Please select a TO date from the date from picker.");
    //   return false;
    // } else
    if (
      dataState.selectedCompanyId &&
      dataState.selectedProjectSowId &&
      dataState.dateRangeFrom &&
      dataState.dateRangeTo
    ) {
      console.log("all filters are filled out");
      allFiltersSet(
        dataState.selectedCompanyId,
        dataState.selectedProjectSowId,
        dataState.dateRangeFrom,
        dataState.dateRangeTo,
        dataState.selectedProjectName
      );
      return true;
    } else {
      return false;
    }
  };

  // Show loading component while data is being fetched
  if (isLoading) {
    return <LoadingData bgColor={"#ffe4f1"} />;
  }

  // Choose company from filter dropdown and update state
  const selectCompanyFilter = (e) => {
    if (e.target.value === "") {
      setMessage(alertMessageDisplay("Please, select a company to continue."));
      alertMessage.current.showModal();
      return;
    }
    // set state to track selected company Id filter selection
    let selectedCompanyId =
      e.target[e.target.selectedIndex].getAttribute("data-companyid");
    console.log(selectedCompanyId);
    let selectedCompanyName =
      e.target[e.target.selectedIndex].getAttribute("value");
    console.log(selectedCompanyName);

    // force the project dropdown to initialize as an empty value instead of a choice automatically rendering when company is changed
    // added a ref to the project dropdown and will set its value to empty string when company changes
    selectProjectDropdown.current.value = "";
    // dispatch state action to update the selected company Id and filter list of projects in state to only return projects that share the selected company Id
    dispatchData({
      type: "chooseCompanyAndFilterProjects",
      data: { companyId: selectedCompanyId, companyName: selectedCompanyName },
    });
  };

  // Choose company project from dropdown and update state
  const selectProjectFilter = (e) => {
    if (e.target.value === "") {
      setMessage(alertMessageDisplay("Please, select a project to continue."));
      alertMessage.current.showModal();
      return;
    }
    console.log(e.target.value);
    // set state to track selected project id and selected project name filter selection
    // get project SOW Id
    let selectedProjectSowId =
      e.target[e.target.selectedIndex].getAttribute("data-sowid");
    console.log(selectedProjectSowId);

    // get the name of the selected project
    let selectedProjectName =
      e.target[e.target.selectedIndex].getAttribute("value");

    // If state array that's holding all hours between filter date range is NOT empty, in other words, there is TS data in array
    // if (dataState.dataPerDateRangeFilter.length > 0) {
    //   getRecordsPerProject(
    //     selectedProjectName,
    //     selectedProjectSowId,
    //     dataState.dataPerDateRangeFilter
    //   );
    // }

    // Check to see if all filters are filled out - user may be choosing a filter out of order

    // dispatch state action and set selected project sow id to state
    dispatchData({
      type: "chooseProject",
      data: { sowId: selectedProjectSowId, projectName: selectedProjectName },
    });

    // if currently selected project sow id is not empty string - a proejct has not yet been selected
    // if (dataState.selectedProjectSowId !== "") {
    checkFilters();
    // }
  };

  // Set state object property array for TS records betweeen date range filter for selectedCompanyId and selectedProjectSowId
  const handleDispatchDateRangeData = (arr) => {
    dispatchData({
      type: "setDateRangeData",
      data: arr,
    });
  };

  const dispatchPromiseClearHrsArr = () => {
    return new Promise((res, rej) => {
      console.log("resolvePromise");
      // send dispatch to clear filterHours state array
      dispatchData({
        type: "updateFilteredHrsArr",
        data: [],
      });
      res("Success");
    });
  };

  const dispatchPromiseDates = (type, val) => {
    console.log("dispatch promise dates");
    return new Promise((res, rej) => {
      dispatchData({
        type: type,
        data: val,
      });
      res();
    });
  };

  // Choose filter for date range start
  const selectDateFromFilter = (e) => {
    // set state to track date from filter selection
    console.log(e.target.value);
    let filterDateFrom = e.target.value;
    dispatchPromiseDates("chooseDateFrom", filterDateFrom)
      .then((res) => {
        console.log("date FROM promise success", res);
        //  console.log("State variable updated successfully.");
        console.log("State value after update:", dataState);
        checkStateDates(e);
      })
      .catch((err) => {
        alert("There was a problem setting the from date filter.");
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
    // set state to track date to filter selection
    console.log(e.target.value);
    let filterDateTo = e.target.value;

    dispatchPromiseDates("chooseDateTo", filterDateTo)
      .then((res) => {
        console.log("update to state successful");
        console.log("dispatch promise date to filter success", dataState);
        checkStateDates(e);
      })
      .catch((err) => alert("Unable to set date to filter.", err));
  };

  // function to run to get TS records per filters
  // Should I run function with useMemo hook? or useCallback hook?
  // const fetchTSData = (companyId, sowId, from, to) => {
  const fetchTSData = (from, to, companyId, sowId, projectName) => {
    console.log("trigger fetch to get data", from, to);

    // resolve the promise in order to get the hours billed array. When promise is resolved, filter response array with filter values above and return new array - array of objects, each object is a user with properties: name, totalBilledHours, details: array containing all sub task entries for a project
    Promise.allSettled([
      getTimesheetEntryDetails(from, to, companyId),
      // getTimesheetEntryDetails(from, to, companyId, sowId),
    ]).then((values) => {
      console.log("promise to get TS data resolved:", values);

      // Assign all Timesheet data per filters - from, to and companyId - to state array
      // handleDispatchDateRangeData(values[0].value);
      // trigger function to filter out project data sharing the selected project sow id
      getRecordsPerProject(projectName, sowId, values[0].value);
    });
  };

  // =====================================
  // HANDLE FILTER BY PROJECT
  // =====================================

  // filter Timesheet data to get records for selected sow Id
  const getRecordsPerProject = (name, id, arr) => {
    console.log("function to filter hours by selected project");
    // if (
    //   !dataState.filteredHours.some((project) => project.hasOwnProperty(name))
    // ) {
    //   // setFilteredHours([
    //   //   ...dataState.filteredHours,
    //   //   {
    //   //     projectName: record.ProjectCategory,
    //   //     data: [],
    //   //   },
    //   // ]);
    //   dispatchData({
    //     type: "filterByProject",
    //     action: { projectName: name, data: [] },
    //   });
    // }

    // If input array is not an empty array, in other words, there is TS data in array
    // if (arr.length > 0) {
    // filter resulting array per company id filter and sow id filter
    let filterHrs = arr.filter((record, i) => {
      return record.SowId === id;
    });
    console.log("Filter hours by sowID:", filterHrs);
    if (filterHrs.length === 0) {
      setMessage(
        alertMessageDisplay(
          `There is no data for the following project: ${name}.`
        )
      );
      alertMessage.current.showModal();
      return;
    }
    // Group results by name and task area
    let groupedData = groupFilteredData(filterHrs);
    // setFilteredHoursArray(groupedData);
    console.log("group filter hours by user", groupedData);
    // setFilteredHours(...dataState.filteredHours, {
    //   projectName: selectedProjectName,
    //   data: groupedData,
    // });
    dispatchData({
      type: "filterByProject",
      data: { projectName: name, projectSowId: id, data: groupedData },
    });

    // console.log("state of hours to group for UI:", dataState.filteredHours);
    // }
  };

  // Group data by resource - per project, all the hours billed user. This gets pushed to filtered hours array that will be looped over to render UI
  const groupFilteredData = (arr) => {
    // let grouped = {};
    // arr.forEach((obj) => {
    //   let fullName = obj.FullName;

    //   if (!grouped[fullName]) {
    //     grouped[fullName] = [];
    //   }

    //   grouped[fullName].push(obj);
    // });
    // return grouped;

    // Add Role, Rate and Amount fields as properties for user record object for Invoice workkflow
    let updatedArr = arr.map((record) => {
      return { ...record, Rate: 0, Role: "", Amount: 0 };
    });
    console.log(updatedArr);

    let consolidatedArr = Object.values(
      updatedArr.reduce((prevRec, currRecord) => {
        if (!prevRec[currRecord.EmpId]) {
          prevRec[currRecord.EmpId] = {
            name: currRecord.FullName,
            data: [],
          };
        }
        prevRec[currRecord.EmpId].data.push(currRecord);
        return prevRec;
      }, {})
    );
    return consolidatedArr;
  };
  // =====================================
  // =====================================

  const dispatchUpdateToFilteredHrsArr = (arr) => {
    dispatchData({
      type: "updateFilteredHrsArr",
      data: arr,
    });
  };

  const alertMessageDisplay = (entry) => {
    return entry;
  };

  const closeAlert = () => {
    alertMessage.current.close();
  };

  return (
    <>
      <AlertMessage ref={alertMessage} close={closeAlert} message={message} />
      <section
        className="ManageInvoices--new-invoice-tab-content"
        // set style height to 100dvh if filteredHours.length = 1 or less.
        //  When user selects a company from dropdown, in state, filteredHours is updated to object with empty data array and empty strings for project name and sowId properites
        style={{
          height: dataState.filteredHours.length < 1 ? "100dvh" : "100%",
        }}
      >
        <div className="ManageInvoices--new-invoice-tab-inner-content">
          <button
            className="ManageInvoices--create-new-invoice-btn"
            type="button"
            onClick={(e) => props.openNewInvoiceModal(e)}
            style={{ display: props.newInvoiceType === "" ? "flex" : "none" }}
          >
            <FontAwesomeIcon
              className="create-new-invoice-icon"
              icon={faPlus}
            />
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
              <form
                method="POST"
                className="invoice-filter-form"
                // onSubmit={(e) => checkFilters(e)}
              >
                <fieldset className="invoice-filter--company">
                  <label htmlFor="company-selection">Company</label>
                  <select
                    id="company-selection"
                    name="company-selection"
                    typeof="text"
                    onChange={selectCompanyFilter}
                    required
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
                    display:
                      dataState.selectedCompanyId === "" ? "none" : "flex",
                  }}
                >
                  <label htmlFor="project-selection">Project</label>
                  <select
                    id="project-selection"
                    name="project-selection"
                    typeof="text"
                    ref={selectProjectDropdown}
                    onChange={selectProjectFilter}
                    required
                  >
                    <option value=""></option>
                    {dataState.selectedCompanyProjects.map((project, i) => {
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
                  className="invoice-date-range-form-group"
                  style={{
                    display:
                      // dataState.selectedCompanyId === "" ||
                      dataState.selectedProjectSowId == "" ? "none" : "flex",
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
                        value={dataState.dateRangeFrom}
                        onChange={selectDateFromFilter}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="date-filter-to">End Date</label>
                      <input
                        id="date-filter-to"
                        name="date-filter-to"
                        type="date"
                        value={dataState.dateRangeTo}
                        onChange={selectDateToFilter}
                        required
                      />
                    </div>
                  </div>
                </fieldset>
                {/* <input
                  className="invoice--apply-filters-btn"
                  value="Apply Filters"
                  type="submit"
                  // disabled={
                  //   dataState.selectedCompanyId === "" ||
                  //   dataState.selectedProjectSowId === "" ||
                  //   dataState.dateRangeFrom === "" ||
                  //   dataState.dateRangeTo === ""
                  //     ? "true"
                  //     : "false"
                  // }
                  style={{
                    display:
                      dataState.dateRangeFrom === "" ||
                      dataState.dateRangeTo === ""
                        ? "none"
                        : "flex",
                  }}
                /> */}
              </form>
              {/* END Date Range Filter Form */}

              {/* Hide the create invoice component untill all filter fields are filled out */}

              {dataState.selectedCompanyId === "" ||
              dataState.selectedProjectSowId === "" ||
              dataState.dateRangeFrom === "" ||
              dataState.dateRangeTo === "" ? (
                <></>
              ) : (
                <div className="new-invoice--from-timesheet-container">
                  <CreateTimesheetInvoice
                    // companyId={dataState.selectedCompanyId}
                    companyName={dataState.selectedCompanyName}
                    // sowId={dataState.selectedProjectSowId}
                    // projectName={dataState.selectedProjectName}
                    from={dataState.dateRangeFrom}
                    to={dataState.dateRangeTo}
                    filteredHours={dataState.filteredHours}
                    checkFilters={checkFilters}
                    updateFilteredHrsArr={dispatchUpdateToFilteredHrsArr}
                    // filterByProject={getRecordsPerProject}
                    // setDateRangeData={handleDispatchDateRangeData}
                  />
                </div>
              )}
            </>
          ) : (
            <>"This is the Blank Invoice UI section</>
          )}
        </div>
      </section>
    </>
  );
}

export default NewInvoice;
