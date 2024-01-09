import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/Styles.css";

function SubCategoryTask(props) {
    return ( 
        <details className="sub-grouping">
                {console.log(props.subCategoryTask)}
                <summary>
                    <p>{props.subCategoryTask.Segment1}</p>
                <button onClick={props.deleteTaskConfirmation} className="delete-task">
                    <span className="material-symbols-outlined">
                    <FontAwesomeIcon
                        className="delete-timesheet-record"
                        icon={faTrashCan}
                    />
                    </span>
                </button>
                </summary>
            </details> 
            );
}

export default SubCategoryTask;