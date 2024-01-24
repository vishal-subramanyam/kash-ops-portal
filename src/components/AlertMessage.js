import React, { forwardRef } from "react";
import "../assets/styles/HomePage.css";

const alertMessage = forwardRef(function (props, ref) {
  return (
    <dialog
      className="database-submit-dialog"
      id="database-submit-dialog"
      ref={ref}
    >
      <form method="dialog">
        <p>{props.message}</p>

        <div>
          <button
            className="dialog-modal-confirm-button"
            id="dialog-modal-confirm-button"
            value="confirm"
            sttyle={{ marginTop: "15px" }}
            onClick={props.close}
          >
            OK
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default alertMessage;
