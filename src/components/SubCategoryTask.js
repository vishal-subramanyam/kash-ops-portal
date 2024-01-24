import React, { useRef } from "react";
import AlertMessage from "./AlertMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { domain } from "../assets/api/apiEndpoints";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/Styles.css";

function SubCategoryTask(props) {
  let confirmationModal = useRef();
  let alertMessage = useRef();
  let [message, setMessage] = useState("");

  const alertMessageDisplay = (entry) => {
    return entry;
  };

  const closeAlert = () => {
    alertMessage.current.close();
    addEmployeeForm.current.reset();
  };

  const areYouSure = () => {
    confirmationModal.current.showModal();
  };

  const closeConfirmationModal = () => {
    confirmationModal.current.close();
  };

  const deleteSubCatTask = async (sowId, subCatId, task) => {
    console.log("delete button clicked", sowId, subCatId, task);

    try {
      const response = await fetch(
        `${domain}GenericTransactionService/processTransactionForDelete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            data: [
              {
                SowId: sowId,
                ProjectSubTaskId: subCatId,
                Segment1: task,
              },
            ],
            _keyword_: "KASH_OPERATIONS_PROJECT_SUB_CATEGORY_TASK",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
      const data = await response.json();
      console.log(
        `Deleted Sub Category Task ${props.subCategoryTask.Segment1}`,
        data
      );
      closeConfirmationModal();
      // console.log(props.allTasks);
      let deleteTask = props.allTasks.filter((task) => {
        return task.Segment1 !== props.subCategoryTask.Segment1;
      });
      props.resetTasks(deleteTask);
      props.refetch();
    } catch (error) {
      setMessage(
        alertMessageDisplay(
          `Unable to delete ${props.subCategoryTask.Segment1}. Error: ${error}`
        )
      );
      alertMessage.current.showModal();
    }
  };

  return (
    <div>
      <details className="sub-grouping">
        <summary>
          <p>{props.subCategoryTask.Segment1}</p>
          <button onClick={() => areYouSure()} className="delete-task">
            <span className="material-symbols-outlined">
              <FontAwesomeIcon
                className="delete-timesheet-record"
                icon={faTrashCan}
              />
            </span>
          </button>
        </summary>
      </details>

      <dialog
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
                Are you sure you want to delete
                <b>{props.subCategoryTask.Segment1}</b>?
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
                  deleteSubCatTask(
                    props.subCategoryTask.SowId,
                    props.subCategoryTask.ProjectSubTaskId,
                    props.subCategoryTask.Segment1
                  )
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <AlertMessage ref={alertMessage} close={closeAlert} message={message} />
    </div>
  );
}

export default SubCategoryTask;
