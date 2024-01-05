import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/Styles.css";
import AddSubCategoryForm from "../components/AddSubCategoryForm";

function EditProject() {
  let companyName = useRef();
  let newWorkAreaInput = useRef();
  let newWorkAreaIdInput = useRef();
  let myModal = useRef();
  let [allCompaniesArr, setAllCompaniesArr] = useState([]);
  let [allCompaniesProjectsArr, setAllCompaniesProjectsArr] = useState([]);
  let requiredInputs = [companyName, newWorkAreaInput, newWorkAreaIdInput];

  //   on page load, fetch companies from DB
  useEffect(() => {
    console.log("use effect to get all companies")
    getAllCompaniesProjects();
  }, [])

  const getAllCompaniesProjects = async () => {
    await fetch("http://localhost:4040/GenericResultBuilderService/buildResults", {
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
        console.log(res);
        setAllCompaniesProjectsArr(res.data)
        let removeDuplicateCompany = Object.values(
          res.data.reduce((c, e) => {
            if (!c[e.CompanyName]) c[e.CompanyName] = e;
            return c;
          }, {})
        );
        setAllCompaniesArr(removeDuplicateCompany);
      })
      .catch((err) => alert("Unable to get companies from database.", err));
  };

  const getProjectsByCompany = (id) => {
    console.log(id)
    let projectsByCompanyId 
  }

  const selectCompanyLoadProjectDescription = (e) => {
    console.log("company selected", e.target[e.target.selectedIndex].getAttribute("data-companyid"));
    let selectedCompanyId = e.target[e.target.selectedIndex].getAttribute("data-companyid")
    console.log(allCompaniesProjectsArr)
    getProjectsByCompany(selectedCompanyId)
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

   const areYouSure = (x,t,u) => {
//                 document.getElementById('removeconfirmpopup').value = "";
    document.getElementById('myModal').showModal();
   }

  return (
    <div className="add-sub-assignment-page--body">
      <main className="add-sub-assignment__main-section max-width--main-container">
        <h1 className="add-sub-assignment-title form-page-title--lg-1">
          Edit Project Details
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
        <div className="add-sub-assignment--content-holder">
          <form className="add-sub-assignment--form">
            <div className="add-sub-assignment--form--edit-project-details">
              <label
                for="add-sub-assignment-form--company-name-input"
                className="add-sub-assignment-form--company-name-label"
              >
                Company Name
                <select
                  onChange={selectCompanyLoadProjectDescription}
                  ref={companyName}
                  className="add-sub-assignment-form--company-name-input"
                  id="add-sub-assignment-form--company-name-input"
                  name="add-sub-assignment-form--company-name-input"
                  required
                >
                  <option value="">- Choose A Company -</option>
                  {allCompaniesArr.map((companyProject, i) => {
                    return <option key={i} value={companyProject.CompanyName} data-companyid={companyProject.CompanyId} data-sowid={companyProject.SowId}>{companyProject.CompanyName}</option>
                  })}
                </select>
              </label>

              <label
                for="add-sub-assignment-form--project-description-input"
                className="add-sub-assignment-form--project-description-label"
              >
                Project Description
                <select
                  // onChange={populateSubAssignmentsWorkArea(this)}
                  className="add-sub-assignment-form--project-description-input"
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
                <!--<div className="sub-assignment-estimates">-->
                    
                <!--    <label for="add-sub-assignment-form--change-status-input" className="add-sub-assignment-form--change-status-label">-->
                <!--        Change Status-->
                <!--        <select onchange="" className="add-sub-assignment-form--change-status-input" id="add-sub-assignment-form--change-status-input" name="add-sub-assignment-form--change-status-input">-->
                <!--            <option value="">-->
                <!--            </option>-->
                <!--        </select>-->
                <!--    </label>-->

                <!--    <div className="date-estimates-holder">-->

                <!--        <label for="add-sub-assignment--start-date-input" className="add-sub-assignment--start-date-label">-->
                <!--            Change Start Date-->
                <!--            <input type="date" className="add-sub-assignment-form--form-input add-sub-assignment--start-date-input" id="add-sub-assignment--start-date-input" name="add-sub-assignment--start-date-input" required="required">-->
                <!--        </label>-->

                <!--        <label for="add-sub-assignment--end-date-input" className="add-sub-assignment--end-date-label">-->
                <!--            End Date-->
                <!--            <input type="date" className="add-sub-assignment-form--form-input add-sub-assignment--end-date-input" id="add-sub-assignment--end-date-input" name="add-sub-assignment--end-date-input" required="required">-->
                <!--        </label>-->
                        
                <!--    </div>-->

                <!--    <label for="add-sub-assignment--estimated-hours-input" className="add-sub-assignment--estimated-hours-label">-->
                <!--        Change Estimated Hours-->
                <!--        <input type="number" step="1" className="add-sub-assignment-form--form-input add-sub-assignment--estimated-hours-input" id="add-sub-assignment--estimated-hours-input" name="add-sub-assignment--estimated-hours-input">-->
                <!--    </label>-->

                <!--</div>-->
                
                <!-- <button onClick="" id="add-sub-assignment-form--submit-changes-button" className="add-sub-assignment-form--submit-changes-button">-->
                <!--    Submit Changes-->
                <!--</button>-->
                
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
 */}
          </form>

          <div className="add-sub-assignment-details-holder-container">
            <h2 className="sub-assignment-title form-page-title--md-1">
              SUB-ASSIGNMENTS
              <span
                id="subAssignmentInfoIcon"
                className="material-symbols-outlined sub-assignment-help-icon"
                alt="help-icon"
              >
                <FontAwesomeIcon icon={faCircleInfo} />
              </span>
            </h2>
            <div className="add-sub-assignment-details-form--add-sub-assignment-details">
              <AddSubCategoryForm />
              <div
                className="add-sub-assignment-view-workspace-task-area"
                id="workspacetaskarea"
              >
               <details className="main-grouping">
                    <summary>
                      <p>
                      Project (SOW ID) Sub Category
                      </p>

                    <button onClick="areYouSure('${workspace[0]}', '${t}', '${u}')" className="trash-btn btn-delete">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                    </summary>
                    <div className="workspace-add-task-to-workarea-input">
                      <form className="workspace-add-task-input-area">
                  
                          <div className="workspace-add-task-plus">
                              <svg id="addWorkspaceBtn"className="add-sub-assignment-details-form--add-sub-assignment-button-svg"  xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="25" height="25" fill-rule="nonzero"><g fill="#e7549a" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" font-family="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#ffffff" fill-rule="evenodd" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}><g transform="scale(10.66667,10.66667)"><path d="M11,2v9h-9v2h9v9h2v-9h9v-2h-9v-9z"></path></g></g></svg>
                          </div>
                              
                          
                          <div className="workspace-add-task-text-input">
                              <input id="addtaskid" className="add-new-sub-task-input add-workspace" type="text" placeholder="New Task Name" />
                          </div>
                          
                          <button className="workspace-add-task-btn" type="button" onClick="addTaskToWorkArea('${workspace[0]}',${i}, ${segment1id})">Add Task</button>
                      </form>
                    </div>
                    <div id="segment1id">
                       <details className="sub-grouping">
                          <summary>
                            <p>Segment 1</p>
                          <button onClick="areYouSure('${subtask.SEGMENT_1}', '${t}', '${subtask.PROJECT_SUB_TASK_ID}')" className="trash-btn btn-delete">
                            <span className="material-symbols-outlined">
                              <FontAwesomeIcon
                                className="delete-timesheet-record"
                                icon={faTrashCan}
                              />
                            </span>
                          </button>
                          </summary>
                        </details>
                    </div>
                  </details>
              </div>
            </div>
          </div>

          <dialog id="myModal" className="confirm-delete-dialog-box" ref={myModal}>
             <div id="confirmmsgdiv" className="modal-dialog modal-confirm">
                  <div className="modal-content">
                      <div className="modal-header flex-column">						
                          <h4 className="modal-title w-100">Confirm Delete</h4>	
                          <button onClick="closeModal()" type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                      </div>
                      <div id="removeconfirmpopup" className="modal-body">
                          <p>Are you sure you want to delete <b>Sub Category or Segment</b>? </p>    				
                      </div>
                      <div className="modal-footer justify-content-center">
                          <button onClick="closeModal()" type="button" className="modal-btn btn-secondary" data-dismiss="modal">Cancel</button>
                          <button type="button" className="modal-btn btn-danger" onClick="deleteWorkArea('${x}', '${t}', '${u}')">Delete</button>
                      </div>
                  </div>
              </div>
          </dialog>
        </div>
      </main>
    </div>
  );
}

export default EditProject;
