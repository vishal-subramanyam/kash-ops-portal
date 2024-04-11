import React from "react";
import "../assets/styles/HomePage.css";

function NewInvoiceTypeModal(props) {
  return (
    <dialog
      className="database-submit-dialog success-modal-container"
      role="alert"
      id="database-submit-dialog"
    >
      <form method="dialog">
        <p>{props.message}</p>

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
}

export default NewInvoiceTypeModal;
