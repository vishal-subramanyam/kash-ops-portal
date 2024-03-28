import { useState, useEffect } from "react";
import { domain } from "../assets/api/apiEndpoints";
let currentDate = new Date();
let currentMonth = currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();
let currentDateUnix = Date.parse(currentDate);

// ===========================================
// WRAPPER FUNCTION TO RESOLVE FETCH PROMISES
// ===========================================
const wrapPromise = (promise) => {
  let status = "pending";
  let result = "";
  let suspender = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );
  return {
    read() {
      if (status === "pending") {
        console.log("Fetch data status is pending: ", promise);
        throw suspender;
      } else if (status === "error") {
        throw result;
      }
      return result;
    },
  };
};

// =====================================================================================================
// FUNCTION TO RESOLVE PROMISES AND ASSIGN PROMISE RESULT WIHTIN OBJECT TO PASS TO COMPONENTS IN App.js
// =====================================================================================================
export const useResources = () => {
  return {
    users: fetchUsers,
    companies: getCompanies,
    companyAdmins: fetchCompanyAdmins,
    companyProjects: getCompanyProjects,
    companyContacts: getCompanyContacts,
    avgBilledHours: getAvgBilledHours,
    avgBilledHoursByRange: getAvgBilledHoursByRange,
    hoursBilledPerProject: hoursBilledPerProject, // Billed hours by user per project
    totalBilledHours: getTotalBilledHours,
    totalProjectedHours: getTotalProjectedHours,
    avgHoursPerCompany: getAvgHoursPerCompany,
    getHoursBilledDetail: getHoursBilledDetail,
    projectsBilledAndProjectedHoursByCompany:
      getProjectsBilledAndProjectedHoursByCompany,
    // timesheetEntryDetails: wrapPromise(getTimesheetEntryDetails()),
  };
};

// ===============================================================
// FETCH FUNCTIONS TO GET DATA
// ===============================================================

// FETCH ADMINS AND COMPANY ADMINS
const fetchUsers = () => {
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _keyword_: "KASH_OPERATIONS_USER_TABLE" }),
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log("Users: ", res.data);
      return res.data;
    })
    .catch((err) => {
      alert(`Unable to load users from database. Error: ${err}`);
    });
  return response;
};

// Get Company Admins with Company Details
const fetchCompanyAdmins = () => {
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "COMPANY_ADMIN_ROLE_USER_COMPANY_DETAILS_TABLE",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log("Company Admins with Company Details: ", res.data);

      // Get array of individual company admins
      let individualCompAdmins = Object.values(
        res.data.reduce((c, e) => {
          if (!c[e.EmpId]) c[e.EmpId] = e;
          return c;
        }, {})
      );

      let individualCompanies = Object.values(
        res.data.reduce((c, e) => {
          if (!c[e.CompanyId]) c[e.CompanyId] = e;
          return c;
        }, {})
      );

      let companyAdminDetails = {
        compAdminsOverall: res.data, // call all data to accompodate filtering by company in control center
        companyAdmins: individualCompAdmins,
        companies: individualCompanies,
      };
      return companyAdminDetails;
    })
    .catch((err) => {
      alert(`Unable to load users from database. Error: ${err}`);
    });
  return response;
};

// Get Company Contacts
const getCompanyContacts = () => {
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "KASH_OPERATIONS_COMPANY_CONTACT_TABLE",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log("Company Contacts: ", res.data);
      return res.data;
    })
    .catch((err) => {
      alert(`Unable to load company contacts from database. Error: ${err}`);
    });
  return response;
};
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
      // console.log("Company Project Data: ", {
      //   monthly: monthlyNumOfProjects.length,
      //   lifetime: res.data.length,
      //   monthlyActive: activeMonthlyNumOfProjects.length,
      //   lifetimeActive: activeLifetimeNumOfProjects.length,
      //   companyProjects: res.data,
      // });
      return {
        monthly: monthlyNumOfProjects.length,
        lifetime: res.data.length,
        monthlyActive: activeMonthlyNumOfProjects.length,
        lifetimeActive: activeLifetimeNumOfProjects.length,
        companyProjects: res.data,
      };
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
  // Get the total hours billed by users - total hours billed per usesr
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
      // console.log(
      //   "Timesheet Details Grouped by Users Billed Hours: ",
      //   res.data
      // );
      console.log(res.data);
      let convertedNums = res.data.map((num) =>
        parseFloat(num.TotalBilledHours)
      );
      let totalHours = convertedNums.reduce((a, c) => a + c, 0);
      let avgOverallHours = totalHours / res.data.length;
      // console.log(
      //   "Timesheet Details Grouped by Users Billed Hours (Converted Hours from string to num): ",
      //   convertedNums
      // );
      // console.log("Avg Hours Billed: ", avgOverallHours);
      return avgOverallHours.toFixed(2);
    })
    .catch((err) => {
      return err;
    });

  return response;
};

const getAvgBilledHoursByRange = () => {
  // Get the total hours billed by users - total hours billed per usesr
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "TIMESHEETS_ENTRY_DATE_DETAILED",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log(res.data);

      //  filter out hours billed within current month
      let hoursBilledCurrentMonth = res.data.filter((entry) => {
        let entryDate = new Date(entry.EntryDate);
        if (
          entryDate.getMonth() + 1 === currentMonth &&
          entryDate.getFullYear() === currentYear
        ) {
          return entry;
        }
      });
      // Get the total number of employees who input billable entries within current month
      let numUsersBilledCurrentMonth = Object.values(
        hoursBilledCurrentMonth.reduce((c, e) => {
          if (!c[e.SowId]) c[e.SowId] = e;
          return c;
        }, {})
      );
      //  Calculate the total hours billed within current month
      let convertedNums = hoursBilledCurrentMonth.map((num) =>
        parseFloat(num.TaskHours)
      );
      let totalHours = convertedNums.reduce((a, c) => a + c, 0);

      console.log(
        "Total Hours Billed:",
        totalHours,
        "Num users billed: ",
        numUsersBilledCurrentMonth
      );
      let avgHoursByRange = totalHours / numUsersBilledCurrentMonth.length;
      let hoursBilled = {
        lifetimeHoursArr: res.data,
        avgHoursByRange: avgHoursByRange.toFixed(2),
      };

      return hoursBilled;
    })
    .catch((err) => {
      return err;
    });

  return response;
};

// Get total amount of hours
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
      // console.log("Timesheet Hours Billed By Company Project: ", res.data);
      return res.data;
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
      // console.log("Arr of Hours Billed: ", res.data);
      // convert billed hours to number
      let convertedNums = res.data.map((num) =>
        parseFloat(num.TotalBilledHours)
      );
      // console.log(
      //   "Arr of Hours Billed (Converted Hours to num): ",
      //   convertedNums
      // );
      // get the sum of billed hours
      let totalHoursBilled = convertedNums.reduce((a, c) => a + c, 0);
      console.log("Total Hours Billed: ", totalHoursBilled);
      let hoursDetail = {
        hoursBilled: totalHoursBilled,
        hoursDeatilArr: res.data,
      };
      // console.log("Total Hours Detail: ", hoursDetail);
      // return totalHoursBilled;
      return hoursDetail;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

const getTotalProjectedHours = () => {
  // fetch the sum of project total hours of each project - return one number as total hours billed
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
      // console.log("Total Projected Hours: ", res.data);
      let totalProjectedHours = res.data;
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
      console.log("List of companies: ", res.data);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

const getAvgHoursPerCompany = () => {
  // Get total hours billed per company projects. Returns duplicate company entries because of the hours billed to each project associated to a company
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
      // console.log("Hours Billed by Company Project: ", res.data);
      let companies = Object.values(
        res.data.reduce((c, e) => {
          if (!c[e.CompanyName]) c[e.CompanyName] = e;
          return c;
        }, {})
      );
      // console.log("companies: ", companies);
      let convertedNums = res.data.map((company) =>
        parseFloat(company.TotalBilledHours)
      );
      let totalHours = convertedNums.reduce((a, c) => a + c, 0);
      let avgHoursByCompany = totalHours / companies.length;
      // console.log("Total Hours: ", totalHours, "Avg Hours", avgHoursByCompany);
      let avgHoursByCompanyConsolidated = avgHoursByCompany.toFixed(2);
      // console.log(avgHoursByCompanyConsolidated);
      let companiesAndHoursBilled = {
        companiesProjectsBilled: res.data,
        avgHoursLifetime: parseFloat(avgHoursByCompanyConsolidated).toFixed(2),
      };
      // console.log(
      //   "companies and hours billed object:",
      //   companiesAndHoursBilled
      // );
      return companiesAndHoursBilled;
    })
    .catch((err) => {
      return err;
    });

  return response;
};

// Get total Hours billed to each company by range then the billed avg.
// Get total hours billed by range overall
// Get total hours projected within range
// Get burn time within range
const getHoursBilledDetail = () => {
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "ALL_TIMESHEETS_ENTRY_DATE_COMPANY_PROJECT",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      let hoursBilledCurrentMonth = res.data.filter((entry) => {
        let entryDate = new Date(entry.EntryDate);
        if (
          entryDate.getMonth() + 1 === currentMonth &&
          entryDate.getFullYear() === currentYear
        ) {
          return entry;
        }
      });

      // Get the total number of companies billed within current range
      let numCompaniesBilledCurrentMonth = Object.values(
        hoursBilledCurrentMonth.reduce((c, e) => {
          if (!c[e.CompanyId]) c[e.CompanyId] = e;
          return c;
        }, {})
      );
      console.log(numCompaniesBilledCurrentMonth);
      //  Calculate the total hours billed within current month
      let convertedNums = hoursBilledCurrentMonth.map((num) =>
        parseFloat(num.TaskHours)
      );
      let totalHoursBilled = convertedNums.reduce((a, c) => a + c, 0);

      // Calculate total hours billed per company within current month
      let avgHrsByCompany =
        totalHoursBilled / numCompaniesBilledCurrentMonth.length;

      // Get all the individual projects billed within current month
      let getProjectsBilledByRange = Object.values(
        hoursBilledCurrentMonth.reduce((c, e) => {
          if (!c[e.SowId]) c[e.SowId] = e;
          return c;
        }, {})
      );
      console.log(getProjectsBilledByRange);

      // Create an array of each project including their projected hours divided by the number of days alloted for project
      let getProjectedHoursByRange = getProjectsBilledByRange.map((project) => {
        let projectDurationInDays = Math.floor(
          (Date.parse(project.OriginalEndDate) -
            Date.parse(project.OriginalStartDate)) /
            86400000
        );

        // Return only the projects that have an actual project duration - some projects are created without accurate start and end dates which messes up the range calculation
        let projectedHrsByDay;
        if (projectDurationInDays === 0) {
          projectDurationInDays = 1;
          return {
            projectName: project.ProjectCategory,
            projectSowId: project.SowId,
            projectDuration: projectDurationInDays,
            projectedHrsByDay: 0,
            projectedHrsByMonth: 0,
          };
        } else {
          projectedHrsByDay =
            project.TotalProjectedHours / projectDurationInDays;
        }

        return {
          projectName: project.ProjectCategory,
          projectSowId: project.SowId,
          projectDuration: projectDurationInDays,
          projectedHrsByDay: projectedHrsByDay.toFixed(2),
          projectedHrsByMonth: projectedHrsByDay.toFixed(2) * 30,
        };
      });

      console.log(getProjectedHoursByRange);
      let calcProjectedHoursByMonth = getProjectedHoursByRange.reduce(
        (a, c) => a + c.projectedHrsByMonth,
        0
      );
      console.log(calcProjectedHoursByMonth);
      let hoursBilledByRange = {
        allHrsBilledArr: res.data,
        avgHoursBilledByCompanyRange: avgHrsByCompany.toFixed(2),
        totalHoursBilledByRange: totalHoursBilled,
        totalHoursProjectedByRange: calcProjectedHoursByMonth.toFixed(2),
      };

      return hoursBilledByRange;
    })

    .catch((err) => {
      return err;
    });
  return response;
};

// Get the hours billed and projected per company project
const getProjectsBilledAndProjectedHoursByCompany = () => {
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
      console.log("Hours Billed and Projected by Company Project: ", res.data);

      // convert string values of total projected hours and total billed hours per company project
      let projectsByCompanyDateWithBurnTime = res.data.map((project) => ({
        CompanyId: project.CompanyId,
        CompanyName: project.CompanyName,
        CurrentStatus: project.CurrentStatus,
        ProjectCategory: project.ProjectCategory,
        SowId: project.SowId,
        TotalBilledHours: parseFloat(project.TotalBilledHours),
        TotalProjectedHours: parseFloat(project.TotalProjectedHours),
        ProjectBurnTime:
          parseFloat(project.TotalProjectedHours) -
          parseFloat(project.TotalBilledHours),
        OriginalStartDate: project.OriginalStartDate,
        OriginalEndDate: project.OriginalEndDate,
      }));

      // Calculate burn time by lifetime and by range (month)
      let lowBurnTimeLifetime = projectsByCompanyDateWithBurnTime.filter(
        (project) =>
          project.ProjectBurnTime < 300 && project.ProjectBurnTime !== NaN
      );
      let lowBurnTimeByRange = projectsByCompanyDateWithBurnTime.filter(
        (project) => {
          let projectStartDate = Date.parse(project.OriginalStartDate);
          let projectEndDate = Date.parse(project.OriginalEndDate);

          if (
            currentDateUnix >= projectStartDate &&
            currentDateUnix <= projectEndDate &&
            project.ProjectBurnTime < 100 &&
            project.ProjectBurnTime !== NaN
          ) {
            return project;
          }
        }
      );

      let billedProjectData = {
        allProjects: projectsByCompanyDateWithBurnTime,
        lowBurnTimeLifetime: lowBurnTimeLifetime.length,
        lowBurnTimeByRange: lowBurnTimeByRange.length,
      };
      return billedProjectData;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

// =============================
// GET TIMESHEET ENTRY DETAILS
// =============================

const getTimesheetEntryDetails = () => {
  // Get detailed list of timesheet entries logged each day by each user
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "TIMESHEETS_ENTRY_DATE_DETAILED",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      let users = Object.values(
        res.data.reduce((c, e) => {
          if (!c[e.EmpId]) c[e.EmpId] = e;
          return c;
        }, {})
      );

      let timesheetUserEntryDetails = {
        numUsers: users.length,
        entryDetails: res.data,
      };
      console.log("Timesheet entry details", timesheetUserEntryDetails);

      return timesheetUserEntryDetails;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
