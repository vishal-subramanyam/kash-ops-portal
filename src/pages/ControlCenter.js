import React, { useEffect, useState, useReducer, useCallback } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/ControlCenter.css";
import KPI from "../components/KPI";
import KPITEST from "../components/KPITEST";
import ProjectHoursKPI from "../components/ProjectHoursKPI";
import CompanyHoursKPI from "../components/CompanyHoursKPI";
import LineChartKPI from "../components/LineChartKPI";
import BarChartKPI from "../components/BarChartKPI";
import HorizontalBarChartKPI from "../components/HorizontalBarChartKPI";
import LoadingData from "../components/LoadingData";
import {
  getCompanies,
  fetchCompanyAdmins,
  getCompanyProjects,
  getAvgBilledHours,
  getAvgBilledHoursByRange,
  hoursBilledPerProject,
  getTotalBilledHours,
  getTotalProjectedHours,
  getAvgHoursPerCompany,
  getHoursBilledDetail,
  getProjectsBilledAndProjectedHoursByCompany,
} from "../hooks/FetchData";
import { domain } from "../assets/api/apiEndpoints";
import ProjectPieChartsHolder from "../components/ProjectPieChartsHolder";
let currentDate = new Date();
let currentMonth = currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();
let currentDateUnix = Date.parse(currentDate);

// ====================================================================================
// REDUCER FUNCTION
// ====================================================================================

function kpiReducer(state, action) {
  switch (action.type) {
    case "initialize": {
      return action.payload;
    }
    case "changeCompany": {
      // run calculations for each kpi against given company id and return updated state
      console.log(state);
      // Array of all hours billed to selected company by user
      let allHoursBilledBySelectedCompanyLifetime =
        state.hrsBilledByUserByProjDet.filter(
          (project) => action.action.companyId === project.CompanyId
        );
      // Array of individual users who billed to projects associated to selected company
      let numUsersBilledHrsByCompanyLifetime = () => {
        if (allHoursBilledBySelectedCompanyLifetime.length === 0) {
          return 1;
        } else {
          return Object.values(
            allHoursBilledBySelectedCompanyLifetime.reduce((c, e) => {
              if (!c[e.EmpId]) c[e.EmpId] = e;
              return c;
            }, {})
          ).length;
        }
      };
      // Calculate total hours billed to selected company into one figure
      let totalHrsBilledBySelectedCompany = () => {
        if (allHoursBilledBySelectedCompanyLifetime.length === 0) {
          return 0;
        } else {
          return allHoursBilledBySelectedCompanyLifetime.reduce(
            (a, c) => a + parseFloat(c.TotalHoursBilled),
            0
          );
        }
      };

      // Get projects associated with selected company
      let selectedCompanyProjects = state.allProjectsArr.filter(
        (p) => action.action.companyId === p.CompanyId
      );
      let totalProjectedHrs = selectedCompanyProjects.reduce(
        (a, c) => a + c.TotalProjectedHours,
        0
      );

      // Num of projects associated with selected company whose burn time is less than 300
      let lowBurnTimeLT = selectedCompanyProjects.filter(
        (p) => p.ProjectBurnTime < 300
      );
      return {
        // numProjLifetime: 0,
        // numProjByRange: 0,
        ...state,
        numCompanyAdmins: state.companyAdminsDet.filter(
          (admin) => action.action.companyId === admin.CompanyId
        ).length,
        activeProjLifetime: state.compProjDet.filter(
          (project) =>
            action.action.companyId === project.CompanyId &&
            project.CurrentStatus === "Active"
        ).length,
        activeProjByRange: 0,
        avgHrsBilledByUserLifetime:
          totalHrsBilledBySelectedCompany() /
          numUsersBilledHrsByCompanyLifetime(),
        avgHrsBilledByUserByRange: 0,
        avgHrsBilledByCompLifetime: totalHrsBilledBySelectedCompany() / 1,
        avgHrsBilledByCompByRange: 0,
        totalHrsBilledLifetime: totalHrsBilledBySelectedCompany(),
        totalHrsBilledByRange: 0,
        totalHrsProjectedLifetime: totalProjectedHrs,
        totalHrsProjectedByRange: 0,
        lowBurnTimeLifetime: lowBurnTimeLT.length,
        lowBurnTimeByRange: 0,
      };
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function ControlCenter(props) {
  let [isLoading, setIsLoading] = useState(true);
  let [tabActive, setTabActive] = useState("card");
  let controlCenterKPITabActive =
    "ControlCenter--tab ControlCenter--tab-active";
  let controlCenterKPITabNotActive =
    "ControlCenter--tab ControlCenter--tab-not-active";
  let kpiFilterRange = useState("monthly");

  let initialKPIState = {
    compProjDet: [],
    numProjLifetime: 0,
    numProjByRange: 0,
    activeProjLifetime: 0,
    activeProjByRange: 0,
    allAdminsDet: [],
    companyAdminsDet: [],
    numCompanyAdmins: [],
    // allCompaniesDet: [],
    hrsBilledByUserByProjDet: [],
    avgHrsBilledByUserLifetime: 0,
    avgHrsBilledByUserByRange: 0,
    avgHrsBilledByCompLifetime: 0,
    avgHrsBilledByCompByRange: 0,
    totalHrsBilledLifetime: 0,
    totalHrsBilledByRange: 0,
    totalHrsProjectedLifetime: 0,
    totalHrsProjectedByRange: 0,
    allProjectsArr: [],
    lowBurnTimeLifetime: 0,
    lowBurnTimeByRange: 0,
    allCompanies: [],
  };

  let [KPIData, dispatchKPI] = useReducer(kpiReducer, initialKPIState);
  let companies = getCompanies;

  // let timesheetEntryDetails = props.timesheetEntryDetails.read();
  let projects = getCompanyProjects;
  let admins = fetchCompanyAdmins;
  // let admins = props.users.read().filter((admin) => {
  //   if (admin.AdminLevel === "Super Admin" || admin.AdminLevel === "Admin") {
  //     return admin;
  //   }
  // });
  let companyAdmins = fetchCompanyAdmins;
  let avgBilledHours = getAvgBilledHours;
  let avgBilledHoursByRange = getAvgBilledHoursByRange;
  let billedHoursByUserByProject = hoursBilledPerProject;
  let totalBilledHours = getTotalBilledHours;
  let totalProjectedHours = getTotalProjectedHours;
  let avgHoursPerCompany = getAvgHoursPerCompany;
  let billedAndProjectedHoursByCompany =
    getProjectsBilledAndProjectedHoursByCompany;
  let hoursBilledArr = getHoursBilledDetail;

  const resolvePromisesAndDispatch = useCallback(() => {
    Promise.allSettled([
      projects(),
      admins(),
      companyAdmins(),
      avgBilledHours(),
      avgBilledHoursByRange(),
      billedHoursByUserByProject(),
      avgHoursPerCompany(),
      totalBilledHours(),
      totalProjectedHours(),
      hoursBilledArr(),
      billedAndProjectedHoursByCompany(),
      companies(),
      // timesheetEntryDetails,
    ]).then((values) => {
      console.log("KPI Fetch Data: ", values);
      dispatchKPI({
        type: "initialize",
        payload: {
          compProjDet: values[0].value.companyProjects,
          numProjLifetime: values[0].value.lifetime,
          numProjByRange: values[0].value.monthly,
          activeProjLifetime: values[0].value.lifetimeActive,
          activeProjByRange: values[0].value.monthlyActive,
          allAdminsDet: values[1].value,
          companyAdminsDet: values[2].value.compAdminsOverall,
          numCompanyAdmins: values[2].value.companyAdmins.length,
          // allCompaniesDet: [],
          avgHrsBilledByUserLifetime: values[3].value,
          avgHrsBilledByUserByRange: values[4].value.avgHoursByRange,
          hrsBilledByUserByProjDet: values[5].value, // Array detailing company and project associated with a user entry who billed a project and those total billed hours
          avgHrsBilledByCompLifetime: values[6].value.avgHoursLifetime,
          avgHrsBilledByCompByRange:
            values[9].value.avgHoursBilledByCompanyRange,
          totalHrsBilledLifetime: values[7].value.hoursBilled,
          totalHrsBilledByRange: values[9].value.totalHoursBilledByRange,
          totalHrsProjectedLifetime: values[8].value,
          allBilledHrsArr: values[9].value.allHrsBilledArr,
          totalHrsProjectedByRange: values[9].value.totalHoursProjectedByRange,
          allProjectsArr: values[10].value.allProjects,
          lowBurnTimeLifetime: values[10].value.lowBurnTimeLifetime,
          lowBurnTimeByRange: values[10].value.lowBurnTimeByRange,
          allCompanies: values[11].value,
        },
      });
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    resolvePromisesAndDispatch();
  }, []);

  // Show loading component while data is being fetched
  if (isLoading) {
    return <LoadingData />;
  }

  // Trigger dispatch to reducer when user selects a company from the dropdown
  const updateKPIByCompanyId = (e) => {
    console.log(e.target[e.target.selectedIndex].value);

    // if the selection value is 'overall' run dispatch from useEffect to reset kpi data
    if (e.target[e.target.selectedIndex].value === "Overall") {
      console.log("reset kpi with dispatch from useEffect");
      resolvePromisesAndDispatch();
    } else {
      // Get the KPI data per company id
      let selectedCompanyId =
        e.target[e.target.selectedIndex].getAttribute("data-companyid");
      console.log(selectedCompanyId);

      dispatchKPI({
        type: "changeCompany",
        action: { companyId: selectedCompanyId, filterRange: kpiFilterRange },
      });
    }
  };

  return (
    <div className="ControlCenter--container">
      <header>
        <div class="kash_operations--upper-section-holder">
          <h1 class="kash_operations--hub-title clients-hub-page-title ControlCenter--page-title">
            Control Center
          </h1>
          <Link to="/" class="return-to-operations-hub">
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
            <p>Return to Operations Hub</p>
          </Link>
        </div>
      </header>

      <div className="ControlCenter--main-content-container">
        {/* <aside className="ControlCenter--desktop-sidebar">
          <ol>
            <li>Overall</li>
            <li>Company 1</li>
            <li>Company 2</li>
            <li>Company 3</li>
          </ol>
        </aside> */}

        <select
          className="ControlCenter--mobile-company-selector"
          onChange={updateKPIByCompanyId}
        >
          <option value="Overall">Overall</option>
          {KPIData.allCompanies.map((company) => {
            return (
              <option
                value={company.CompanyName}
                data-companyid={company.CompanyId}
              >
                {company.CompanyName}
              </option>
            );
          })}
        </select>

        <main className="ControlCenter--main-content">
          {/* <h2 className="ControlCenter--selected-company-heading">
            Selected Company
          </h2> */}
          {/* tabs */}
          <ul className="ControlCenter--tabs-container">
            <li
              className={
                tabActive === "card"
                  ? controlCenterKPITabActive
                  : controlCenterKPITabNotActive
              }
              onClick={() => setTabActive("card")}
            >
              <span>Monthly</span>
            </li>
            <li
              className={
                tabActive === "table"
                  ? controlCenterKPITabActive
                  : controlCenterKPITabNotActive
              }
              onClick={() => setTabActive("table")}
            >
              <span>Lifetime</span>
            </li>
          </ul>

          {tabActive === "card" ? (
            // Monthly Tab KPI Display
            <section className="ControlCenter--KPI-section-container ControlCenter--KPI-section-container-active">
              {/* KPI section */}
              <section className="ControlCenter--KPI-section-wrapper">
                <KPI
                  value={KPIData.numProjByRange}
                  caption="Companies with Projects"
                />
                <KPI value="0" caption="Employees Assigned" />
                <KPI
                  value={KPIData.avgHrsBilledByUserByRange || 0}
                  caption="Avg Hours Billed Per Resource"
                />
                <KPI
                  value={KPIData.numCompanyAdmins || 0}
                  caption="Company Admins"
                />
                <ProjectHoursKPI
                  className="project-hours-KPI-article"
                  hoursBilled={KPIData.totalHrsBilledByRange}
                  hoursAllotted={KPIData.totalHrsProjectedByRange}
                  percentage={
                    (
                      (KPIData.totalHrsBilledByRange /
                        KPIData.totalHrsProjectedByRange) *
                      100
                    ).toFixed(2) + "%"
                  }
                />
                <KPI
                  value={KPIData.activeProjByRange}
                  caption="Active Projects"
                />
                <CompanyHoursKPI
                  hoursBilled={KPIData.totalHrsBilledByRange}
                  avgHoursPerCompany={KPIData.avgHrsBilledByCompByRange}
                />
                <KPI
                  value={KPIData.lowBurnTimeByRange}
                  caption="Projects with time < 100"
                />
              </section>

              <section className="ControlCenter--chart-section-wrapper">
                {/* KPI Charts and Graphs Section 
                  <LineChartKPI className="line-chart-kpi" />
                  <BarChartKPI className="bar-chart-kpi" />
                */}
                <div className="ControlCenter--horizontal-bar-chart-wrapper">
                  <HorizontalBarChartKPI
                    className="horizontal-bar-chart-kpi"
                    hrsBilledByUserByProjDet={KPIData.hrsBilledByUserByProjDet}
                  />
                </div>
                <ProjectPieChartsHolder
                  hrsBilledByUserByProjDet={KPIData.hrsBilledByUserByProjDet}
                />
              </section>
            </section>
          ) : (
            // Lifetime KPI Display
            <section className="ControlCenter--KPI-section-container ControlCenter--KPI-section-container-active">
              {/* KPI section */}
              <section className="ControlCenter--KPI-section-wrapper">
                <KPI
                  value={KPIData.numProjLifetime}
                  caption="Companies with Projects"
                />
                <KPI value="0" caption="Employees Assigned" />
                <KPI
                  value={KPIData.avgHrsBilledByUserLifetime}
                  caption="Avg Hours Billed Per Resource"
                />
                <KPI
                  value={KPIData.numCompanyAdmins}
                  caption="Company Admins"
                />
                <ProjectHoursKPI
                  hoursBilled={KPIData.totalHrsBilledLifetime}
                  hoursAllotted={KPIData.totalHrsProjectedLifetime}
                  percentage={
                    (
                      (KPIData.totalHrsBilledLifetime /
                        KPIData.totalHrsProjectedLifetime) *
                      100
                    ).toFixed(2) + "%"
                  }
                />
                <KPI
                  value={KPIData.activeProjLifetime}
                  caption="Active Projects"
                />
                <CompanyHoursKPI
                  hoursBilled={KPIData.totalHrsBilledLifetime}
                  avgHoursPerCompany={KPIData.avgHrsBilledByCompLifetime}
                />
                <KPI
                  value={KPIData.lowBurnTimeLifetime}
                  caption="Projects with < 300 hours"
                />
              </section>

              <section className="ControlCenter--chart-section-wrapper">
                {/* KPI Charts and Graphs Section
                  <LineChartKPI className="line-chart-kpi" />
                  <BarChartKPI className="bar-chart-kpi" />
                */}
                <HorizontalBarChartKPI
                  className="horizontal-bar-chart-kpi"
                  hrsBilledByUserByProjDet={KPIData.hrsBilledByUserByProjDet}
                />
                <ProjectPieChartsHolder
                  hrsBilledByUserByProjDet={KPIData.hrsBilledByUserByProjDet}
                />
              </section>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default ControlCenter;
