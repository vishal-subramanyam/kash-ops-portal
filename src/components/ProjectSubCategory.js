import React, {useRef} from "react";
import "../assets/styles/Styles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import SubCategoryTask from "./SubCategoryTask";

function ProjectSubCategory(props) {
  let taskSegment1 = useRef();
  // Show the tasks per sub category and filter out segments with no value
  let tasksBySubCategory = props.allTasksBySubCategory.filter((task) => {
    return task.ProjectSubTaskId === props.subCategory.ProjectSubTaskId && task.Segment1 !== "" && task.Segment1 !== "-"
  })
    return (      
                <details className="main-grouping">
                    <summary>
                      <p>
                      {props.subCategory.SubTaskTitle}
                      </p>

                    <button onClick={props.deleteSubCatConfirmation} className="delete-sub-category">
                      
                      <span className="material-symbols-outlined">
                        <FontAwesomeIcon
                        className="delete-timesheet-record"
                        icon={faTrashCan}
                    />
                    </span>
                    </button>
                    </summary>
                    <div className="workspace-add-task-to-workarea-input">
                      <form className="workspace-add-task-input-area">
                  
                          <div className="workspace-add-task-plus">
                              <svg id="addWorkspaceBtn"className="add-sub-assignment-details-form--add-sub-assignment-button-svg"  xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="25" height="25" fill-rule="nonzero"><g fill="#e7549a" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" font-family="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#ffffff" fill-rule="evenodd" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}><g transform="scale(10.66667,10.66667)"><path d="M11,2v9h-9v2h9v9h2v-9h9v-2h-9v-9z"></path></g></g></svg>
                          </div>
                          <div className="workspace-add-task-text-input">
                              <input id="addtaskid" className="add-new-sub-task-input add-workspace" type="text" placeholder="New Task Name" 
                              defaultValue={""}
                              ref={taskSegment1}
                              required
                              />
                          </div>
                          
                          <button className="workspace-add-task-btn"
                          type="button"
                          onClick={() => props.addTaskToSubCat(props.projectId, props.subCatTitle, props.subCatId, taskSegment1.current.value)}>Add Task</button>
                      </form>
                    </div>
                    <div id="segment1id">
                        {tasksBySubCategory.map((task) => {
                            return <SubCategoryTask subCategoryTask={task} deleteTaskConfirmation={props.deleteSubCatConfirmation}/>
                        })}
                    </div>
                  </details>
                   );
}

export default ProjectSubCategory;