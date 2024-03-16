import React, {
  useEffect,
  useState,
  Suspense,
  useReducer,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import "../assets/styles/ControlCenter.css";
import KPI from "../components/KPI";
import KPITEST from "../components/KPITEST";
import ProjectHoursKPI from "../components/ProjectHoursKPI";
import CompanyHoursKPI from "../components/CompanyHoursKPI";
import PieChartKPI from "../components/PieChartKPI";
import LineChartKPI from "../components/LineChartKPI";
import BarChartKPI from "../components/BarChartKPI";
import HorizontalBarChartKPI from "../components/HorizontalBarChartKPI";
import LoadingData from "../components/LoadingData";
import { domain } from "../assets/api/apiEndpoints";
import {
  useCompanyProjects,
  useCompanyAdmins,
  useBilledHours,
  useBilledAndProjectedHours,
  useAvgHoursPerCompany,
  useBilledAndProjectedHoursByCompany,
} from "../hooks/Fetch";
let currentDate = new Date();
let currentDateUnix = Date.parse(currentDate);
// ============================================================================
// FETCH PROJECTS AND COMPANY DATA
// ============================================================================

const getCompanyProjects = () => {
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
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
      // Calculate all projects which have a start and end date that include the current month
      let monthlyNumOfProjects = res.data.filter((project) => {
        let projectStartDate = Date.parse(project.OriginalStartDate);
        let projectEndDate = Date.parse(project.OriginalEndDate);

        if (
          currentDateUnix >= projectStartDate &&
          currentDateUnix <= projectEndDate
        ) {
          return project;
        }
      });

      // Calculate all active projects
      let activeLifetimeNumOfProjects = res.data.filter((project) => {
        if (project.CurrentStatus === "Active") {
          return project;
        }
      });

      // Calculate all active projects which have a start and end date that include the current month
      let activeMonthlyNumOfProjects = res.data.filter((project) => {
        let projectStartDate = Date.parse(project.OriginalStartDate);
        let projectEndDate = Date.parse(project.OriginalEndDate);

        if (
          currentDateUnix >= projectStartDate &&
          currentDateUnix <= projectEndDate &&
          project.CurrentStatus === "Active"
        ) {
          return project;
        }
      });

      return {
        projects: {
          monthly: monthlyNumOfProjects.length,
          lifetime: res.data.length,
          monthlyActive: activeMonthlyNumOfProjects.length,
          lifetimeActive: activeLifetimeNumOfProjects.length,
          companyProjects: res.data,
        },
      };
      // dispatchKPI({
      //   type: "initialize",
      //   payload: {
      //     ...KPIData,
      //     projects: {
      //       monthly: monthlyNumOfProjects.length,
      //       lifetime: res.data.length,
      //       monthlyActive: activeMonthlyNumOfProjects.length,
      //       lifetimeActive: activeLifetimeNumOfProjects.length,
      //       companyProjects: res.data,
      //     },
      //   },
      // });
    })
    .catch((err) => {
      return err;
    });

  return response;
};

// ============================================================================
// FETCH ADMINS AND COMPANY ADMINS
// ============================================================================

const getAllAdmins = () => {
  // Get all users who are Admins or Super Admins
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "KASH_OPERATIONS_USER_TABLE",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      let filteredOutAdmins = res.data.filter((admin) => {
        if (
          admin.AdminLevel === "Super Admin" ||
          admin.AdminLevel === "Admin"
        ) {
          return admin;
        }
      });
      return filteredOutAdmins;
      // dispatchKPI({
      //   type: "initialize",
      //   payload: {
      //     ...KPIData,
      //     admins: {
      //       allAdmins: filteredOutAdmins,
      //     },
      //   },
      // });
    })
    .catch((err) => {
      return err;
    });

  return response;
};

const getCompanyAdmins = () => {
  // Get the Company Admins
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "KASH_OPERATIONS_COMPANY_ADMIN_ROLE_TABLE",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.data);
      return res.data;
      // dispatchKPI({
      //   type: "initialize",
      //   payload: {
      //     ...KPIData,
      //     admins: {
      //       adminsPerCompany: res.data,
      //     },
      //   },
      // });
    })
    .catch((err) => {
      return err;
    });

  return response;
};
// ====================================================================================
// Get number of hours billed by users and divide by number of users that billed hours
// ====================================================================================

const getAvgBilledHours = () => {
  // Get the total hours billed by users
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "TIMESHEET_BY_USER_HOURS_BILLED_TABLE",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      // setBilledHours(res.data);
      let convertedNums = res.data.map((num) => parseFloat(num.Sum));
      let totalHours = convertedNums.reduce((a, c) => a + c, 0);
      let avgOverallHours = totalHours / res.data.length;
      return avgOverallHours.toFixed(2);
      // dispatchKPI({
      //   type: "initialize",
      //   payload: {
      //     ...initialKPI,
      //     totalHoursBilledDetailed: {
      //       avgHoursBilledOverall: avgOverallHours.toFixed(2),
      //     },
      //   },
      // });
    })
    .catch((err) => {
      return err;
    });

  return response;
};

const hoursBilledPerProject = () => {
  // Get the total of hours billed by users per company project

  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "TIMESHEET_USER_HOURS_BILLED_PER_COMPANY_PROJECT_TABLE",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      // setBilledHoursPerCompanyProject(res.data);
      return res.data;
      // dispatchKPI({
      //   type: "initialize",
      //   payload: {
      //     ...initialKPI,
      //     totalHoursBilledDetailed: {
      //       hoursBilledPerProject: res.data,
      //     },
      //   },
      // });
    })
    .catch((err) => {
      return err;
    });

  return response;
};
// ====================================================================================
// GET TOTAL HOURS BILLED BY PROJECT
// ====================================================================================
// Get the total projected hours on all projects and the total hours billed on projects
const getTotalBilledHours = () => {
  // fetch the total hours billed by project
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "TOTAL_HOURS_BILLED_BY_PROJECT_TABLE",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      // convert billed hours to number
      let convertedNums = res.data.map((num) =>
        parseFloat(num.TotalBilledHours)
      );
      // get the sum of billed hours
      let totalHoursBilled = convertedNums.reduce((a, c) => a + c, 0);
      console.log(totalHoursBilled);
      console.log(res.data);
      let hoursDetail = {
        hoursBilled: totalHoursBilled,
        hoursDeatilArr: res.data,
      };
      console.log(hoursDetail);
      return totalHoursBilled;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

const getTotalProjectedHours = () => {
  // fetch the sum of project total hours of each project
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "TOTAL_PROJECTED_HOURS_TABLE",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.data);
      let totalProjectedHours = res.data;
      console.log(totalProjectedHours);
      return parseFloat(totalProjectedHours[0].TotalProjectedHours);
    })
    .catch((err) => {
      return err;
    });

  return response;
};

// ============================================================
// GET HOURS BILLED PER COMPANY AND TOTAL NUMBER OF COMPANIES
// ============================================================

const getCompanies = () => {
  // Get list of companies
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "KASH_OPERATIONS_COMPANY_TABLE",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

const getAvgHoursPerCompany = () => {
  // Get total hours billed per company projects
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "HOURS_BILLED_BY_COMPANY_PROJECT_TABLE",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      // filter out repeated companies
      let companies = Object.values(
        res.data.reduce((c, e) => {
          if (!c[e.CompanyName]) c[e.CompanyName] = e;
          return c;
        }, {})
      );
      console.log(companies);
      // console.log("companies: ", companies);
      let convertedNums = res.data.map((company) =>
        parseFloat(company.TotalBilledHours)
      );
      let totalHours = convertedNums.reduce((a, c) => a + c, 0);
      let avgHoursByCompany = totalHours / companies.length;
      console.log(avgHoursByCompany);
      let avgHoursByCompanyConsolidated = avgHoursByCompany.toFixed(2);
      console.log(avgHoursByCompanyConsolidated);
      let companiesAndHoursBilled = {
        companies: companies,
        avgHours: parseFloat(avgHoursByCompanyConsolidated),
      };
      console.log(
        "companies and hours billed object:",
        companiesAndHoursBilled
      );
      return companiesAndHoursBilled;
    })
    .catch((err) => {
      return err;
    });

  return response;
};

// Get the hours billed and projected per company project
const getBilledAndProjectedHoursByCompany = () => {
  // let [companyProjects, setCompanyProjects] = useState([]);

  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "HOURS_BILLED_AND_PROJECTED_BY_COMPANY_PROJECT_TABLE",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.data);

      // convert string values of total projected hours and total billed hours per company project
      let projectsByCompanyDateWithBurnTime = res.data.map((project) => ({
        CompanyName: project.CompanyName,
        ProjectCategory: project.ProjectCategory,
        SowId: project.SowId,
        TotalBilledHours: parseFloat(project.TotalBilledHours),
        TotalProjectedHours: parseFloat(project.TotalProjectedHours),
        ProjectBurnTime:
          parseFloat(project.TotalProjectedHours) -
          parseFloat(project.TotalBilledHours),
      }));

      return projectsByCompanyDateWithBurnTime;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

// let projects = getCompanyProjects();
// let admins = getAllAdmins();
// let companyAdmins = getCompanyAdmins();
// let billedHours = getBilledHours();
// let billedHoursByProject = hoursBilledPerProject();
// let billedAndProjectedHours = getBilledAndProjectedHours();
// let totalProjectedHours = getTotalProjectedHours();
// let avgHoursPerCompany = getAvgHoursPerCompany();
// let billedAndProjectedHoursByCompany = getBilledAndProjectedHoursByCompany();

// Promise.allSettled([
//   projects,
//   admins,
//   companyAdmins,
//   billedHours,
//   billedHoursByProject,
//   billedAndProjectedHours,
//   totalProjectedHours,
//   avgHoursPerCompany,
//   billedAndProjectedHoursByCompany,
// ]).then((values) => {
//   console.log(values);
//     // dispatchKPI({
//     //   type: "initialize",
//     //   payload: {
//     //     projects: {
//     //       monthly: values[0].value.monthly,
//     //       lifetime: values[0].value.lifetime,
//     //       monthlyActive: values[0].value.monthlyActive,
//     //       lifetimeActive: values[0].value.lifetimeActive,
//     //       companyProjects: values[0].value.companyProjects,
//     //     },
//     //     admins: {
//     //       allAdmins: values[1].value.allAdmins,
//     //       adminsPerCompany: values[1].value.adminsPerCompany,
//     //     },
//     //     totalHoursBilledDetailed: {
//     //       hoursBilledPerProject: values[2].value.hoursBilledPerProject,
//     //       avgHoursBilledOverall: values[2].value.avgHoursBilledOverall,
//     //     },
//     //     companiesAndHoursPerCompany: {
//     //       companies: values[3].value.companies,
//     //       avgHours: values[3].value.avgHours,
//     //     },
//     //     hoursBilledAndProjected: {
//     //       totalBilledHours: values[4].value.totalBilledHours,
//     //       totalProjectedHours: values[4].value.totalProjectedHours,
//     //       hoursDetailArr: values[4].value.hoursDetailArr,
//     //     },
//     //     hoursBilledAndProjectedByCompanyProject: {
//     //       calcBurntimeArr: values[5].value,
//     //     },
//     //   },
//     // });
// });

// ====================================================================================
// REDUCER FUNCTION
// ====================================================================================

function kpiReducer(state, action) {
  switch (action.type) {
    case "initialize": {
      return action.payload;
    }
    case "add project": {
      return {
        monthly: 0,
        lifetime: state.lifetime + 1,
        monthlyActive: 0,
        lifetimeActive: 0,
        companyProjects: [],
      };
    }
    case "changed": {
      // return project.map((p) => {
      //   if (p.id === action.project.id) {
      //     return action.project;
      //   } else {
      //     return p;
      //   }
      // });
    }
    case "remove project": {
      return {
        monthly: 0,
        lifetime: state.lifetime - 1,
        monthlyActive: 0,
        lifetimeActive: 0,
        companyProjects: [],
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function ControlCenter(props) {
  // let currentDate = new Date();
  // let currentDateUnix = Date.parse(currentDate);
  let [tabActive, setTabActive] = useState("tab2");
  let controlCenterKPITabActive =
    "ControlCenter--tab ControlCenter--tab-active";
  let controlCenterKPITabNotActive =
    "ControlCenter--tab ControlCenter--tab-not-active";
  let initialKPI = {
    projects: {
      monthly: 0,
      lifetime: 0,
      monthlyActive: 0,
      lifetimeActive: 0,
      companyProjects: [],
    },
    admins: {
      allAdmins: [],
      adminsPerCompany: [],
    },
    totalHoursBilledDetailed: {
      hoursBilledByUserPerProject: [],
      avgHoursBilledOverall: 0,
    },
    companiesAndHoursPerCompany: {
      companies: [],
      avgHours: 0,
    },
    hoursBilledAndProjected: {
      totalBilledHours: 0,
      totalProjectedHours: 0,
      hoursDetailArr: [],
    },
    hoursBilledAndProjectedByCompanyProject: {
      calcBurntimeArr: [],
    },
  };
  let useCallbackDependency = true;
  let [KPIData, dispatchKPI] = useReducer(kpiReducer, initialKPI);
  let promiseResolutionValues = [];
  //  let companyProjects = useCompanyProjects(); // Number of company projects
  //  let companyAdmins = useCompanyAdmins(); // Number of company admins
  //  let billedHoursDetailed = useBilledHours(); // Avg Hours Billed KPI
  //  let billedAndProjectedHours = useBilledAndProjectedHours(); // Hours Billed and Hours Projected/Alloted KPI
  //  let companiesAndHoursPerCompany = useAvgHoursPerCompany(); // Total Hours Billed / Avg Hours Per Company KPI
  //  let hoursBilledAndProjectedByCompanyProject =
  //    useBilledAndProjectedHoursByCompany();
  let projects = getCompanyProjects();
  let admins = getAllAdmins();
  let companyAdmins = getCompanyAdmins();
  let avgBilledHours = getAvgBilledHours();
  let billedHoursByUserByProject = hoursBilledPerProject();
  let totalBilledHours = getTotalBilledHours();
  let totalProjectedHours = getTotalProjectedHours();
  let avgHoursPerCompany = getAvgHoursPerCompany();
  let billedAndProjectedHoursByCompany = getBilledAndProjectedHoursByCompany();

  const resolvePromisesAndDispatch = useCallback(() => {
    Promise.allSettled([
      projects,
      admins,
      companyAdmins,
      avgBilledHours,
      billedHoursByUserByProject,
      totalBilledHours,
      totalProjectedHours,
      avgHoursPerCompany,
      billedAndProjectedHoursByCompany,
    ]).then((values) => {
      console.log(values);
      dispatchKPI({
        type: "initialize",
        payload: {
          projects: {
            monthly: values[0].value.projects.monthly,
            lifetime: values[0].value.projects.lifetime,
            monthlyActive: values[0].value.projects.monthlyActive,
            lifetimeActive: values[0].value.projects.lifetimeActive,
            companyProjects: values[0].value.projects.companyProjects,
          },
          admins: {
            allAdmins: values[1].value,
            adminsPerCompany: values[2].value,
          },
          totalHoursBilledDetailed: {
            hoursBilledByUserPerProject: values[4].value,
            avgHoursBilledOverall: values[3].value,
          },
          companiesAndHoursPerCompany: {
            companies: values[7].value.companies,
            avgHours: values[7].value.avgHours,
          },
          hoursBilledAndProjected: {
            totalBilledHours: values[5].value,
            totalProjectedHours: values[6].value,
            hoursDetailArr: values[5].value.hoursDetailArr, // unable to get the array with details because the getTotalBilledHours function throws an error when returning an object containing the total hours billed value and hours detail array
          },
          hoursBilledAndProjectedByCompanyProject: {
            calcBurntimeArr: values[8].value,
          },
        },
      });
    });
  }, []);

  useEffect(() => {
    resolvePromisesAndDispatch();
  }, []);

  const updateKPIByCompanyId = (e) => {
    console.log(e.target[e.target.selectedIndex].value);

    // if the selection value is 'overall' run dispatch from useEffect to reset kpi data
    if (e.target[e.target.selectedIndex].value === "Overall") {
      console.log("reset kpi with dispatch from useEffect");
    } else {
      // Get the KPI data per company id
      let selectedCompanyId =
        e.target[e.target.selectedIndex].getAttribute("data-companyid");
      console.log(selectedCompanyId);
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
          {/* {companiesAndHoursPerCompany.companies.map((company) => {
            return (
              <option
                value={company.CompanyName}
                data-companyid={company.CompanyId}
              >
                {company.CompanyName}
              </option>
            );
          })} */}
        </select>

        <main className="ControlCenter--main-content">
          {/* <h2 className="ControlCenter--selected-company-heading">
            Selected Company
          </h2> */}
          {/* tabs */}
          <ul className="ControlCenter--tabs-container">
            <li
              className={
                tabActive === "tab1"
                  ? controlCenterKPITabActive
                  : controlCenterKPITabNotActive
              }
              onClick={() => setTabActive("tab1")}
            >
              <span>Monthly</span>
            </li>
            <li
              className={
                tabActive === "tab2"
                  ? controlCenterKPITabActive
                  : controlCenterKPITabNotActive
              }
              onClick={() => setTabActive("tab2")}
            >
              <span>Lifetime</span>
            </li>
          </ul>

          <Suspense fallback={<LoadingData />}>
            {tabActive === "tab1" ? (
              // Monthly Tab KPI Display
              <section className="ControlCenter--KPI-section-container ControlCenter--KPI-section-container-active">
                {/* KPI section */}
                <section className="ControlCenter--KPI-section-wrapper">
                  <KPI
                    value={initialKPI.projects.monthly}
                    caption="Companies with Projects"
                  />
                  <KPI
                    // value="10"
                    caption="Employees Assigned"
                  />
                  <KPI value="0" caption="Avg Hours Billed Per Resource" />
                  <KPI value="0" caption="Company Admins" />
                  <ProjectHoursKPI
                    className="project-hours-KPI-article"
                    hoursBilled="0"
                    hoursAllotted="0"
                    percentage={(0 / 1) * 100 + "%"}
                  />
                  <KPI
                    value={initialKPI.projects.monthlyActive}
                    caption="Active Projects"
                  />
                  <CompanyHoursKPI hoursBilled="0" avgHoursPerCompany="0" />
                  <KPI value="0" caption="Projects with time < 100" />
                </section>

                {/* KPI Charts and Graphs Section 
                <section className="ControlCenter--chart-section-wrapper">
                  <PieChartKPI className="pie-chart-kpi" />
                  <LineChartKPI className="line-chart-kpi" />
                  <BarChartKPI className="bar-chart-kpi" />
                  <HorizontalBarChartKPI className="horizontal-bar-chart-kpi" />
                </section>
                */}
              </section>
            ) : (
              // Lifetime KPI Display
              <section className="ControlCenter--KPI-section-container ControlCenter--KPI-section-container-active">
                {/* KPI section */}
                <section className="ControlCenter--KPI-section-wrapper">
                  <KPI
                    value={KPIData.projects.lifetime}
                    caption="Companies with Projects"
                  />
                  <KPI value="0" caption="Employees Assigned" />
                  <KPI
                    value={
                      KPIData.totalHoursBilledDetailed.avgHoursBilledOverall
                    }
                    caption="Avg Hours Billed Per Resource"
                  />
                  <KPI
                    value={KPIData.admins.allAdmins.length}
                    caption="Company Admins"
                  />
                  <ProjectHoursKPI
                    hoursBilled={
                      KPIData.hoursBilledAndProjected.totalBilledHours
                    }
                    hoursAllotted={
                      KPIData.hoursBilledAndProjected.totalProjectedHours
                    }
                    percentage={
                      (
                        (KPIData.hoursBilledAndProjected.totalBilledHours /
                          KPIData.hoursBilledAndProjected.totalProjectedHours) *
                        100
                      ).toFixed(2) + "%"
                    }
                  />
                  <KPI
                    value={KPIData.projects.lifetimeActive}
                    caption="Active Projects"
                  />
                  <CompanyHoursKPI
                    hoursBilled={
                      KPIData.hoursBilledAndProjected.totalBilledHours
                    }
                    avgHoursPerCompany={
                      KPIData.companiesAndHoursPerCompany.avgHours
                    }
                  />
                  <KPI
                    value={
                      KPIData.hoursBilledAndProjectedByCompanyProject.calcBurntimeArr.filter(
                        (project) => project.ProjectBurnTime <= 300
                      ).length
                    }
                    caption="Projects with < 300 hours"
                  />
                </section>

                {/* KPI Charts and Graphs Section
                <section className="ControlCenter--chart-section-wrapper">
                  <PieChartKPI className="pie-chart-kpi" />
                  <LineChartKPI className="line-chart-kpi" />
                  <BarChartKPI className="bar-chart-kpi" />
                  <HorizontalBarChartKPI className="horizontal-bar-chart-kpi" />
                </section>
                 */}
              </section>
            )}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default ControlCenter;
