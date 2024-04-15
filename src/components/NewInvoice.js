import React, { useRef } from "react";
import CreateTimesheetInvoice from "./CreateTimesheetInvoice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/ManageInvoices.css";

function NewInvoice(props) {
  return (
    <section className="ManageInvoices--new-invoice-tab-content">
      <button
        className="ManageInvoices--create-new-invoice-btn"
        type="button"
        onClick={(e) => props.openNewInvoiceModal(e)}
        style={{ display: props.newInvoiceType === "" ? "flex" : "none" }}
      >
        <FontAwesomeIcon className="create-new-invoice-icon" icon={faPlus} />
        Create New Invoice
      </button>
      {console.log("invoice type chosen", props.newInvoiceType)}

      {/* If "New Timesheet Invoice" button clicked, show that UI and blank invoice UI if "Blank Invoice" button clicked */}
      {props.newInvoiceType === "" ? (
        <></>
      ) : props.newInvoiceType === "new-timesheet-invoice" ? (
        <CreateTimesheetInvoice loggedInUserInfo={props.loggedInUserInfo} />
      ) : (
        <>"This is the Blank Invoice UI section</>
      )}
    </section>
  );
}

export default NewInvoice;
