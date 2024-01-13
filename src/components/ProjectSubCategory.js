import React, { useRef, useState } from "react";
import "../assets/styles/Styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import SubCategoryTask from "./SubCategoryTask";

function ProjectSubCategory(props) {
  let taskSegment1 = useRef();
  let confirmationModal = useRef();
  // Show the tasks per sub category and filter out segments with no value. set that filtered array to state
  let filteredSubCats = props.allSubCats.filter((task) => {
    return (
      // task.SowId === props.subCategory.SowId &&
      task.ProjectSubTaskId === props.subCategory.ProjectSubTaskId &&
      task.Segment1 !== "" &&
      task.Segment1 !== "-"
    );
  });
  let [tasksBySubCategory, setTaskBySubCategory] = useState(filteredSubCats);
  console.log("filtered Sub Cats (proj sub cat component)", filteredSubCats);
  console.log(
    "filtered Sub Cats State Arr (proj sub cat component)",
    tasksBySubCategory
  );

  // add task to existing sub category
  const addTaskToSubCategory = async (
    projectId,
    subCatTitle,
    subCatId,
    segment1
  ) => {
    // e.preventDefault()
    console.log(
      "Add task to sub category",
      projectId,
      subCatTitle,
      subCatId,
      segment1
    );
    let newSubCatTask = {
      SowId: projectId,
      ProjectSubTaskId: subCatId,
      SubTaskTitle: subCatTitle,
      Segment2: "",
      Segment1: segment1,
      Segment3: "",
    };
    // add task to existing sub category. Validate if task name field is filled out
    if (segment1 === undefined || segment1 === "") {
      alert("Fill in a task name.");
    } else {
      console.log("run fetch to add task to sub cat");
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
                  SowId: projectId,
                  ProjectSubTaskId: subCatId,
                  SubTaskTitle: subCatTitle,
                  Segment2: "",
                  Segment1: segment1,
                  Segment3: "",
                },
              ],
              _keyword_: "KASH_OPERATIONS_PROJECT_SUB_CATEGORY_TABLE",
              secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
            }),
          }
        );
        const data = await response.json();
        console.log("Added task to sub category table", data);

        // update the array that filters to show sub cat tasks (segment1s)
        setTaskBySubCategory((prevState) => [...prevState, newSubCatTask]);
        taskSegment1.current.value = "";
      } catch (error) {
        console.log(error);
        alert("Unable to add task.");
      }
    }
  };

  // const areYouSure = () => {
  //   confirmationModal.current.showModal();
  // };

  // const closeConfirmationModal = () => {
  //   confirmationModal.current.close();
  // };

  // const deleteSubCategory = async (sowId, subCatId) => {
  //   console.log("delete button clicked", sowId, subCatId);

  //   try {
  //     const response = await fetch(
  //       "http://localhost:4040/GenericTransactionService/processTransactionForDelete",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           // your expected POST request payload goes here
  //           data: [
  //             {
  //               SowId: sowId,
  //               ProjectSubTaskId: subCatId,
  //             },
  //           ],
  //           _keyword_: "KASH_OPERATIONS_PROJECT_SUB_CATEGORY",
  //           secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
  //         }),
  //       }
  //     );
  //     const data = await response.json();
  //     // enter you logic when the fetch is successful
  //     console.log(
  //       `Deleted Sub Category ${props.subCategory.SubTaskTitle}`,
  //       data
  //     );
  //     closeConfirmationModal();
  //     // props.reset();
  //   } catch (error) {
  //     alert(`Unable to delete ${props.subCategory.SubTaskTitle}. ${error}`);
  //   }

  //   // need to update the state array - consolidatedSubCategories
  //   console.log(props.subCats);
  //   let deleteSubCat = props.subCats.filter((cat) => {
  //     return cat.SubTaskTitle !== props.subCategory.SubTaskTitle;
  //   });
  //   props.resetConsolidatedSubCatArr(deleteSubCat);
  //   props.reset();
  // };

  return (
    <div>
      <details className="main-grouping">
        <summary>
          <p>{props.subCategory.SubTaskTitle}</p>

          {/* <button onClick={() => areYouSure()} className="delete-sub-category"> */}
          <button
            onClick={() => props.confirm()}
            className="delete-sub-category"
          >
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
              <svg
                id="addWorkspaceBtn"
                className="add-sub-assignment-details-form--add-sub-assignment-button-svg"
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
            <div className="workspace-add-task-text-input">
              <input
                id="addtaskid"
                className="add-new-sub-task-input add-workspace"
                type="text"
                placeholder="New Task Name"
                defaultValue={""}
                ref={taskSegment1}
                required
              />
            </div>

            <button
              className="workspace-add-task-btn"
              type="button"
              onClick={() =>
                addTaskToSubCategory(
                  props.projectId,
                  props.subCatTitle,
                  props.subCatId,
                  taskSegment1.current.value
                )
              }
            >
              Add Task
            </button>
          </form>
        </div>
        <div id="segment1id">
          {tasksBySubCategory.map((task, i) => {
            return (
              <SubCategoryTask
                key={i}
                subCategoryTask={task}
                refetchAll={props.reset}
                allTasks={tasksBySubCategory}
                resetTasks={setTaskBySubCategory}
              />
            );
          })}
        </div>
      </details>

      {/* <dialog
        id="myModal"
        className="confirm-delete-dialog-box"
        ref={confirmationModal}
      >
        <div id="confirmmsgdiv" className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header flex-column">
              <h4 className="modal-title w-100">Confirm Delete</h4>
              <button
                onClick={closeConfirmationModal}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div id="removeconfirmpopup" className="modal-body">
              <p>
                Are you sure you want to delete{" "}
                <b>{props.subCategory.SubTaskTitle}</b>?{" "}
              </p>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                onClick={closeConfirmationModal}
                type="button"
                className="modal-btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-btn btn-danger"
                onClick={() =>
                  deleteSubCategory(props.projectId, props.subCatId)
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </dialog> */}
    </div>
  );
}

export default ProjectSubCategory;
