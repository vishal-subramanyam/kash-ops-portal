import React from "react";
import "../assets/styles/Styles.css"

function SaveNewSubCategory(props) {
    return ( 
                    <details class="new-main-grouping" open >
                        <summary>
                            {props.subCatName}
                        </summary>
                        
                            <div class="workspace-add-task-to-workarea-input">
                                <button class="edit-area-close-btn" aria-label="close"  onClick={props.close} type="button">x</button>
                                <form id="inputNewTask" class="workspace-add-task-input-area">
                                
                                    <div class="workspace-add-task-plus">
                                        <svg id="addWorkspaceBtn"class="add-sub-assignment-details-form--add-sub-assignment-button-svg"  xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="25" height="25" fillRule="nonzero"><g fill="#e7549a" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#ffffff" fillRule="evenodd" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}><g transform="scale(10.66667,10.66667)"><path d="M11,2v9h-9v2h9v9h2v-9h9v-2h-9v-9z"></path></g></g></svg>
                                    </div>
                                            
                                        
                                    <div class="workspace-add-task-text-input">
                                        <input id="newTaskInputId" class="add-new-sub-task-input" type="text" placeholder="New Task Name"/>
                                    </div>
                                        
                                    <button id="previewNewTaskBtn" class="add-sub-assignment-workspace-form--add-button workspace-add-task-btn" type="button" onclick={console.log("preview new task")}>Add Task</button>
                                
                                </form>
                            </div>
                            <div class="workspace-add-task-top-workarea-view">
                               
                            </div>
                            <div class="workspace-area">
                                <button id="saveWorkArea" class="workspace-add-task-btn" onClick={console.log("save new sub cat")}>Save Work Area</button>
                            </div>
                    </details>
                     );
}

export default SaveNewSubCategory;
