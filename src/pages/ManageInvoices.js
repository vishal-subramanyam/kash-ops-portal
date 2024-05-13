import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { domain } from "../assets/api/apiEndpoints";
import "../assets/styles/Styles.css";
import "../assets/styles/ManageInvoices.css";
import NewInvoice from "../components/NewInvoice";
import ModifyInvoice from "../components/ModifyInvoice";
import NewInvoiceTypeModal from "../components/NewInvoiceTypeModal";

function ManageInvoices(props) {
  let chooseInvoiceTypeModal = useRef("");
  let [newInvoiceType, setNewInvoiceType] = useState("");
  let [dataToServer, setDataToServer] = useState({});
  let [tabActive, setTabActive] = useState("newTab");
  let newInvoiceTabActive = "ManageInvoices--tab ManageInvoices--tab-active";
  let newInvoiceTabNotActive =
    "ManageInvoices--tab ManageInvoices--tab-not-active";
  let loggedInUserLocal = props.loggedInUser;

  const openNewInvoiceTypeModal = (e) => {
    console.log(chooseInvoiceTypeModal);
    chooseInvoiceTypeModal.current.showModal();
  };

  // Function to choose new invoice type - set state to track (or reducer??) new invoice type

  const selectInvoiceType = (el) => {
    console.log(el);
    setNewInvoiceType(el);
  };

  const actionModifyTab = () => {
    console.log("modify tab active");
    setTabActive("modifyTab");
  };

  const trackDataToServer = (payload) => {
    console.log("create invoice", payload);
    // setDataToServer(payload);
    createInvoice(payload);
    createInvoiceDetails(payload);
  };

  const createInvoice = async (invoiceInfo) => {
    console.log("Attn User EmpId", invoiceInfo.attn["id"]);
    try {
      const response = await fetch(
        `${domain}GenericTransactionService/processTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            data: [
              {
                InvoiceId: invoiceInfo.invoice_id,
                CreatedBy: loggedInUserLocal.EmpId,
                AttentionTo: invoiceInfo.attn["id"],
                CompanyId: invoiceInfo.company_id,
                GrandTotal: invoiceInfo.grand_total,
                TaxRate: invoiceInfo.tax_rate_dec,
                CreationDate: invoiceInfo.creation_date,
                DueDate: invoiceInfo.due_date,
                InvoicePeriodStart: invoiceInfo.date_from,
                InvoicePeriodEnd: invoiceInfo.date_to,
                InvoiceNum: invoiceInfo.invoice_num,
                InternalNotes: "",
                ExternalNotes: "",
              },
            ],
            _keyword_: "KASH_OPERATIONS_INVOICE_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
    } catch (error) {
      alert("Unable to create invoice", error);
      //  setMessage(alertMessageDisplay(`Unable to create invoice. Error: ${error}`));
      //  alertMessage.current.showModal();
    }
  };

  const createInvoiceDetails = async (invoiceInfo) => {
    console.log("Invoice Details to server", invoiceInfo);
    try {
      const response = await fetch(
        `${domain}GenericTransactionService/processTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // payload will be the flat array of hours
            data: invoiceInfo.hrs_flat,
            _keyword_: "KASH_OPERATIONS_INVOICE_DETAIL_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
    } catch (error) {
      alert("Unable to add invoice details", error);
      //  setMessage(alertMessageDisplay(`Unable to create invoice. Error: ${error}`));
      //  alertMessage.current.showModal();
    }
  };

  return (
    <main className="ManageInvoices--main-container max-width--main-container">
      <div className="kash_operations--upper-section-holder ManageInvoices--heading">
        <h1 className="new-invoice__page-title form-page-title--lg-1">
          Manage Invoices
        </h1>
        <div className="invoice__return-link-holder">
          <Link to="/invoice-hub" className="return-link">
            <svg
              width="80"
              height="134"
              viewBox="0 0 80 134"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M76.7864 3.36106C72.8812 -0.544183 66.5495 -0.544181 62.6443 3.36106L1.12622 64.8787C-0.0453612 66.0503 -0.0453675 67.9497 1.12621 69.1213L62.6445 130.64C66.5497 134.545 72.8814 134.545 76.7866 130.64C80.6919 126.734 80.6919 120.403 76.7866 116.497L29.4107 69.1216C28.2391 67.95 28.2391 66.0505 29.4107 64.8789L76.7864 17.5032C80.6917 13.598 80.6917 7.2663 76.7864 3.36106Z"
                fill="#255463"
              />
            </svg>
            <p className="return-link-text">Return to Invoices</p>
          </Link>
        </div>
      </div>

      <ul className="ManageInvoices--tabs-container">
        <li
          className={
            tabActive === "newTab"
              ? newInvoiceTabActive + " ManageInvoices--new-tab"
              : newInvoiceTabNotActive + " ManageInvoices--new-tab"
          }
          onClick={() => setTabActive("newTab")}
        >
          <span>New Invoice</span>
        </li>
        <li
          className={
            tabActive === "modifyTab"
              ? newInvoiceTabActive + " ManageInvoices--modify-tab"
              : newInvoiceTabNotActive + " ManageInvoices--modify-tab"
          }
          onClick={() => setTabActive("modifyTab")}
        >
          <span>Modify Invoice</span>
        </li>
      </ul>

      {/* Show component corresponding to active tab */}
      {tabActive === "newTab" ? (
        <NewInvoice
          openNewInvoiceModal={openNewInvoiceTypeModal}
          newInvoiceType={newInvoiceType}
          loggedInUserInfo={loggedInUserLocal}
          resetInvoiceType={selectInvoiceType}
          showModifyInvoice={actionModifyTab}
          saveDataToServer={trackDataToServer}
        />
      ) : (
        <ModifyInvoice
        // dataToServer={dataToServer}
        />
      )}

      {/* Choose new invoice type modal popup */}
      <NewInvoiceTypeModal
        ref={chooseInvoiceTypeModal}
        // openNewInvoiceModal={openNewInvoiceTypeModal}
        // chooseInvoiceType={setNewInvoiceType}
        chooseInvoiceType={selectInvoiceType}
      />
    </main>
  );
}

export default ManageInvoices;
