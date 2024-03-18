import { domain } from "../assets/api/apiEndpoints";
let currentDate = new Date();
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
export const createResource = () => {
  return {
    users: wrapPromise(fetchUsers()),
    companies: wrapPromise(getCompanies()),
    companyAdmins: wrapPromise(fetchCompanyAdmins()),
    companyProjects: wrapPromise(getCompanyProjects()),
    companyContacts: wrapPromise(getCompanyContacts()),
    avgBilledHours: wrapPromise(getAvgBilledHours()),
    hoursBilledPerProject: wrapPromise(hoursBilledPerProject()),
    totalBilledHours: wrapPromise(getTotalBilledHours()),
    totalProjectedHours: wrapPromise(getTotalProjectedHours()),
    avgHoursPerCompany: wrapPromise(getAvgHoursPerCompany()),
    projectsBilledAndProjectedHoursByCompany: wrapPromise(
      getProjectsBilledAndProjectedHoursByCompany()
    ),
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
      return res.data;
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
      // console.log(
      //   "Timesheet Details Grouped by Users Billed Hours: ",
      //   res.data
      // );
      let convertedNums = res.data.map((num) => parseFloat(num.Sum));
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
      // console.log("Total Hours Billed: ", totalHoursBilled);
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
        companies: companies,
        avgHours: parseFloat(avgHoursByCompanyConsolidated),
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
      }));
      console.log(projectsByCompanyDateWithBurnTime);
      return projectsByCompanyDateWithBurnTime;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
