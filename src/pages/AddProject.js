import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Styles.css";

function AddProject() {
  // let projectNameInput = useRef();
  let projectType;
  let projectSOWId;
  let projectStatus;
  let projectStartDate;
  let projectEndDate;
  let projectEstimatedHours;
  let selectedCompany;
  let selectedCompanyId;
  let projectSOWIDEXistsArr = [];
  let projectTypeInput = useRef();
  let statementOfWorkIdInput = useRef();
  let projectStatusInput = useRef();
  let projectStartDateInput = useRef();
  let projectEndDateInput = useRef();
  let estimatedHoursInput = useRef();
  let selectedCompanyInput = useRef();
  let selectedCompanyOption = useRef();
  let confirmationSubmitDialoguePopup = useRef();
  let addProjectForm = useRef();
  let confirmationCompanyName = useRef();
  let confirmationProjectType = useRef();
  let confirmationProjectSOWId = useRef();
  let [allProjectsArr, setAllProjectsArr] = useState([]);
  let [allCompaniesArr, setAllCompaniesArr] = useState([]);

  // useEffect to get (POST) companies from database and add to allCompanies state array
  useEffect(() => {
    fetch("http://localhost:4040/GenericResultBuilderService/buildResults", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _keyword_: "KASH_OPERATIONS_COMPANY_TABLE" }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAllCompaniesArr(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  // useEffect to get (POST) project from database and add to allProjects state array
  useEffect(() => {
    fetch("http://localhost:4040/GenericResultBuilderService/buildResults", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "KASH_OPERATIONS_CREATED_PROJECTS_TABLE",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAllProjectsArr(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  // open project added confirmation modal
  const onModalOpen = () => {
    console.log(
      "show added project modal function ",
      confirmationSubmitDialoguePopup
    );

    confirmationCompanyName.current.innerHTML = selectedCompany;
    confirmationProjectType.current.innerHTML = projectType;
    confirmationProjectSOWId.current.innerHTML = projectSOWId;
    if (
      typeof confirmationSubmitDialoguePopup.current.showModal === "function"
    ) {
      confirmationSubmitDialoguePopup.current.showModal();
    } else {
      alert("Sorry, the <dialog> API is not supported by this browser.");
    }
  };

  // function to check if SOW ID already exists
  const checkIfSOWIdAlreadyExists = () => {
    console.log(
      "does project SOW Id exist ",
      statementOfWorkIdInput.current.value
    );
    console.log(allProjectsArr);
    let projectSOWIdFiltered = allProjectsArr.filter((project, i) => {
      return project.SowId === statementOfWorkIdInput.current.value;
    });
    console.log(projectSOWIdFiltered);
    projectSOWIDEXistsArr = projectSOWIdFiltered;
  };

  const getSelectedCompanyId = (e) => {
    selectedCompanyId =
      e.target[e.target.selectedIndex].getAttribute("data-companyid");
    console.log(selectedCompanyId);
  };

  const fetchToAddProject = async () => {
    console.log("add project to database fetch call");

    try {
      const response = await fetch(
        "http://localhost:4040/GenericTransactionService/processTransaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            data: [
              {
                SowId: projectSOWId,
                CompanyId: selectedCompanyId,
                ProjectCategory: projectType,
                OriginalEndDate: projectEndDate,
                CurrentStatus: projectStatus,
                OriginalStartDate: projectStartDate,
                TotalProjectedHours: projectEstimatedHours,
              },
            ],
            _keyword_: "KASH_OPERATIONS_CREATED_PROJECTS_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      console.log("Added to project table" + data);
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
      alert(`Error adding project ${error}`);
    }
  };

  const addProjectToDatabase = (e) => {
    // get values from the form and assign to variables
    e.preventDefault();
    const newProjectData = new FormData(e.target);
    // console.log(newCompanyData.entries());
    // for (let [key, value] of newProjectData.entries()) {
    //   console.log(key, value);
    // }
    selectedCompany = newProjectData.get(
      "add-project-form--company-name-input"
    );
    projectType = newProjectData.get("add-project--type-input");
    projectSOWId = newProjectData.get("add-project--sow-input");
    projectStatus = newProjectData.get("add-project--project-status-input");
    projectStartDate = newProjectData.get("add-project--start-date-input");
    projectEndDate = newProjectData.get("add-project--end-date-input");
    projectEstimatedHours = newProjectData.get(
      "add-project--estimated-hours-input"
    );
    console.log(
      `${selectedCompany} ${projectType} ${projectSOWId} ${projectStatus} ${projectStartDate} ${projectEndDate} ${projectEstimatedHours}`
    );
    checkIfSOWIdAlreadyExists();
    if (projectSOWIDEXistsArr.length !== 0) {
      alert("Project SOW ID already exists.");
    } else {
      // else, add company to database
      console.log("fetch to add project to database");
      fetchToAddProject();
      onModalOpen();
      addProjectForm.current.reset();
    }
  };

  const validateRequiredInputs = () => {
    // validate input fields
    // run function to POST project to database
    // show confirmation modal
  };
  return (
    <div>
      <dialog
        class="database-submit-dialog"
        id="database-submit-dialog"
        ref={confirmationSubmitDialoguePopup}
      >
        <form
          method="dialog"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <p>Project Created:</p>
          <span
            id="project-page-dialog--company-name-span"
            class="project-page-dialog--company-name-span"
            ref={confirmationCompanyName}
          ></span>
          <span
            class="project-page-dialog--project-type-span"
            id="project-page-dialog--project-type-span"
            ref={confirmationProjectType}
          ></span>
          <span
            id="project-page-dialog--sow-id-span"
            class="project-page-dialog--sow-id-span"
            ref={confirmationProjectSOWId}
          ></span>
          <div>
            <button
              class="dialog-modal-confirm-button"
              id="dialog-modal-confirm-button"
              value="confirm"
            >
              OK
            </button>
          </div>
        </form>
      </dialog>

      <main class="add-project-page__main-section max-width--main-container">
        <h1 class="add-project-title form-page-title--lg-1">Add a Project</h1>
        <div class="edit_page__return-link-holder">
          <Link to="/clients-hub" class="return-link">
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
            <p class="return-link-text">Return to Clients</p>
          </Link>
        </div>
        <div class="add-project-page--content-holder">
          {/* <!-- <div class="add-project--watermark"></div> --> */}
          <div class="add-project-page--img-holder">
            <img
              src="https://raw.githubusercontent.com/Alex-Gardner/KASH_Tech_Operations_Portal/main/kashtech-project-reporting-portal/assets/raster-assets/construction-tools--resize.webp"
              alt="Group of tools on dark background"
              class="add-project-page--img"
            />
          </div>
          <form
            action=""
            onSubmit={addProjectToDatabase}
            id="add-project--form"
            class="add-project--form"
            ref={addProjectForm}
          >
            <div class="add-project-form--project-details">
              <label
                for="add-project-form--company-name-input"
                class="add-project-form--company-name-label"
              >
                Company Name
                <select
                  required="required"
                  class="add-project-form--company-name-input"
                  id="add-project-form--company-name-input"
                  name="add-project-form--company-name-input"
                  ref={selectedCompanyInput}
                  onChange={getSelectedCompanyId}
                >
                  <option value="">- Choose A Company -</option>
                  {allCompaniesArr.map((company, i) => {
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
                for="add-project--type-input"
                class="add-project--type-label"
              >
                Project Type
                <input
                  required="required"
                  type="text"
                  class="add-project-form--form-input add-project--type-input"
                  id="add-project--type-input"
                  name="add-project--type-input"
                  ref={projectTypeInput}
                />
              </label>

              <label
                for="add-project--sow-input"
                class="add-project--sow-label"
              >
                Statement of Work ID
                <br />
                <span class="parenthetical-sub-label">(SOW I.D.)</span>
                <input
                  required="required"
                  type="text"
                  class="add-project-form--form-input add-project--sow-input"
                  id="add-project--sow-input"
                  name="add-project--sow-input"
                  ref={statementOfWorkIdInput}
                />
              </label>
            </div>

            <div class="project-estimates">
              <label
                for="add-project--project-status-input"
                class="add-project--project-status-label"
              >
                Project Status
                <input
                  type="text"
                  class="add-project-form--form-input add-project--project-status-input"
                  id="add-project--project-status-input"
                  name="add-project--project-status-input"
                  ref={projectStatusInput}
                />
              </label>

              <div class="date-estimates-holder">
                <label
                  for="add-project--start-date-input"
                  class="add-project--start-date-label"
                >
                  Start Date
                  <input
                    type="date"
                    class="add-project-form--form-input add-project--start-date-input"
                    id="add-project--start-date-input"
                    name="add-project--start-date-input"
                    ref={projectStartDateInput}
                  />
                </label>

                <label
                  for="add-project--end-date-input"
                  class="add-project--end-date-label"
                >
                  End Date
                  <input
                    type="date"
                    class="add-project-form--form-input add-project--end-date-input"
                    id="add-project--end-date-input"
                    name="add-project--end-date-input"
                    ref={projectEndDateInput}
                  />
                </label>
              </div>

              <label
                for="add-project--estimated-hours-input"
                class="add-project--estimated-hours-label"
              >
                Estimated Hours
                <input
                  required="required"
                  type="number"
                  step="1"
                  class="add-project-form--form-input add-project--estimated-hours-input"
                  id="add-project--estimated-hours-input"
                  name="add-project--estimated-hours-input"
                  ref={estimatedHoursInput}
                />
              </label>
            </div>

            <button
              // onClick={validateRequiredInputs}
              id="add-project-form--add-project-button"
              class="add-project-form--add-project-button"
            >
              Add Project
            </button>
          </form>
        </div>

        {/* LIST OUT SUMMARY OF PROJECTS */}
        {/* <iframe
          src=""
          id="project-list-summary_iframe"
          class="project-list-summary_iframe"
        ></iframe> */}
      </main>
    </div>
  );
}

export default AddProject;
