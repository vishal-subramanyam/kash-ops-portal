import React, {useCallback, useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/Styles.css";
import AddSubCategoryForm from "../components/AddSubCategoryForm";
import ProjectSubCategory from "../components/ProjectSubCategory";

function EditProject() {
  let companyName = useRef();
  let newWorkAreaInput = useRef();
  let newWorkAreaIdInput = useRef();
  let confirmationModal = useRef();
  let projectDescription = useRef();
  let selectedProjectSowId;
  let subCategoriesByProject = [];
  let allTasksBySubCategory = [];
  let [subCategoriesByProjectState, setSubCategoriesByProjectState] = useState([]);
  let [allCompaniesRemoveDuplicateArr, setAllCompaniesRemoveDuplicateArr] = useState([]);
  let [allProjectsByCompany, setAllProjectsByCompany] = useState([]);
  let [allSubCategories, setAllSubCategories] = useState([]);
  let [consolidatedSubCategories, setConsolidatedSubCategories] = useState([]);
  let [allCompaniesProjectsArr, setAllCompaniesProjectsArr] = useState([]);
  let requiredInputs = [companyName, newWorkAreaInput, newWorkAreaIdInput];

  //   on page load, fetch companies from DB
  useEffect(() => {
    console.log("use effect to get all companies, projects and subcategories")
    getAllCompaniesProjects();
    getProjectAndSubcategories()
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
        setAllCompaniesRemoveDuplicateArr(removeDuplicateCompany);
      })
      .catch((err) => alert("Unable to get companies from database.", err));
  };

  const getProjectsByCompany = (id) => {
    console.log(id)
    let projectsByCompanyId = allCompaniesProjectsArr.filter((project) => {
      return id === project.CompanyId
    }) 
    console.log(projectsByCompanyId)
    setAllProjectsByCompany(projectsByCompanyId)
  };

  const selectCompanyLoadProjectDescription = (e) => {
    setConsolidatedSubCategories([])
    console.log("company selected", e.target[e.target.selectedIndex].getAttribute("data-companyid"));
    let selectedCompanyId = e.target[e.target.selectedIndex].getAttribute("data-companyid")
    console.log(allCompaniesProjectsArr)
    getProjectsByCompany(selectedCompanyId)
  };

  const getProjectAndSubcategories = async () =>{
      await fetch("http://localhost:4040/GenericResultBuilderService/buildResults", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "KASH_OPERATIONS_PROJECT_SUB_CATEGORY_TABLE",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setAllSubCategories(res.data)
      })
      .catch((err) => alert("Unable to get project subcategories from database.", err));
  }

  const filterTasksBySubCategory = (subCategories) => {
    allTasksBySubCategory = subCategories.filter((task) => {
      return task.ProjectSubTaskId 
    })
  }


  const populateSubAssignmentsWorkArea = (e) => {
    console.log("project sub assignments", e.target[e.target.selectedIndex].getAttribute("data-sowid"));
    selectedProjectSowId = e.target[e.target.selectedIndex].getAttribute("data-sowid");
    console.log(allSubCategories)
    let subCatBySowId  = allSubCategories.filter((subCat) => {
      return selectedProjectSowId === subCat.SowId
    })
    subCategoriesByProject = subCatBySowId
    setSubCategoriesByProjectState(subCatBySowId)
    // filterTasksBySubCategory(subCategoriesByProject)
    console.log(subCategoriesByProject)
    // console.log(allTasksBySubCategory)
    let filteredSubCats = Object.values(
      subCategoriesByProject.reduce((c, e) => {
        if (!c[e.SubTaskTitle]) c[e.SubTaskTitle] = e;
        return c;
      }, {})
    );
    setConsolidatedSubCategories(filteredSubCats)
  };

  const addProjectSubCategory = (e) => {
    console.log("Add sub category to selected project by SOW ID", e.target)
  }

  const addTaskToSubCategory = (e) => {
    console.log("Add task to sub category", e.target)
  }

  const validateRequiredInputs = () => {
    // validate inputs
    // run function to edit project details
    // create sub-assignment for project
    // open confirmation portal function
  };

   const areYouSure = (e) => {
    console.log("delete confirmation", e.target)
    //                 document.getElementById('removeconfirmpopup').value = "";
    confirmationModal.current.showModal();
   }

   const closeConfirmationModal = () => {
    confirmationModal.current.close()
   }

   const deleteWorkArea = (sowId, taskId) => {
    console.log("delete button clicked")
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
                  {allCompaniesRemoveDuplicateArr.map((companyProject, i) => {
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
                  onChange={populateSubAssignmentsWorkArea}
                  className="add-sub-assignment-form--project-description-input"
                  id="add-sub-assignment-form--project-description-input"
                  name="add-sub-assignment-form--project-description-input"
                  ref={projectDescription}
                >

                  <option value=""></option>
                  {allProjectsByCompany.map((project) => {
                    return <option data-sowid={project.SowId}>{project.CompanyName} - {project.ProjectCategory} ({project.SowId})</option>
                  })}
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
              <AddSubCategoryForm addSubCategory={addProjectSubCategory}/>
              <div
                className="add-sub-assignment-view-workspace-task-area"
                id="workspacetaskarea"
              >
                {
                  consolidatedSubCategories.map((subCat) => {
                    return <ProjectSubCategory subCategory={subCat} allTasksBySubCategory={subCategoriesByProjectState} addTaskToSubCat={addTaskToSubCategory} deleteSubCatConfirmation={areYouSure}/>
                  })

                }
              </div>
            </div>
          </div>

          <dialog id="myModal" className="confirm-delete-dialog-box" ref={confirmationModal}>
             <div id="confirmmsgdiv" className="modal-dialog modal-confirm">
                  <div className="modal-content">
                      <div className="modal-header flex-column">						
                          <h4 className="modal-title w-100">Confirm Delete</h4>	
                          <button onClick={closeConfirmationModal} type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                      </div>
                      <div id="removeconfirmpopup" className="modal-body">
                          <p>Are you sure you want to delete <b>Sub Category or Segment</b>? </p>    				
                      </div>
                      <div className="modal-footer justify-content-center">
                          <button onClick={closeConfirmationModal} type="button" className="modal-btn btn-secondary" data-dismiss="modal">Cancel</button>
                          <button type="button" className="modal-btn btn-danger" onClick={deleteWorkArea(sowId, subTaskId)}>Delete</button>
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
