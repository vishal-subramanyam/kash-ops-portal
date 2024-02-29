import React, { useEffect, useState } from "react";
import { domain } from "../assets/api/apiEndpoints";
let currentDate = new Date();
let currentDateUnix = Date.parse(currentDate);

export const useCompanyProjects = () => {
  let [companyProjects, setCompanyProjects] = useState([]);
  let companyProjectsMonthlyLifetime = {
    monthly: 0,
    lifetime: 0,
    monthlyActive: 0,
    lifetimeActive: 0,
  };

  useEffect(() => {
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
        setCompanyProjects(res.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  // Calculate all projects which have a start and end date that include the current month
  let monthlyNumOfProjects = companyProjects.filter((project) => {
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
  let activeLifetimeNumOfProjects = companyProjects.filter((project) => {
    if (project.CurrentStatus === "Active") {
      return project;
    }
  });

  // Calculate all active projects which have a start and end date that include the current month
  let activeMonthlyNumOfProjects = companyProjects.filter((project) => {
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

  // Assign values for the object of monthly and lifetime company projects
  companyProjectsMonthlyLifetime.monthly = monthlyNumOfProjects.length;
  companyProjectsMonthlyLifetime.lifetime = companyProjects.length;
  companyProjectsMonthlyLifetime.monthlyActive =
    activeMonthlyNumOfProjects.length;
  companyProjectsMonthlyLifetime.lifetimeActive =
    activeLifetimeNumOfProjects.length;

  return companyProjectsMonthlyLifetime;
};

export const useCompanyAdmins = () => {
  let [companyAdmins, setCompanyAdmins] = useState([]);

  useEffect(() => {
    fetch(`${domain}GenericResultBuilderService/buildResults`, {
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
        let admins = res.data.filter((admin) => {
          if (
            admin.AdminLevel === "Super Admin" ||
            admin.AdminLevel === "Admin"
          ) {
            return admin;
          }
        });
        setCompanyAdmins(admins);
      })
      .catch((err) => {
        return err;
      });
  }, []);
  return companyAdmins;
};

// Get number of hours billed by users and divide by number of user that billed hours

export const useBilledHours = () => {
  let [billedHours, setBilledHours] = useState([]);

  useEffect(() => {
    fetch(`${domain}GenericResultBuilderService/buildResults`, {
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
        setBilledHours(res.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);
  let convertedNums = billedHours.map((num) => parseFloat(num.Sum));
  let totalHours = convertedNums.reduce((a, c) => a + c, 0);
  let avgHours = totalHours / billedHours.length;
  return avgHours;
};

// Get the toal projected hours on all projects and the total hours billed on projects
export const useBilledAndProjectedHours = () => {
  let [billedHoursByProject, setBilledHoursByProject] = useState([]);
  let [totalProjectedHours, setTotalProjectedHours] = useState([]);
  let hoursBilledAndProjected = { totalBilledHours: 0, totalProjectedHours: 0 };

  useEffect(() => {
    // fetch the total hours billed by project
    fetch(`${domain}GenericResultBuilderService/buildResults`, {
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
        setBilledHoursByProject(res.data);
      })
      .catch((err) => {
        return err;
      });

    // fetch the sum of project total hours of each project
    fetch(`${domain}GenericResultBuilderService/buildResults`, {
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
        setTotalProjectedHours(res.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);
  console.log(totalProjectedHours);
  // convert billed hours to number
  let convertedNums = billedHoursByProject.map((num) =>
    parseFloat(num.TotalBilledHours)
  );
  // get the sum of billed hours
  let totalHoursBilled = convertedNums.reduce((a, c) => a + c, 0);
  // console.log(totalHoursBilled, totalProjectedHours[0].TotalProjectedHours);
  if (totalProjectedHours.length !== 0) {
    hoursBilledAndProjected.totalBilledHours = totalHoursBilled;
    hoursBilledAndProjected.totalProjectedHours = parseFloat(
      totalProjectedHours[0].TotalProjectedHours
    );
  }

  return hoursBilledAndProjected;
};

// GET HOURS BILLED PER COMPANY AND TOTAL NUMBER OF COMPANIES

export const useAvgHoursPerCompany = () => {
  let [totalHoursPerCompany, setTotalHoursPerCompany] = useState([]);
  let [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Get total hours billed per company projects
    fetch(`${domain}GenericResultBuilderService/buildResults`, {
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
        setTotalHoursPerCompany(res.data);
      })
      .catch((err) => {
        return err;
      });

    // Get list of companies
    fetch(`${domain}GenericResultBuilderService/buildResults`, {
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
        setCompanies(res.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  let convertedNums = totalHoursPerCompany.map((company) =>
    parseFloat(company.TotalBilledHours)
  );
  let totalHours = convertedNums.reduce((a, c) => a + c, 0);
  let avgHoursByCompany = totalHours / companies.length;
  console.log(avgHoursByCompany);
  return avgHoursByCompany.toFixed(2);
};
