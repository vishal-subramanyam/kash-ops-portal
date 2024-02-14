import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { domain } from "../assets/api/apiEndpoints";
import "../assets/styles/Reports.css";

function EditProjectDetails(props) {
  let alertMessage = useRef();
  let confirmationSubmitDialoguePopup = useRef();
  let addProjectForm = useRef();
  let selectedProjectOption = useRef();
  let selectedProjectDropdown = useRef();
  let projectCategoryInput = useRef();
  let statementOfWorkIdInput = useRef();
  let projectStatusInput = useRef();
  let projectStartDateInput = useRef();
  let projectEndDateInput = useRef();
  let estimatedHoursInput = useRef();
  let [allProjectsArr, setAllProjectsArr] = useState([]);
  let [message, setMessage] = useState("");

  useEffect(() => {
    if (props.loggedInUser.AdminLevel === "Super Admin") {
      getAllProjects();
    } else {
      getAllProjectsByCompanyAdmin();
    }
  }, []);

  const getAllProjects = async () => {
    await fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "PROJECTS_AND_SUB_CATEGORY_AND_COMPANY_TABLE",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // filter out duplicate projects from output
        let removeDuplicateProject = Object.values(
          res.data.reduce((c, e) => {
            if (!c[e.ProjectCategory]) c[e.ProjectCategory] = e;
            return c;
          }, {})
        );

        setAllProjectsArr(removeDuplicateProject);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(`Unable to get projects from database. ${err}`)
        );
        alertMessage.current.showModal();
      });
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
        let removeDuplicateProject = Object.values(
          res.data.reduce((c, e) => {
            if (!c[e.ProjectCategory]) c[e.ProjectCategory] = e;
            return c;
          }, {})
        );

        setAllProjectsArr(removeDuplicateProject);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(`Unable to get projects from database. ${err}`)
        );
        alertMessage.current.showModal();
      });
  };

  const onNameChange = async (e, i) => {
    let selectedProjectSowId =
      e.target.children[e.target.selectedIndex].getAttribute("data-projectid");
    let selectedProjectFromDropdown = allProjectsArr.filter((project, i) => {
      return selectedProjectSowId === project.SowId;
    });

    projectDetailInputs(selectedProjectFromDropdown);
  };

  const projectDetailInputs = (project) => {
    projectCategoryInput.current.value = project[0].ProjectCategory;
    statementOfWorkIdInput.current.value = project[0].SowId;
    projectStatusInput.current.value = project[0].CurrentStatus;
    projectStartDateInput.current.value = project[0].OriginalStartDate;
    projectEndDateInput.current.value = project[0].OriginalEndDate;
    estimatedHoursInput.current.value = project[0].TotalProjectedHours;
  };

  const updateProject = () => {
    console.log("update project");
  };
  const deleteProject = () => {
    console.log("delete project");
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
      </dialog>

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
            ref={addProjectForm}
          >
            <div className="add-project-form--project-details">
              <label
                htmlFor="add-project-form--company-name-input"
                className="add-project-form--company-name-label"
              >
                Project
                <select
                  required="required"
                  className="add-project-form--company-name-input"
                  id="add-project-form--company-name-input"
                  name="add-project-form--company-name-input"
                  ref={selectedProjectDropdown}
                  onChange={onNameChange}
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
                        {project.ProjectCategory}
                      </option>
                    );
                  })}
                </select>
              </label>

              <label
                htmlFor="add-project--type-input"
                className="add-project--type-label"
              >
                Project Name
                <input
                  required="required"
                  type="text"
                  className="add-project-form--form-input add-project--type-input"
                  id="add-project--type-input"
                  name="add-project--type-input"
                  ref={projectCategoryInput}
                />
              </label>

              <label
                htmlFor="add-project--sow-input"
                className="add-project--sow-label"
              >
                Statement of Work ID
                <br />
                <span className="parenthetical-sub-label">(SOW I.D.)</span>
                <input
                  required="required"
                  type="text"
                  className="add-project-form--form-input add-project--sow-input"
                  id="add-project--sow-input"
                  name="add-project--sow-input"
                  ref={statementOfWorkIdInput}
                />
              </label>
            </div>

            <div className="project-estimates">
              <label
                htmlFor="add-project--project-status-input"
                className="add-project--project-status-label"
              >
                Project Status
                <input
                  type="text"
                  className="add-project-form--form-input add-project--project-status-input"
                  id="add-project--project-status-input"
                  name="add-project--project-status-input"
                  ref={projectStatusInput}
                />
              </label>

              <div className="date-estimates-holder">
                <label
                  htmlFor="add-project--start-date-input"
                  className="add-project--start-date-label"
                >
                  Start Date
                  <input
                    type="date"
                    defaultValue="mm/dd/yyyy"
                    className="add-project-form--form-input add-project--start-date-input"
                    id="add-project--start-date-input"
                    name="add-project--start-date-input"
                    ref={projectStartDateInput}
                  />
                </label>

                <label
                  htmlFor="add-project--end-date-input"
                  className="add-project--end-date-label"
                >
                  End Date
                  <input
                    type="date"
                    defaultValue="mm/dd/yyyy"
                    className="add-project-form--form-input add-project--end-date-input"
                    id="add-project--end-date-input"
                    name="add-project--end-date-input"
                    ref={projectEndDateInput}
                  />
                </label>
              </div>

              <label
                htmlFor="add-project--estimated-hours-input"
                className="add-project--estimated-hours-label"
              >
                Estimated Hours
                <input
                  required="required"
                  type="number"
                  step="1"
                  className="add-project-form--form-input add-project--estimated-hours-input"
                  id="add-project--estimated-hours-input"
                  name="add-project--estimated-hours-input"
                  ref={estimatedHoursInput}
                />
              </label>
            </div>

            <div className="buttonContainer">
              <button className="btn btn-primary" onClick={updateProject}>
                Update
              </button>
              <button className="btn btn-danger" onClick={deleteProject}>
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
