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
