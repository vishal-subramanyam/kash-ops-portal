import React, { forwardRef } from "react";
import "../assets/styles/HomePage.css";

const newInvoiceTypeModal = forwardRef(function (props, ref) {
  return (
    <dialog
      className="database-submit-dialog success-modal-container"
      role="alert"
      id="database-submit-dialog"
      ref={ref}
    >
      <form method="dialog">
        <p>Test Me</p>

        <div>
          <button
            className="dialog-modal-confirm-button success-modal-button"
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

export default newInvoiceTypeModal;
