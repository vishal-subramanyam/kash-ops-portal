import React, { useState, useEffect, useRef, useCallback } from "react";
import AlertMessage from "../components/AlertMessage";
import "../assets/styles/Styles.css";
import { Link } from "react-router-dom";
import { domain } from "../assets/api/apiEndpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function UpdateTimesheet(props) {
  let selectedProjectId; // To add to Timesheets table - SowId
  let selectedSubAssignmentId;
  let selectedSubAssignmentName; // To add to Timesheets table - SubAssignment
  let selectedTaskBySubAssignmentName; // To add to Timesheets table - SubAssignmentSegment1
  let newTimesheetRecord = {
    Billable: "",
    EmpId: "",
    FridayHours: "0.00",
    MondayHours: "0.00",
    NonBillableReason: "",
    PeriodStartDate: "",
    SaturdayHours: "0.00",
    SowId: "",
    CompanyName: "",
    SubAssignment: "",
    SubAssignmentSegment1: "",
    SubAssignmentSegment2: "",
    TicketNum: "",
    SundayHours: "0.00",
    ThursdayHours: "0.00",
    TimesheetStatusEntry: "",
    TuesdayHours: "0.00",
    WednesdayHours: "0.00",
  };
  // let subAssignmentByProjectArr = [];
  let subAssignmentByProjectFiltered = [];
  let reportingPeriodStartDate = useRef();
  let alertMessage = useRef();
  let [message, setMessage] = useState("");
  let [reportingPeriodStartDateState, setReportingPeriodStartDateState] =
    useState();
  let submittedTimesheetToDBDialogue = useRef();
  let confirmationModalEmployeeName = useRef();
  let selectedEmployee = useRef();
  let selectedProject = useRef();
  let taskTicketNumber = useRef();
  let TimesheetTableBody = useRef();
  // let TimesheetTableRow = useRef(null);
  let rowTotal = 0;
  let mondaysHours = 0;
  let tuesdaysHours = 0;
  let wednesdaysHours = 0;
  let thursdaysHours = 0;
  let fridaysHours = 0;
  let saturdaysHours = 0;
  let sundaysHours = 0;
  let [MondayHours, setMondayHours] = useState(0);
  let [TuesdayHours, setTuesdayHours] = useState(0);
  let [WednesdayHours, setWednesdayHours] = useState(0);
  let [ThursdayHours, setThursdayHours] = useState(0);
  let [FridayHours, setFridayHours] = useState(0);
  let [SaturdayHours, setSaturdayHours] = useState(0);
  let [SundayHours, setSundayHours] = useState(0);
  let [hoursGrandTotal, setHoursGrandTotal] = useState(0);
  let [selectedProjectCompanyNameState, setSelectedProjectCompanyNameState] =
    useState("");
  let [selectedProjectSOWIDState, setSelectedProjectSOWIDState] = useState("");
  let [selectedEmployeeIdState, setSelectedEmployeeIdState] = useState();
  let [selectedSubAssignmentNameState, setSelectedSubAssignmentNameState] =
    useState("");
  // let [taskBySubAssignmentState, setTaskBySubAssignmentState] = useState("");
  let subAssignmentTask = useRef();
  let [subAssignmentTitleDescriptor, setSubAssignmentTitleDescriptor] =
    useState("");
  let [allTimesheetRecords, setAlllTimesheetRecords] = useState([]);
  let [timesheetRecordsByEmployee, setTimesheetRecordsByEmployee] = useState(
    []
  );
  let [timesheetRecordsToDatabase, setTimesheetRecordsToDatabase] = useState(
    []
  );
  let [currentPrevMonday, setCurrentPrevMonday] = useState(() => {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() - ((todayDate.getDay() + 6) % 7));
    let prevMondayFormat = todayDate.toISOString().split("T")[0];
    return prevMondayFormat;
  }); // To add to Timesheets table - PeriodStartDate
  let [projectAndCompanyInfoArr, setProjectAndCompanyInfoArr] = useState([]);
  let [subAssignmentByProjectArr, setSubAssignmentByProjectArr] = useState([]);
  let [tasksBySubAssignment, setTasksBySubAssignment] = useState([]);
  let [allEmployeesArr, setAllEmployeesArr] = useState([]);
  // let basicUserInfo = allEmployeesArr.filter((user) => {
  //   return user.EmpId === props.loggedInUser.EmpId;
  // });

  // create variable for logged in user details to use in conditional display of employee dropdown
  let basicUserInfo = props.loggedInUser;

  useEffect(() => {
    getAllProjects();
    getAllEmployees();
    console.log("period start date monday", currentPrevMonday);
  }, []);

  const getAllEmployees = () => {
    fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _keyword_: "KASH_OPERATIONS_USER_TABLE" }),
    })
      .then((res) => res.json())
      .then((res) => {
        setAllEmployeesArr(res.data);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(
            `Unable to get users from database. Error: ${err}`
          )
        );
        alertMessage.current.showModal();
      });
  };

  const getAllProjects = () => {
    fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "PROJECTS_AND_COMPANY_INFO_TABLE",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setProjectAndCompanyInfoArr(res.data);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(
            `Unable to get projects from database. Error: ${err}`
          )
        );
        alertMessage.current.showModal();
      });
  };

  const getColumnTotals = (records) => {
    console.log(records);
    for (let i = 0; i < records.length; i++) {
      rowTotal +=
        parseFloat(records[i].MondayHours) +
        parseFloat(records[i].TuesdayHours) +
        parseFloat(records[i].WednesdayHours) +
        parseFloat(records[i].ThursdayHours) +
        parseFloat(records[i].FridayHours) +
        parseFloat(records[i].SaturdayHours) +
        parseFloat(records[i].SundayHours);

      mondaysHours += parseFloat(records[i].MondayHours);
      tuesdaysHours += parseFloat(records[i].TuesdayHours);
      wednesdaysHours += parseFloat(records[i].WednesdayHours);
      thursdaysHours += parseFloat(records[i].ThursdayHours);
      fridaysHours += parseFloat(records[i].FridayHours);
      saturdaysHours += parseFloat(records[i].SaturdayHours);
      sundaysHours += parseFloat(records[i].SundayHours);
    }
    setMondayHours(mondaysHours);
    setTuesdayHours(tuesdaysHours);
    setWednesdayHours(wednesdaysHours);
    setThursdayHours(thursdaysHours);
    setFridayHours(fridaysHours);
    setSaturdayHours(saturdaysHours);
    setSundayHours(sundaysHours);
    setHoursGrandTotal(rowTotal);
  };

  const getTimesheetByEmployeeId = async (id, e) => {
    // console.log("get timesheet by emp id", e.target);
    validateRequiredInputs(e.target);
    // console.log("get TS by employee from DB", id);
    await fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "TIMESHEETS_AND_COMPANY_INFO_TABLE",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // save all timesheet records to state
        // setAlllTimesheetRecords(res.data);

        // just show the timesheet data that matches the employee selected in dropdown and period start date
        let filteredTimesheet = res.data.filter((timesheet) => {
          return (
            id === timesheet.EmpId &&
            reportingPeriodStartDate.current.value === timesheet.PeriodStartDate
          );
        });
        console.log(
          "current timesheets filtered by selected employee and period start date",
          filteredTimesheet
        );
        setTimesheetRecordsByEmployee(filteredTimesheet);
        getColumnTotals(filteredTimesheet);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(`Unable to load timesheet. Error: ${err}`)
        );
        alertMessage.current.showModal();
      });
  };

  const getSelectedEmployeeId = (e) => {
    validateRequiredInputs(e.target);
    let selectedEmployeeId =
      e.target[e.target.selectedIndex].getAttribute("data-employeeid");
    setSelectedEmployeeIdState(selectedEmployeeId);
    // fetch timesheets table for selected employee Id and display in table
    getTimesheetByEmployeeId(selectedEmployeeId, e);
  };

  const getProjectSubCategories = async (projectId) => {
    await fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "SUB_CATEGORIES_BY_PROJECT_ID",
        SowId: projectId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // subAssignmentByProjectArr = res.data;

        // filter sub assignments to remove duplicates and assign to filtered array
        subAssignmentByProjectFiltered = Object.values(
          res.data.reduce((c, e) => {
            if (!c[e.SubTaskTitle]) c[e.SubTaskTitle] = e;
            return c;
          }, {})
        );
        console.log(subAssignmentByProjectFiltered);
        setSubAssignmentByProjectArr(subAssignmentByProjectFiltered);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(
            `Unable to get project sub categories. Error: ${err}`
          )
        );
        alertMessage.current.showModal();
      });
  };

  const getTasksBySubAssignment = async (selectedSubAssignmentId) => {
    await fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "KASH_OPERATIONS_PROJECT_SUB_CATEGORY_TABLE",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        let filterTasks = res.data.filter((task) => {
          return selectedSubAssignmentId === task.ProjectSubTaskId;
        });
        setTasksBySubAssignment(filterTasks);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(
            `Unable to load sub category tasks. Error: ${err}`
          )
        );
        alertMessage.current.showModal();
      });
  };

  const getSelectedProjectData = async (e) => {
    validateRequiredInputs(e.target);

    selectedProjectId =
      e.target[e.target.selectedIndex].getAttribute("data-projectid");

    let selectedProjectDetails = e.target[e.target.selectedIndex].innerHTML;
    // Get Company name and save to state
    if (selectedProjectDetails) {
      let selectedProjectCompanyName = selectedProjectDetails.split(" -")[0];
      setSelectedProjectCompanyNameState(selectedProjectCompanyName);
      // Get SOW ID and save to state variable
      let selectedProjectSOWID = selectedProjectDetails.match(/\((.*)\)/).pop();
      setSelectedProjectSOWIDState(selectedProjectSOWID);
    }

    // update sub assignments heading to show selected project details
    setSubAssignmentTitleDescriptor(selectedProjectDetails);
    // get sub projects for selected project ID
    getProjectSubCategories(selectedProjectId);
  };

  const selectSubAssignment = (e) => {
    selectedSubAssignmentId =
      e.target[e.target.selectedIndex].getAttribute("data-subprojectid");
    selectedSubAssignmentName = e.target[e.target.selectedIndex].getAttribute(
      "data-subprojectname"
    );

    // Add sub assignment name to state array
    setSelectedSubAssignmentNameState(selectedSubAssignmentName);

    // query the sub assignments table and filter output by SubTaskTitle to get the list of task areas
    getTasksBySubAssignment(selectedSubAssignmentId);
  };

  const validateRequiredInputs = (input) => {
    // console.log(input);
    let inputArr = [];
    if (Array.isArray(input) === false) {
      input.classList.remove("timesheet-option_invalid");
    } else {
      for (const i of input) {
        if (i.element.checkValidity() === false) {
          console.log(i, " validity false");
          inputArr.push(i.label);
          i.element.classList.add("timesheet-option_invalid");
        } else {
          i.element.classList.remove("timesheet-option_invalid");
        }
        alertMessage.current.showModal();
        setMessage(
          alertMessageDisplay(
            `Fill out the ${inputArr.map((input) => input)} ${
              inputArr.length > 1 ? "fields" : "field"
            }.`
          )
        );
      }
    }
  };

  const addToStagingSheet = () => {
    console.log(
      selectedEmployee.current.value &&
        reportingPeriodStartDate.current.value &&
        selectedProject.current.value
    );
    if (
      selectedEmployee.current.value &&
      reportingPeriodStartDate.current.value &&
      selectedProject.current.value
    ) {
      newTimesheetRecord = {
        Billable: "",
        EmpId: selectedEmployeeIdState,
        FridayHours: "0.00",
        MondayHours: "0.00",
        NonBillableReason: "",
        PeriodStartDate: reportingPeriodStartDate.current.value,
        SaturdayHours: "0.00",
        SowId: selectedProjectSOWIDState,
        CompanyName: selectedProjectCompanyNameState,
        SubAssignment: selectedSubAssignmentNameState,
        SubAssignmentSegment1: subAssignmentTask.current.value,
        SubAssignmentSegment2: "",
        TicketNum: taskTicketNumber.current.value,
        SundayHours: "0.00",
        ThursdayHours: "0.00",
        TimesheetStatusEntry: "",
        TuesdayHours: "0.00",
        WednesdayHours: "0.00",
      };
      console.log("adding new record ", newTimesheetRecord);
      setTimesheetRecordsByEmployee((prevState) => [
        ...prevState,
        newTimesheetRecord,
      ]);
    } else {
      validateRequiredInputs([
        {
          label: "Employee",
          value: selectedEmployee.current.value,
          element: selectedEmployee.current,
        },
        {
          label: "Reporting Period Start Date",
          value: reportingPeriodStartDate.current.value,
          element: reportingPeriodStartDate.current,
        },
        {
          label: "Project Description",
          value: selectedProject.current.value,
          element: selectedProject.current,
        },
      ]);
    }
  };

  // update the timesheet by employee state array when the days of the week are changed in table
  const updateTimesheetRecord = (name, index) => (e) => {
    console.log(
      "updated day of the week",
      name,
      "with index of",
      index,
      "with value of",
      e.target.value
    );
    // if (e.target.value === "") {
    //   e.target.value = 0;
    // }
    let newArr = [...timesheetRecordsByEmployee];
    newArr[index][name] = e.target.value;
    console.log("updating TS by Emp state array that gets sent to DB", newArr);
    setTimesheetRecordsByEmployee(newArr);
    getColumnTotals(newArr);
  };

  const sendUploadTimesheetToDatabase = async (e) => {
    console.log(
      "current timesheet records by employee",
      timesheetRecordsByEmployee
    );
    let currentRecords = timesheetRecordsByEmployee.filter((record) => {
      return Boolean(record.TimesheetEntryId);
    });
    console.log(
      "current records in state array of timesheet records on TS entry id",
      currentRecords
    );

    let newRecords = timesheetRecordsByEmployee.filter((record) => {
      return !Boolean(record.TimesheetEntryId);
    });
    console.log(
      "new records by TSs for filtering TS By Employee state array",
      newRecords
    );
    await updateCurrentTimesheetRecord(currentRecords);
    await addNewTimesheetRecord(newRecords);
    getTimesheetByEmployeeId(selectedEmployeeIdState, e);
    showConfirmationModal();

    // reset the project, sub assignment and tasks dropdowns and ticket number fields
    selectedProject.current.value = "";
    taskTicketNumber.current.value = "";
    if (subAssignmentTask.current !== undefined) {
      subAssignmentTask.current.value = "";
    }
    setSubAssignmentTitleDescriptor("");
    setSelectedProjectCompanyNameState("");
    setSelectedProjectSOWIDState("");
    setSelectedSubAssignmentNameState();
    setSubAssignmentByProjectArr([]);
    setTasksBySubAssignment([]);
  };

  const updateCurrentTimesheetRecord = async (currentRecordArr) => {
    console.log("update existing timesheet records", currentRecordArr);
    try {
      const response = await fetch(
        `${domain}GenericTransactionService/processTransactionForUpdate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            data: currentRecordArr,
            _keyword_: "KASH_OPERATIONS_TIMESHEET_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      setMessage(alertMessageDisplay("Unable to update record."));
      alertMessage.current.showModal();
    }
  };

  const addNewTimesheetRecord = async (newRecordArr) => {
    console.log("add new record to timesheet table", newRecordArr);
    try {
      const response = await fetch(
        `${domain}GenericTransactionService/processTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            data: newRecordArr,
            _keyword_: "KASH_OPERATIONS_TIMESHEET_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
    } catch (error) {
      setMessage(
        alertMessageDisplay(
          `Unable to add record to timesheets table. Error: ${error}`
        )
      );
      alertMessage.current.showModal();
    }
  };

  const deleteTimesheetRow = async (databaseRowId, index) => {
    // If timesheet_entry_id is present, then run a fetch to delete record from database and remove from state array
    // If timesheet_entry_id is not present, the record does not yet exist in database and remove record from state array
    let recordsAfterDelete;
    if (
      !window.confirm("Are you sure you want to delete this timesheet record?")
    ) {
      return;
    } else {
      recordsAfterDelete = timesheetRecordsByEmployee.filter((record, i) => {
        console.log(record);
        return i !== index;
      });
      console.log(recordsAfterDelete);
      setTimesheetRecordsByEmployee(recordsAfterDelete);

      if (databaseRowId) {
        try {
          const response = await fetch(
            `${domain}GenericTransactionService/processTransactionForDelete`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                // your expected POST request payload goes here
                data: [
                  {
                    TimesheetEntryId: databaseRowId,
                  },
                ],
                _keyword_: "KASH_OPERATIONS_TIMESHEET_TABLE",
                secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
              }),
            }
          );
        } catch (error) {
          setMessage(
            alertMessageDisplay(
              `Cound not delete record ${databaseRowId}. Error: ${error}`
            )
          );
          alertMessage.current.showModal();
        }
      }
    }
  };

  const showConfirmationModal = () => {
    confirmationModalEmployeeName.current.innerHTML =
      selectedEmployee.current.value;
    if (
      typeof submittedTimesheetToDBDialogue.current.showModal === "function"
    ) {
      submittedTimesheetToDBDialogue.current.showModal();
    } else {
      setMessage(
        alertMessageDisplay(
          "Sorry, the <dialog> API is not supported by this browser."
        )
      );
      alertMessage.current.showModal();
    }
  };

  const alertMessageDisplay = (entry) => {
    return entry;
  };

  const closeAlert = () => {
    alertMessage.current.close();
  };

  return (
    <div>
      <AlertMessage ref={alertMessage} close={closeAlert} message={message} />
      <dialog
        className="database-submit-dialog"
        id="database-submit-dialog"
        ref={submittedTimesheetToDBDialogue}
      >
        <form method="dialog">
          <p>
            Timesheet Saved for <br />
            <span
              id="employee-name-span"
              ref={confirmationModalEmployeeName}
            ></span>
          </p>
          <div>
            <button
              className="dialog-modal-confirm-button"
              id="dialog-modal-confirm-button"
              value="confirm"
            >
              OK
            </button>
          </div>
        </form>
      </dialog>

      <main className="timesheet-update__main-section max-width--main-container">
        <h1 className="weeklytimesheet__page-title form-page-title--lg-1">
          Update Weekly Timesheet
        </h1>
        <div className="edit_page__return-link-holder">
          <Link to="/timesheets-hub" className="return-link">
            <svg
              width="80"
              height="134"
              viewBox="0 0 80 134"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M76.7864 3.36106C72.8812 -0.544183 66.5495 -0.544181 62.6443 3.36106L1.12622 64.8787C-0.0453612 66.0503 -0.0453675 67.9497 1.12621 69.1213L62.6445 130.64C66.5497 134.545 72.8814 134.545 76.7866 130.64C80.6919 126.734 80.6919 120.403 76.7866 116.497L29.4107 69.1216C28.2391 67.95 28.2391 66.0505 29.4107 64.8789L76.7864 17.5032C80.6917 13.598 80.6917 7.2663 76.7864 3.36106Z"
                fill="#255463"
              />
            </svg>
            <p className="return-link-text">Return to Timesheet Hub</p>
          </Link>
        </div>
        <form
          action=""
          id="timesheet-staging-form"
          className="timesheet-staging-form"
        >
          <div className="staging-form__content-holder">
            <div className="timesheet-information-group-holder">
              <div className="employee-input_holder">
                <label
                  htmlFor="employee-dropdown-input"
                  className="employee-dropdown-label"
                >
                  Employee:
                </label>
                <select
                  className="employee-dropdown-input"
                  id="employee-dropdown-input"
                  name="employee-dropdown-input"
                  onChange={getSelectedEmployeeId}
                  required
                  ref={selectedEmployee}
                >
                  <option value="">- Choose an Employee -</option>
                  {props.admin !== '"Basic User"' ? (
                    allEmployeesArr.map((employee, i) => {
                      return (
                        <option key={i} data-employeeid={employee.EmpId}>
                          {employee.FirstName + " " + employee.LastName}
                        </option>
                      );
                    })
                  ) : (
                    <option data-employeeid={basicUserInfo.EmpId}>
                      {basicUserInfo.FirstName} {basicUserInfo.LastName}
                    </option>
                  )}
                </select>
              </div>

              <div className="timesheet__task-category-holder">
                <div className="reporting-date--holder">
                  <label
                    htmlFor="timesheet-update--timesheet-start-date-input"
                    className="reporting-start-date__label"
                  >
                    Reporting Period Start Date (Mon)
                  </label>
                  <input
                    defaultValue={currentPrevMonday}
                    step={7}
                    type="date"
                    required
                    className="add-timesheet-entry--form-input timesheet-update--timesheet-start-date-input"
                    id="timesheet-update--timesheet-start-date-input"
                    name="timesheet-update--timesheet-start-date-input"
                    ref={reportingPeriodStartDate}
                    onChange={(event) =>
                      getTimesheetByEmployeeId(selectedEmployeeIdState, event)
                    }
                  />
                </div>

                <div className="project-description--holder">
                  <label
                    htmlFor="project-description__dropdown-input"
                    className="project-description__label"
                  >
                    Project Description <br />
                    <span>(SOW I.D.)</span>
                  </label>
                  <select
                    name="project-description__dropdown-input"
                    id="project-description__dropdown-input"
                    className="add-timesheet-entry--form-input project-description__dropdown-input"
                    onChange={getSelectedProjectData}
                    ref={selectedProject}
                    required
                  >
                    <option value=""></option>
                    {projectAndCompanyInfoArr.map((project, i) => {
                      return (
                        <option key={i} data-projectid={project.SowId}>
                          {project.CompanyName +
                            " - " +
                            project.ProjectCategory +
                            " (" +
                            project.SowId +
                            ")"}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="w-10">
                  <div>
                    <label htmlFor="ticket-num">Ticket #</label>
                  </div>
                  <input type="text" id="ticket-num" ref={taskTicketNumber} />
                </div>
                {/* <!--div className="time-billable--holder">
                        <label htmlFor="time-billable__dropdown-input" className="time-billable__label">
                            Time Billable?
                        </label>
                        <select onchange="toggleBillReasonVisibility()" name="time-billable__dropdown-input" id="time-billable__dropdown-input" className="add-timesheet-entry--form-input time-billable__dropdown-input">
                            <option value="Yes">
                                Yes
                            </option>
                            <option value="No">
                                No
                            </option>
                        </select>
                    </div-->

                <div className="non-billable-category--holder">
                  <label
                    htmlFor="non-billable-category__dropdown-input"
                    className="non-billable-category__label"
                  >
                    Non-Billable Category
                  </label>
                  <select
                    name="non-billable-category__dropdown-input"
                    id="non-billable-category__dropdown-input"
                    className="add-timesheet-entry--form-input non-billable-category__dropdown-input"
                  >
                    <option value="n/a">N/A</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Sick or Other PTO">Sick or Other PTO</option>
                    <option value="Travel (Non-billable)">
                      Travel (Non-billable)
                    </option>
                    <option value="Sales">Sales</option>
                    <option value="Client Time (Non-Billable)">
                      Client Time (Non-Billable)
                    </option>
                    <option value="Assigned Admin Project">
                      Assigned Admin Project
                    </option>
                    <option value="General Admin">General Admin</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                */}
              </div>
            </div>

            <div className="optional_sub-assignment_container">
              {subAssignmentByProjectArr.length === 0 ? (
                <div className="optional_sub-assignment_holder">
                  <p className="sub-assignment_title-text">
                    Project Sub-Assignments
                  </p>
                </div>
              ) : (
                <span className="optional_sub-assignment_holder">
                  <div id="sub-assignment-title">
                    <p className="sub-assignment_title-text">
                      Project Sub-Assignments
                    </p>
                    <span id="sub-assignment-title-descriptor">
                      {subAssignmentTitleDescriptor}
                    </span>
                  </div>
                  <div id="sub-assignment-content">
                    <div className="w-10">
                      <div>
                        <label htmlFor="sub-assignment">Work Area</label>
                      </div>
                      <select
                        id="sub-assignment"
                        onChange={selectSubAssignment}
                      >
                        <option value=""></option>
                        {subAssignmentByProjectArr.map((subProject, i) => {
                          return (
                            <option
                              key={i}
                              data-subprojectid={subProject.ProjectSubTaskId}
                              data-subprojectname={subProject.SubTaskTitle}
                            >
                              {subProject.SubTaskTitle}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="w-15">
                      <div>
                        <label htmlFor="sub-assignment-seg-1">Task Area</label>
                      </div>
                      <select id="sub-assignment-seg-1" ref={subAssignmentTask}>
                        {tasksBySubAssignment.map((subTask, i) => {
                          return <option key={i}>{subTask.Segment1}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </span>
              )}
            </div>

            <div className="w-5">
              <div>
                <button
                  className="addbutton"
                  onClick={addToStagingSheet}
                  type="button"
                >
                  + Add to Sheet
                </button>
              </div>
            </div>
          </div>
        </form>

        {timesheetRecordsByEmployee.length === 0 ? (
          ""
        ) : (
          <span>
            <div className="hours_and_text-status">
              <div className="timesheet__daily-hours-holder">
                <h2 className="daily-hours--title">
                  Daily Hours (Round to nearest 0.25)
                </h2>
                <div className="table-responsive">
                  <table
                    id="timeSheetTable"
                    className="display table"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">Delete</th>
                        <th scope="col">Project</th>
                        <th scope="col">Work Area</th>
                        <th scope="col">Task Area</th>
                        <th scope="col">Ticket #</th>
                        <th scope="col">Status</th>
                        <th scope="col">Mon</th>
                        <th scope="col">Tue</th>
                        <th scope="col">Wed</th>
                        <th scope="col">Thu</th>
                        <th scope="col">Fri</th>
                        <th scope="col">Sat</th>
                        <th scope="col">Sun</th>
                        <th scope="col">Total Hours</th>
                      </tr>
                    </thead>
                    <tbody id="tabBod" ref={TimesheetTableBody}>
                      {timesheetRecordsByEmployee
                        .sort(function (a, b) {
                          return a.TimesheetEntryId - b.TimesheetEntryId;
                        })
                        .map((record, i) => {
                          return (
                            <tr
                              key={i}
                              className="timesheet-table-row"
                              // ref={TimesheetTableRow}
                            >
                              <td className="timesheet-table-cell">
                                <FontAwesomeIcon
                                  className="delete-timesheet-record"
                                  icon={faTrashCan}
                                  onClick={() =>
                                    deleteTimesheetRow(
                                      record.TimesheetEntryId,
                                      i
                                    )
                                  }
                                />
                              </td>
                              <td className="timesheet-table-cell">
                                {record.CompanyName} - {record.SowId}
                              </td>
                              <td className="timesheet-table-cell">
                                {record.SubAssignment}
                              </td>
                              <td className="timesheet-table-cell">
                                {record.SubAssignmentSegment1}
                              </td>
                              <td className="timesheet-table-cell">
                                {record.TicketNum}
                              </td>
                              <td className="timesheet-table-cell">
                                <textarea rows="2" cols="5">
                                  {record.TimesheetStatusEntry}
                                </textarea>
                              </td>
                              <td className="timesheet-table-cell">
                                <input
                                  className="weekly-hours-input add-timesheet-entry--form-input hours-input monday-hours"
                                  type="number"
                                  min="0"
                                  max="24"
                                  step={0.25}
                                  value={record.MondayHours}
                                  autoComplete="off"
                                  onChange={updateTimesheetRecord(
                                    "MondayHours",
                                    i
                                  )}
                                />
                              </td>
                              <td className="timesheet-table-cell">
                                <input
                                  className="weekly-hours-input add-timesheet-entry--form-input hours-input tuesday-hours"
                                  type="number"
                                  min="0"
                                  max="24"
                                  step={0.25}
                                  value={record.TuesdayHours}
                                  autoComplete="off"
                                  onChange={updateTimesheetRecord(
                                    "TuesdayHours",
                                    i
                                  )}
                                />
                              </td>
                              <td className="timesheet-table-cell">
                                <input
                                  className="weekly-hours-input add-timesheet-entry--form-input hours-input wednesday-hours"
                                  type="number"
                                  min="0"
                                  max="24"
                                  step={0.25}
                                  value={record.WednesdayHours}
                                  autoComplete="off"
                                  onChange={updateTimesheetRecord(
                                    "WednesdayHours",
                                    i
                                  )}
                                />
                              </td>
                              <td className="timesheet-table-cell">
                                <input
                                  className="weekly-hours-input add-timesheet-entry--form-input hours-input thursday-hours"
                                  type="number"
                                  min="0"
                                  max="24"
                                  step={0.25}
                                  value={record.ThursdayHours}
                                  autoComplete="off"
                                  onChange={updateTimesheetRecord(
                                    "ThursdayHours",
                                    i
                                  )}
                                />
                              </td>
                              <td className="timesheet-table-cell">
                                <input
                                  className="weekly-hours-input add-timesheet-entry--form-input hours-input friday-hours"
                                  type="number"
                                  min="0"
                                  max="24"
                                  step={0.25}
                                  value={record.FridayHours}
                                  autoComplete="off"
                                  onChange={updateTimesheetRecord(
                                    "FridayHours",
                                    i
                                  )}
                                />
                              </td>
                              <td className="timesheet-table-cell">
                                <input
                                  className="weekly-hours-input add-timesheet-entry--form-input hours-input saturday-hours"
                                  type="number"
                                  min="0"
                                  max="24"
                                  step={0.25}
                                  value={record.SaturdayHours}
                                  autoComplete="off"
                                  onChange={updateTimesheetRecord(
                                    "SaturdayHours",
                                    i
                                  )}
                                />
                              </td>
                              <td className="timesheet-table-cell">
                                <input
                                  className="weekly-hours-input add-timesheet-entry--form-input hours-input sunday-hours"
                                  type="number"
                                  min="0"
                                  mx="24"
                                  step={0.25}
                                  value={record.SundayHours}
                                  autoComplete="off"
                                  onChange={updateTimesheetRecord(
                                    "SundayHours",
                                    i
                                  )}
                                />
                              </td>
                              <td className="row-total-hours">
                                {parseFloat(record.MondayHours) +
                                  parseFloat(record.TuesdayHours) +
                                  parseFloat(record.WednesdayHours) +
                                  parseFloat(record.ThursdayHours) +
                                  parseFloat(record.FridayHours) +
                                  parseFloat(record.SaturdayHours) +
                                  parseFloat(record.SundayHours)}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot>
                      {/* <tr>
                        <th colspan="6" scope="row">
                          Hour Totals
                        </th>
                        <td className="monday-total-hours">{mondaysHours}</td>
                        <td className="tuesday-total-hours">{tuesdaysHours}</td>
                        <td className="wednesday-total-hours">
                          {wednesdaysHours}
                        </td>
                        <td className="thursday-total-hours">
                          {thursdaysHours}
                        </td>
                        <td className="friday-total-hours">{fridaysHours}</td>
                        <td className="saturday-total-hours">
                          {saturdaysHours}
                        </td>
                        <td className="sunday-total-hours">{sundaysHours}</td>
                        <td className="grand-total-hours">{rowTotal}</td>
                      </tr> */}
                      <tr>
                        <th colspan="6" scope="row">
                          Hour Totals
                        </th>
                        <td className="monday-total-hours">{MondayHours}</td>
                        <td className="tuesday-total-hours">{TuesdayHours}</td>
                        <td className="wednesday-total-hours">
                          {WednesdayHours}
                        </td>
                        <td className="thursday-total-hours">
                          {ThursdayHours}
                        </td>
                        <td className="friday-total-hours">{FridayHours}</td>
                        <td className="saturday-total-hours">
                          {SaturdayHours}
                        </td>
                        <td className="sunday-total-hours">{SundayHours}</td>
                        <td className="grand-total-hours">{hoursGrandTotal}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <button
              id="submit-to-database-button"
              type="button"
              onClick={sendUploadTimesheetToDatabase}
              className="submit-timesheet--to-server_button"
            >
              Save Timesheet
              <svg
                className="submit-to-server--embed-arrow"
                width="32"
                height="28"
                viewBox="0 0 32 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.99254e-07 14C3.99254e-07 14.5303 0.210689 15.039 0.58572 15.414C0.960751 15.789 1.4694 15.9996 1.99978 15.9996H25.1692L16.5821 24.5821C16.3962 24.768 16.2487 24.9887 16.1481 25.2316C16.0475 25.4746 15.9957 25.7349 15.9957 25.9978C15.9957 26.2608 16.0475 26.5211 16.1481 26.764C16.2487 27.0069 16.3962 27.2277 16.5821 27.4136C16.7681 27.5995 16.9888 27.747 17.2317 27.8476C17.4747 27.9482 17.735 28 17.998 28C18.2609 28 18.5213 27.9482 18.7642 27.8476C19.0072 27.747 19.2279 27.5995 19.4138 27.4136L31.4125 15.4157C31.5987 15.23 31.7465 15.0093 31.8473 14.7664C31.9481 14.5235 32 14.263 32 14C32 13.737 31.9481 13.4765 31.8473 13.2336C31.7465 12.9907 31.5987 12.77 31.4125 12.5843L19.4138 0.586421C19.0383 0.210942 18.529 0 17.998 0C17.4669 0 16.9577 0.210942 16.5821 0.586421C16.2066 0.9619 15.9957 1.47116 15.9957 2.00217C15.9957 2.53317 16.2066 3.04243 16.5821 3.41791L25.1692 12.0004H1.99978C1.4694 12.0004 0.960751 12.211 0.58572 12.586C0.210689 12.961 3.99254e-07 13.4697 3.99254e-07 14Z"
                  fill="white"
                />
              </svg>
            </button>
          </span>
        )}
        {/* <!--button id="submit-for-review-button" type="button" onclick="submitTimesheetForReview()" className="submit-timesheet--to-server_button">
            Submit for Review <svg className="submit-to-server--embed-arrow" width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.99254e-07 14C3.99254e-07 14.5303 0.210689 15.039 0.58572 15.414C0.960751 15.789 1.4694 15.9996 1.99978 15.9996H25.1692L16.5821 24.5821C16.3962 24.768 16.2487 24.9887 16.1481 25.2316C16.0475 25.4746 15.9957 25.7349 15.9957 25.9978C15.9957 26.2608 16.0475 26.5211 16.1481 26.764C16.2487 27.0069 16.3962 27.2277 16.5821 27.4136C16.7681 27.5995 16.9888 27.747 17.2317 27.8476C17.4747 27.9482 17.735 28 17.998 28C18.2609 28 18.5213 27.9482 18.7642 27.8476C19.0072 27.747 19.2279 27.5995 19.4138 27.4136L31.4125 15.4157C31.5987 15.23 31.7465 15.0093 31.8473 14.7664C31.9481 14.5235 32 14.263 32 14C32 13.737 31.9481 13.4765 31.8473 13.2336C31.7465 12.9907 31.5987 12.77 31.4125 12.5843L19.4138 0.586421C19.0383 0.210942 18.529 0 17.998 0C17.4669 0 16.9577 0.210942 16.5821 0.586421C16.2066 0.9619 15.9957 1.47116 15.9957 2.00217C15.9957 2.53317 16.2066 3.04243 16.5821 3.41791L25.1692 12.0004H1.99978C1.4694 12.0004 0.960751 12.211 0.58572 12.586C0.210689 12.961 3.99254e-07 13.4697 3.99254e-07 14Z" fill="white"/>
                </svg>
        </button--> */}

        {/* <iframe
          src=""
          aria-hidden="true"
          title="Submitted Timesheet to Database"
          id="timesheet-to-database-fex--iframe"
          className="timesheet-to-database-fex--iframe"
        ></iframe> */}
      </main>
    </div>
  );
}

export default UpdateTimesheet;
