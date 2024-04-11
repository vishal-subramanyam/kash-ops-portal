import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/ManageInvoices.css";
import NewInvoiceTypeModal from "./NewInvoiceTypeModal";

function NewInvoice(props) {
  let chooseInvoiceTypeModal = useRef();

  const chooseNewInvoice = (e) => {
    console.log(e.target);
    chooseInvoiceTypeModal.current.showModal();
  };
  const closeModal = () => {
    chooseInvoiceTypeModal.current.close();
  };

  return (
    <section className="ManageInvoices--new-invoice-tab-content">
      <button className="ManageInvoices--create-new-invoice-btn" type="button">
        <FontAwesomeIcon
          className="create-new-invoice-icon"
          icon={faPlus}
          onClick={() => chooseNewInvoice()}
        />
        Create New Invoice
      </button>
      <NewInvoiceTypeModal ref={chooseInvoiceTypeModal} close={closeModal} />
    </section>
  );
}

export default NewInvoice;
