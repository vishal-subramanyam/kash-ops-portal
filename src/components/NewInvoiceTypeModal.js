import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableList,
  faFile,
  faFileEdit,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";

import "../assets/styles/HomePage.css";

const newInvoiceTypeModal = forwardRef(function (props, ref) {
  const selectInvoiceType = (e) => {
    console.log(e.target);
  };

  return (
    <dialog
      className="database-submit-dialog invoice-type-modal-container"
      role="alert"
      id="database-submit-dialog"
      ref={ref}
    >
      <h1 className="new-invoice__page-title form-page-title--lg-1">
        Create New Invoice
      </h1>
      <form method="dialog" className="new-invoice-type-form">
        <button
          type="submit"
          className="new-invoice-type new-ts-invoice-choice"
        >
          <h6>From Timesheet Data</h6>
          <FontAwesomeIcon icon={faTableList} />
        </button>

        <button
          type="submit"
          className="new-invoice-type new-blank-invoice-choice"
        >
          <h6>Blank Invoice</h6>
          <FontAwesomeIcon icon={faFileInvoice} />
        </button>

        {/* <div>
          <button
            className="dialog-modal-confirm-button invoice-type-modal-button"
            id="dialog-modal-confirm-button"
            value="confirm"
            style={{ marginTop: "15px" }}
            onClick={props.close}
          >
            CLOSE
          </button>
        </div> */}
      </form>
    </dialog>
  );
});

export default newInvoiceTypeModal;
