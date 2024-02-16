import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import SuccessMessage from "../components/SuccessMessage";
import { domain } from "../assets/api/apiEndpoints";
// import "../assets/styles/Reports.css";

function EditProjectDetails(props) {
  let alertMessage = useRef();
  let successMessage = useRef();
  let confirmationSubmitDialoguePopup = useRef();
  let editProjectForm = useRef();
  let selectedProjectOption = useRef();
  let selectedProjectDropdown = useRef();
  let projectCategoryInput = useRef();
  let statementOfWorkIdInput = useRef();
  let projectStatusInput = useRef();
  let projectStartDateInput = useRef();
  let projectEndDateInput = useRef();
  let estimatedHoursInput = useRef();
  let selectedCompanyDropdown = useRef();
  let selectedCompanyOption = useRef();
  let [selectedCompanyIdState, setSelectedCompanyIdState] = useState();
  let [allProjectsArr, setAllProjectsArr] = useState([]);
  let [message, setMessage] = useState("");
  let [allCompaniesProjectsArr, setAllCompaniesProjectsArr] = useState([]);
  let [allCompaniesRemoveDuplicateArr, setAllCompaniesRemoveDuplicateArr] =
    useState([]);
  let [selectedCurrentProject, setSelectedCurrentProject] = useState({});

  useEffect(() => {
    if (props.loggedInUser.AdminLevel === "Super Admin") {
      getAllCompaniesProjects();
    } else {
      getAllCompaniesProjectsByCompAdmin();
    }
  }, [selectedCurrentProject]);

  const getAllCompaniesProjects = () => {
    console.log("get all companies and related projects from database");
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
        console.log(res.data);
        // set state array that queries PROJECTS_AND_COMPANY_INFO_TABLE
        setAllCompaniesProjectsArr(res.data);

        // filter all companies and projects array to remove duplicate company values
        let removeDuplicateCompany = Object.values(
          res.data.reduce((c, e) => {
            if (!c[e.CompanyName]) c[e.CompanyName] = e;
            return c;
          }, {})
        );
        // console.log(removeDuplicateCompany);
        // set state array without duplicate company values
        setAllCompaniesRemoveDuplicateArr(removeDuplicateCompany);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(
            `Unable to get companies from database. Error: ${err}`
          )
        );
        alertMessage.current.showModal();
      });
  };

  const getAllCompaniesProjectsByCompAdmin = () => {
    fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "PROJECTS_AND_COMPANY_BY_COMPANY_ADMIN_TABLE",
        EmpId: props.loggedInUser.EmpId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setAllCompaniesProjectsArr(res.data);

        // filter all companies and projects array to remove duplicate company values
        let removeDuplicateCompany = Object.values(
          res.data.reduce((c, e) => {
            if (!c[e.CompanyName]) c[e.CompanyName] = e;
            return c;
          }, {})
        );
        // console.log(removeDuplicateCompany);
        // set state array without duplicate company values
        setAllCompaniesRemoveDuplicateArr(removeDuplicateCompany);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(
            `Unable to get companies from database. Error: ${err}`
          )
        );
        alertMessage.current.showModal();
      });
  };

  const getAllProjectsByCompany = (id) => {
    console.log(selectedCurrentProject);
    console.log(allCompaniesProjectsArr);
    let filteredProjects = allCompaniesProjectsArr.filter((project) => {
      return id === project.CompanyId;
    });
    console.log(filteredProjects);
    setAllProjectsArr(filteredProjects);
  };

  // PROJECTS_AND_COMPANY_BY_COMPANY_ADMIN_TABLE;
  const getAllProjectsByCompanyAdmin = async () => {
    await fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "PROJECTS_SUB_CATEGORY_COMPANY_BY_COMPANY_ADMIN",
        EmpId: props.loggedInUser.EmpId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // filter out duplicate projects from output
        // let removeDuplicateProject = Object.values(
        //   res.data.reduce((c, e) => {
        //     if (!c[e.ProjectCategory]) c[e.ProjectCategory] = e;
        //     return c;
        //   }, {})
        // );

        // setAllProjectsArr(removeDuplicateProject);
        setAllProjectsArr(res.data);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(`Unable to get projects from database. ${err}`)
        );
        alertMessage.current.showModal();
      });
  };

  const onCompanyNameChange = (e) => {
    selectedProjectDropdown.current.value = "";
    projectCategoryInput.current.value = "";
    statementOfWorkIdInput.current.value = "";
    projectStatusInput.current.value = "";
    projectStartDateInput.current.value = "";
    projectEndDateInput.current.value = "";
    estimatedHoursInput.current.value = "";

    let selectedCompanyId =
      e.target.children[e.target.selectedIndex].getAttribute("data-companyid");
    setSelectedCompanyIdState(selectedCompanyId);
    getAllProjectsByCompany(selectedCompanyId);
  };

  const onProjectNameChange = (e, i) => {
    let selectedProjectSowId =
      e.target.children[e.target.selectedIndex].getAttribute("data-projectid");
    let selectedProjectFromDropdown = allProjectsArr.filter((project, i) => {
      return selectedProjectSowId === project.SowId;
    });
    console.log(selectedProjectFromDropdown);
    if (selectedProjectSowId === null) {
      setSelectedCurrentProject({});
      projectCategoryInput.current.value = "";
      statementOfWorkIdInput.current.value = "";
      projectStatusInput.current.value = "";
      projectStartDateInput.current.value = "";
      projectEndDateInput.current.value = "";
      estimatedHoursInput.current.value = "";
    } else {
      setSelectedCurrentProject(selectedProjectFromDropdown[0]);
      populateProjectDetailInputs(selectedProjectFromDropdown);
    }
  };

  const populateProjectDetailInputs = (project) => {
    console.log(project);
    projectCategoryInput.current.value = project[0].ProjectCategory;
    statementOfWorkIdInput.current.value = project[0].SowId;
    projectStatusInput.current.value = project[0].CurrentStatus;
    projectStartDateInput.current.value = project[0].OriginalStartDate;
    projectEndDateInput.current.value = project[0].OriginalEndDate;
    estimatedHoursInput.current.value = project[0].TotalProjectedHours;
  };

  const updateProject = (e) => {
    e.preventDefault();
    console.log("update project");

    if (selectedProjectDropdown.current.value === "") {
      setMessage(alertMessageDisplay("Please select a project to update."));
      alertMessage.current.showModal();
      return;
    }
    let formDetails = new FormData(editProjectForm.current);
    let formDetailsArr = [];

    for (const entry of formDetails) {
      formDetailsArr.push(entry);
    }
    console.log(formDetailsArr);
    try {
      fetch(`${domain}GenericTransactionService/processTransactionForUpdate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              SowId: formDetailsArr[3][1],
              ProjectCategory: formDetailsArr[2][1],
              OriginalStartDate: formDetailsArr[5][1],
              OriginalEndDate: formDetailsArr[6][1],
              TotalProjectedHours: formDetailsArr[7][1],
              CurrentStatus: formDetailsArr[4][1],
            },
          ],
          _keyword_: "KASH_OPERATIONS_CREATED_PROJECTS_TABLE",
          secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
        }),
      });

      setSelectedCurrentProject((prevState) => ({
        ...prevState,
        SowId: formDetailsArr[3][1],
        ProjectCategory: formDetailsArr[2][1],
        OriginalStartDate: formDetailsArr[5][1],
        OriginalEndDate: formDetailsArr[6][1],
        TotalProjectedHours: formDetailsArr[7][1],
        CurrentStatus: formDetailsArr[4][1],
      }));
      selectedCompanyDropdown.current.value = "";
      selectedProjectDropdown.current.value = "";
      projectCategoryInput.current.value = "";
      statementOfWorkIdInput.current.value = "";
      projectStatusInput.current.value = "";
      projectStartDateInput.current.value = "";
      projectEndDateInput.current.value = "";
      estimatedHoursInput.current.value = "";

      setMessage(alertMessageDisplay("Project Updated."));
      successMessage.current.showModal();
    } catch (error) {
      setMessage(
        alertMessageDisplay(`Unable to update project. Error: ${error}`)
      );
      alertMessage.current.showModal();
    }
    getAllProjectsByCompany(selectedCompanyIdState);
  };

  const deleteProject = async (e) => {
    console.log("delete project");
    e.preventDefault();
    console.log(selectedProjectDropdown.current.value);
    // make sure a project is selected in dropdown before user can delete
    if (selectedProjectDropdown.current.value === "") {
      setMessage(alertMessageDisplay("Please select a project to delete."));
      alertMessage.current.showModal();
      return;
    }
    try {
      const response = await fetch(
        `${domain}/GenericTransactionService/processTransactionForDelete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [
              {
                SowId: selectedCurrentProject.SowId,
              },
            ],
            _keyword_: "KASH_OPERATIONS_CREATED_PROJECTS_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
      setMessage(alertMessageDisplay("Project Deleted"));
      successMessage.current.showModal();
    } catch (error) {
      setMessage(
        alertMessageDisplay(`Unable to delete project. Error: ${error}`)
      );
      alertMessage.current.showModal();
    }
    editProjectForm.current.reset();
    setSelectedCurrentProject({});
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
      <SuccessMessage
        ref={successMessage}
        clost={closeAlert}
        message={message}
      />
      {/* <dialog
        className="database-submit-dialog"
        id="database-submit-dialog"
        ref={confirmationSubmitDialoguePopup}
      >
        <form
          method="dialog"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <p>Project Updated</p>
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
      </dialog> */}

      <main className="add-project-page__main-section max-width--main-container">
        <h1 className="add-project-title form-page-title--lg-1">
          Edit or Delete a Project
        </h1>
        <div className="edit_page__return-link-holder">
          <Link to="/clients-hub" className="return-link">
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
            <p className="return-link-text">Return to Clients</p>
          </Link>
        </div>
        <div className="add-project-page--content-holder">
          <div className="add-project-page--img-holder">
            <img
              src="https://raw.githubusercontent.com/Alex-Gardner/KASH_Tech_Operations_Portal/main/kashtech-project-reporting-portal/assets/raster-assets/construction-tools--resize.webp"
              alt="Group of tools on dark background"
              className="add-project-page--img"
            />
          </div>
          <form
            action=""
            // onSubmit={addProjectToDatabase}
            id="add-project--form"
            className="add-project--form"
            ref={editProjectForm}
          >
            <div className="add-project-form--project-details">
              <label
                for="company-form--name-input"
                className="company-form--name-label"
              >
                Companies
                <select
                  required="required"
                  type="text"
                  className="add-company-form-input company-form--name-input"
                  id="company-form--name-input"
                  name="company-form--name-input"
                  ref={selectedCompanyDropdown}
                  onChange={onCompanyNameChange}
                >
                  <option value="">- Choose A Company -</option>
                  {allCompaniesRemoveDuplicateArr.map((company, i) => {
                    return (
                      <option
                        key={i}
                        value={company.CompanyName}
                        data-companyid={company.CompanyId}
                        ref={selectedCompanyOption}
                      >
                        {company.CompanyName}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label
                htmlFor="edit-add-project-form--project-name-dropdown"
                className="add-project-form--company-name-label"
              >
                Projects
                <select
                  required="required"
                  className="add-project-form--company-name-input"
                  id="add-project-form--company-name-input"
                  name="edit-add-project-form--project-name-dropdown"
                  ref={selectedProjectDropdown}
                  onChange={onProjectNameChange}
                >
                  <option value="">- Choose A Project -</option>
                  {allProjectsArr.map((project, i) => {
                    return (
                      <option
                        key={i}
                        value={project.ProjectCategory}
                        data-projectid={project.SowId}
                        ref={selectedProjectOption}
                      >
                        {project.ProjectCategory + " (" + project.SowId + ") "}
                      </option>
                    );
                  })}
                </select>
              </label>

              <label
                htmlFor="edit-project--type-input"
                className="add-project--type-label"
              >
                Project Name
                <input
                  required="required"
                  type="text"
                  className="add-project-form--form-input add-project--type-input"
                  id="add-project--type-input"
                  name="edit-project--type-input"
                  ref={projectCategoryInput}
                />
              </label>

              <label
                htmlFor="edit-project--sow-input"
                className="add-project--sow-label"
              >
                <div className="edit-project-sow-label-container">
                  Statement of Work ID
                  <span className="parenthetical-sub-label"> (SOW I.D.)</span>
                </div>
                <input
                  readOnly
                  type="text"
                  className="add-project-form--form-input add-project--sow-input edit-project-form-sow-input-readonly"
                  id="add-project--sow-input"
                  name="edit-project--sow-input"
                  ref={statementOfWorkIdInput}
                />
              </label>
            </div>

            <div className="project-estimates">
              <label
                htmlFor="edit-project--project-status-input"
                className="add-project--project-status-label"
              >
                Project Status
                <input
                  type="text"
                  className="add-project-form--form-input add-project--project-status-input"
                  id="add-project--project-status-input"
                  name="edit-project--project-status-input"
                  ref={projectStatusInput}
                />
              </label>

              <div className="date-estimates-holder">
                <label
                  htmlFor="edit-project--start-date-input"
                  className="add-project--start-date-label"
                >
                  Start Date
                  <input
                    type="date"
                    defaultValue="mm/dd/yyyy"
                    className="add-project-form--form-input add-project--start-date-input"
                    id="add-project--start-date-input"
                    name="edit-project--start-date-input"
                    ref={projectStartDateInput}
                  />
                </label>

                <label
                  htmlFor="edit-project--end-date-input"
                  className="add-project--end-date-label"
                >
                  End Date
                  <input
                    type="date"
                    defaultValue="mm/dd/yyyy"
                    className="add-project-form--form-input add-project--end-date-input"
                    id="add-project--end-date-input"
                    name="edit-project--end-date-input"
                    ref={projectEndDateInput}
                  />
                </label>
              </div>

              <label
                htmlFor="edit-project--estimated-hours-input"
                className="add-project--estimated-hours-label"
              >
                Estimated Hours
                <input
                  required="required"
                  type="number"
                  step="1"
                  className="add-project-form--form-input add-project--estimated-hours-input"
                  id="add-project--estimated-hours-input"
                  name="edit-project--estimated-hours-input"
                  ref={estimatedHoursInput}
                />
              </label>
            </div>

            <div className="edit-project-button-container">
              <button
                className="btn btn-primary update-project-btn"
                onClick={updateProject}
              >
                Update
              </button>
              <button
                className="btn btn-danger delete-project-btn"
                onClick={deleteProject}
              >
                Delete Project
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditProjectDetails;
