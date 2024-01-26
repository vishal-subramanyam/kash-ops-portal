import React, { forwardRef } from "react";
import "../assets/styles/HomePage.css";

const alertMessage = forwardRef(function (props, ref) {
  return (
    <dialog
      className="database-submit-dialog alert-modal-container"
      role="alert"
      id="database-submit-dialog"
      ref={ref}
    >
      <form method="dialog">
        <p>{props.message}</p>

        <div>
          <button
            className="dialog-modal-confirm-button alert-modal-button"
            id="dialog-modal-confirm-button"
            value="confirm"
            style={{ marginTop: "15px" }}
            onClick={props.close}
          >
            CLOSE
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default alertMessage;
