import React, { forwardRef } from "react";
import "../assets/styles/HomePage.css";
import "../assets/styles/Styles.css";

const timesheetStatusEntry = forwardRef(function (props, ref) {
  return (
    <dialog
      className="database-submit-dialog timesheet-status-modal-container"
      id="database-submit-dialog"
      ref={ref}
    >
      <span onClick={props.close} className="x-button">
        X
      </span>

      <form method="dialog">
        <textarea
          rows={5}
          cols={45}
          maxLength={7900}
          spellCheck={true}
          value={props.entry}
        >
          {props.entry}
        </textarea>

        <div>
          <button
            className="dialog-modal-confirm-button"
            id="dialog-modal-confirm-button"
            value="confirm"
            onClick={props.save}
          >
            SAVE
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default timesheetStatusEntry;
