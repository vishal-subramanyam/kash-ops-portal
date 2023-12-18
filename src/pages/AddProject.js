import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Styles.css";

function AddProject() {
  let [projectType, setProjectType] = useState("");
  let [statementOfWorkId, setStatementOfWorkId] = useState("");
  let [projectStatus, setProjectStatus] = useState("");
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");
  let [estimatedHours, setEstimatedHours] = useState("");
  let [selectedCompany, setSelectedCompany] = useState("");
  let [allProjectsArr, setAllProjectsArr] = useState([]);
  let [allCompanies, setAllCompanies] = useState([]);

  // useEffect to get (POST) projects from database and add to allProjects state array
  // get companies from database and add allCompanies state arra

  const validateRequiredInputs = () => {
    // validate input fields
    // run function to POST project to database
    // show confirmation modal
  };
  return (
    <div>
      <dialog class="database-submit-dialog" id="database-submit-dialog">
        <form method="dialog">
          <p>
            Project Created: <br />
            <span
              id="project-page-dialog--company-name-span"
              class="project-page-dialog--company-name-span"
            ></span>
            <span
              class="project-page-dialog--project-type-span"
              id="project-page-dialog--project-type-span"
            ></span>
            <span
              id="project-page-dialog--sow-id-span"
              class="project-page-dialog--sow-id-span"
            ></span>
          </p>
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
          <form action="" id="add-project--form" class="add-project--form">
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
                  onChange={(e) => setSelectedCompany(e.target.value)}
                >
                  <option value="">- Choose A Company -</option>
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
                  onChange={(e) => setProjectType(e.target.value)}
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
                  onChange={(e) => setStatementOfWorkId(e.target.value)}
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
                  onChange={(e) => setProjectStatus(e.target.value)}
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
                    onChange={(e) => setStartDate(e.target.value)}
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
                    onChange={(e) => setEndDate(e.target.value)}
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
                  onChange={(e) => setEstimatedHours(e.target.value)}
                />
              </label>
            </div>

            <button
              onClick={validateRequiredInputs}
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
