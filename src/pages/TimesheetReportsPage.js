import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Styles.css";
import TimesheetsReport from "../components/TimesheetsReport";
import TimesheetsTotalsReport from "../components/TimesheetTotalsReport";

function TimesheetReportsPage(props) {
  const [allTimesheetRecords, setAllTimesheetRecords] = useState([]);
  let [tabActive, setTabActive] = useState("weekly");
  let timesheetTabActive = "tab tab-active";
  let timesheetTabNotActive = "tab tab-not-active";

  const getTimesheetRecordsByRange = (from, to) => {};

  return (
    <>
      <header className="timesheet-report-header">
        <div className="kash_operations--upper-section-holder">
          <h1
            class="kash_operations_home--title"
            style={{
              fontWeight: "900",
              fontSize: "3rem",
              textAlign: "center",
              lineHeight: "1.06",
              color: "#356575",
            }}
          >
            Timesheets Report
          </h1>
          <Link to="/timesheets-hub" className="return-to-operations-hub">
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
            <p>Return to Timesheets Hub</p>
          </Link>
        </div>
      </header>

      <main>
        <ul className="tabs-container">
          <li
            className={
              tabActive === "weekly"
                ? timesheetTabActive + " TimesheetReports--weekly-tab-active"
                : timesheetTabNotActive +
                  " TimesheetReports--weekly-tab-not-active"
            }
            onClick={() => setTabActive("weekly")}
          >
            <span>Weekly Hours</span>
          </li>
          <li
            className={
              tabActive === "total"
                ? timesheetTabActive + " TimesheetReports--total-tab-active"
                : timesheetTabNotActive +
                  " TimesheetReports--total-tab-not-active"
            }
            onClick={() => setTabActive("total")}
          >
            <span>Total Hours</span>
          </li>
        </ul>

        {tabActive === "weekly" ? (
          <TimesheetsReport loggedInUser={props.loggedInUser} />
        ) : (
          <div className="TimesheetTotalReport--container">
            <div className="TimesheetTotalReport--reporting-date--holder">
              <h4>Search Timesheets By Range</h4>
              <div className="date-picker-holder">
                <label
                  htmlFor="timesheet-update--timesheet-start-date-input"
                  className="reporting-start-date__label"
                >
                  From
                </label>
                <input
                  type="date"
                  required
                  className="add-timesheet-entry--form-input timesheet-update--timesheet-start-date-input"
                  id="timesheet-update--timesheet-start-date-input"
                  name="timesheet-update--timesheet-start-date-input"
                />

                <label
                  htmlFor="timesheet-update--timesheet-end-date-input"
                  className="reporting-end-date__label"
                >
                  To
                </label>
                <input
                  type="date"
                  required
                  className="add-timesheet-entry--form-input timesheet-update--timesheet-end-date-input"
                  id="timesheet-update--timesheet-end-date-input"
                  name="timesheet-update--timesheet-end-date-input"
                />
                <button
                  className="btn btn-primary"
                  onClick={getTimesheetRecordsByRange}
                >
                  Get Records
                </button>
              </div>
            </div>

            {allTimesheetRecords.length > 0 ? (
              <TimesheetsTotalsReport
                loggedInUser={props.loggedInUser}
                timesheetRecordsArr={allTimesheetRecords}
              />
            ) : (
              <></>
            )}
          </div>
        )}
      </main>
    </>
  );
}

export default TimesheetReportsPage;
