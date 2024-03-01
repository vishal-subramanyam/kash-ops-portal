import React, { useEffect, useReducer } from "react";
import "../assets/styles/ControlCenter.css";
import { domain } from "../assets/api/apiEndpoints";
// import { useCompanyProjects } from "../hooks/Fetch";

function projectsReducer(projects, action) {
  switch (action.type) {
    case "initialize": {
      return action.payload;
    }
    case "add project": {
      return {
        lifetime: projects.lifetime + 1,
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
        lifetime: projects.lifetime - 1,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function KPI(props) {
  let currentDate = new Date();
  let currentDateUnix = Date.parse(currentDate);
  // let companyProjects = useCompanyProjects();
  let companyProjects = [];
  let companyProjectsMonthlyLifetime = {
    monthly: 0,
    lifetime: 0,
    monthlyActive: 0,
    lifetimeActive: 0,
    companyProjects: [],
  };
  let [projects, dispatchProjects] = useReducer(
    projectsReducer,
    companyProjectsMonthlyLifetime
  );
  console.log(projects);
  console.log(companyProjects);

  useEffect(() => {
    getCompanyProjects();
  }, []);

  const getCompanyProjects = () => {
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

        dispatchProjects({
          type: "initialize",
          payload: {
            monthly: monthlyNumOfProjects.length,
            lifetime: companyProjects.length,
            monthlyActive: activeMonthlyNumOfProjects.length,
            lifetimeActive: activeLifetimeNumOfProjects.length,
            companyProjects: res.data,
          },
        });
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <article>
      <h1>{projects.companyProjects.length}</h1>
      <button onClick={() => dispatchProjects({ type: "remove project" })}>
        -
      </button>
      <button onClick={() => dispatchProjects({ type: "add project" })}>
        +
      </button>
    </article>
  );
}

export default KPI;
