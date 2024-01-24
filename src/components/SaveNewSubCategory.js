import React, { useState, useRef } from "react";
import "../assets/styles/Styles.css";

function SaveNewSubCategory(props) {
  let newTaskName = useRef();
  let [newTaskToDisplay, setNewTaskToDisplay] = useState([]);
  let [subCatRecordsToSave, setSubCatRecordsToSave] = useState([
    {
      SowId: props.projectId,
      ProjectSubTaskId: props.subCatId,
      SubTaskTitle: props.subCatName,
      Segment2: "-",
      Segment1: "-",
      Segment3: "-",
    },
  ]);

  const createNewSubCatRecord = (projectId, subCatName, subCatId) => {
    console.log(projectId, subCatName, subCatId, newTaskName.current.value);
    if (
      newTaskName.current.value === undefined ||
      newTaskName.current.value === ""
    ) {
      setMessage(
        alertMessageDisplay("Please fill out the new task name field.")
      );
      alertMessage.current.showModal();
    } else {
      let newSubCatTaskRecord = {
        SowId: projectId,
        ProjectSubTaskId: subCatId,
        SubTaskTitle: subCatName,
        Segment2: "-",
        Segment1: newTaskName.current.value,
        Segment3: "-",
      };
      setNewTaskToDisplay((prevState) => [...prevState, newSubCatTaskRecord]);
      setSubCatRecordsToSave((prevState) => [
        ...prevState,
        newSubCatTaskRecord,
      ]);
      newTaskName.current.value = "";
    }
  };
  return (
    <details class="new-main-grouping" open>
      <summary>{props.subCatName}</summary>

      <div class="workspace-add-task-to-workarea-input">
        <button
          class="edit-area-close-btn"
          aria-label="close"
          onClick={props.close}
          type="button"
        >
          x
        </button>
        <form id="inputNewTask" class="workspace-add-task-input-area">
          <div class="workspace-add-task-plus">
            <svg
              id="addWorkspaceBtn"
              class="add-sub-assignment-details-form--add-sub-assignment-button-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0,0,256,256"
              width="25"
              height="25"
              fillRule="nonzero"
            >
              <g
                fill="#e7549a"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <path d="M0,256v-256h256v256z" id="bgRectangle"></path>
              </g>
              <g
                fill="#ffffff"
                fillRule="evenodd"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <g transform="scale(10.66667,10.66667)">
                  <path d="M11,2v9h-9v2h9v9h2v-9h9v-2h-9v-9z"></path>
                </g>
              </g>
            </svg>
          </div>

          <div class="workspace-add-task-text-input">
            <input
              id="newTaskInputId"
              class="add-new-sub-task-input"
              type="text"
              placeholder="New Task Name"
              ref={newTaskName}
            />
          </div>

          <button
            id="previewNewTaskBtn"
            class="add-sub-assignment-workspace-form--add-button workspace-add-task-btn"
            type="button"
            onClick={() =>
              createNewSubCatRecord(
                props.projectId,
                props.subCatName,
                props.subCatId
              )
            }
          >
            Add Task
          </button>
        </form>
      </div>
      <div class="workspace-add-task-top-workarea-view">
        {console.log(subCatRecordsToSave)}
        {newTaskToDisplay.map((task, i) => {
          return (
            <details class="new-sub-grouping" key={i}>
              <summary>{task.Segment1}</summary>
            </details>
          );
        })}
      </div>
      <div class="workspace-area">
        <button
          id="saveWorkArea"
          class="workspace-add-task-btn"
          onClick={() => props.saveRecord(subCatRecordsToSave)}
        >
          Save Work Area
        </button>
      </div>
    </details>
  );
}

export default SaveNewSubCategory;
