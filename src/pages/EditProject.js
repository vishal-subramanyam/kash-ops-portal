import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Styles.css";

function EditProject() {
  var company = document.getElementById(
    "add-sub-assignment-form--company-name-input"
  );
  var newWorkAreaInput = document.getElementById("newWorkAreaInput");
  var newWorkAreaIdInput = document.getElementById("newWorkAreaIdInput");
  let requiredInputs = [company, newWorkAreaInput, newWorkAreaIdInput];

  //   on page load, fetch companies from DB

  const selectCompanyLoadProjectDescription = () => {
    console.log("company selected");

    // fetch from projects table and list project descriptions by company
  };

  const populateSubAssignmentsWorkArea = (selectedProject) => {
    console.log("project sub assignments" + selectedProject);
  };

  const validateRequiredInputs = () => {
    // validate inputs
    // run function to edit project details
    // create sub-assignment for project
    // open confirmation portal function
  };

  return (
    <div class="add-sub-assignment-page--body">
      <main class="add-sub-assignment__main-section max-width--main-container">
        <h1 class="add-sub-assignment-title form-page-title--lg-1">
          Edit Project Details
        </h1>
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
        <div class="add-sub-assignment--content-holder">
          <form class="add-sub-assignment--form">
            <div class="add-sub-assignment--form--edit-project-details">
              <label
                for="add-sub-assignment-form--company-name-input"
                class="add-sub-assignment-form--company-name-label"
              >
                Company Name
                <select
                  onChange={selectCompanyLoadProjectDescription}
                  class="add-sub-assignment-form--company-name-input"
                  id="add-sub-assignment-form--company-name-input"
                  name="add-sub-assignment-form--company-name-input"
                  required
                >
                  <option value="">- Choose A Company -</option>
                </select>
              </label>

              <label
                for="add-sub-assignment-form--project-description-input"
                class="add-sub-assignment-form--project-description-label"
              >
                Project Description
                <select
                  onChange={populateSubAssignmentsWorkArea(this)}
                  class="add-sub-assignment-form--project-description-input"
                  id="add-sub-assignment-form--project-description-input"
                  name="add-sub-assignment-form--project-description-input"
                >
                  <option value=""></option>
                </select>
              </label>
            </div>
            {/* 
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<!--------------------------------------EDIT PROJECT DETAILS----------------DO NOT DELETE!!!!!!!!!!!!!!!!!!!!!!-------JUST UNCOMMENT IT and make it work while you're at it------------------------->
<!--------------------------------------------------------WORK IN PROGRESS-------------------------------------------------------------------------------------------------------------------------->
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
                <!--<div class="sub-assignment-estimates">-->
                    
                <!--    <label for="add-sub-assignment-form--change-status-input" class="add-sub-assignment-form--change-status-label">-->
                <!--        Change Status-->
                <!--        <select onchange="" class="add-sub-assignment-form--change-status-input" id="add-sub-assignment-form--change-status-input" name="add-sub-assignment-form--change-status-input">-->
                <!--            <option value="">-->
                <!--            </option>-->
                <!--        </select>-->
                <!--    </label>-->

                <!--    <div class="date-estimates-holder">-->

                <!--        <label for="add-sub-assignment--start-date-input" class="add-sub-assignment--start-date-label">-->
                <!--            Change Start Date-->
                <!--            <input type="date" class="add-sub-assignment-form--form-input add-sub-assignment--start-date-input" id="add-sub-assignment--start-date-input" name="add-sub-assignment--start-date-input" required="required">-->
                <!--        </label>-->

                <!--        <label for="add-sub-assignment--end-date-input" class="add-sub-assignment--end-date-label">-->
                <!--            End Date-->
                <!--            <input type="date" class="add-sub-assignment-form--form-input add-sub-assignment--end-date-input" id="add-sub-assignment--end-date-input" name="add-sub-assignment--end-date-input" required="required">-->
                <!--        </label>-->
                        
                <!--    </div>-->

                <!--    <label for="add-sub-assignment--estimated-hours-input" class="add-sub-assignment--estimated-hours-label">-->
                <!--        Change Estimated Hours-->
                <!--        <input type="number" step="1" class="add-sub-assignment-form--form-input add-sub-assignment--estimated-hours-input" id="add-sub-assignment--estimated-hours-input" name="add-sub-assignment--estimated-hours-input">-->
                <!--    </label>-->

                <!--</div>-->
                
                <!-- <button onclick="" id="add-sub-assignment-form--submit-changes-button" class="add-sub-assignment-form--submit-changes-button">-->
                <!--    Submit Changes-->
                <!--</button>-->
                
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
 */}
          </form>

          <div class="add-sub-assignment-details-holder-container">
            <h2 class="sub-assignment-title form-page-title--md-1">
              SUB-ASSIGNMENTS
              <span
                id="subAssignmentInfoIcon"
                class="material-symbols-outlined sub-assignment-help-icon"
              >
                help
              </span>
            </h2>
            <div class="add-sub-assignment-details-form--add-sub-assignment-details">
              <form class="add-sub-assignment-input-area">
                <div class="add-sub-assignment-workspace-form--form-input--plus">
                  <svg
                    id="addWorkspaceBtn"
                    class="add-sub-assignment-details-form--add-sub-assignment-button-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0,0,256,256"
                    width="25"
                    height="25"
                    fill-rule="nonzero"
                  >
                    <g
                      fill="#e7549a"
                      fill-rule="nonzero"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <path d="M0,256v-256h256v256z" id="bgRectangle"></path>
                    </g>
                    <g
                      fill="#ffffff"
                      fill-rule="evenodd"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <g transform="scale(10.66667,10.66667)">
                        <path d="M11,2v9h-9v2h9v9h2v-9h9v-2h-9v-9z"></path>
                      </g>
                    </g>
                  </svg>
                </div>

                <div class="add-sub-assignment-workspace-form--form-input--workspace-input">
                  <input
                    id="newWorkAreaInput"
                    class="add-sub-assignment-details-form--form-input add-workspace"
                    type="text"
                    placeholder="Work Area"
                    required="required"
                  />
                </div>

                <div class="add-sub-assignment-workspace-form--form-input--task-area-input">
                  <input
                    id="newWorkAreaIdInput"
                    class="add-sub-assignment-details-form--form-input add-task-area"
                    type="text"
                    placeholder="Work Area ID"
                    required="required"
                  />
                </div>

                <button
                  id="createWorkAreaBtn"
                  class="add-sub-assignment-workspace-form--add-button"
                  type="button"
                  onClick={validateRequiredInputs}
                >
                  Create Work Area
                </button>
              </form>
              <div
                class="add-sub-assignment-view-workspace-task-area"
                id="workspacetaskarea"
              ></div>
            </div>
          </div>

          <dialog id="myModal" class="confirm-delete-dialog-box"></dialog>
        </div>
      </main>
    </div>
  );
}

export default EditProject;
