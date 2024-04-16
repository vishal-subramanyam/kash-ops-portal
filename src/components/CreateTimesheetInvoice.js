import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/ManageInvoices.css";

function CreateTimesheetInvoice(props) {
  return (
    <>
      <header>
        <h1 className="invoice-details-title">Invoice Details</h1>
        <section>
          <h5 className="invoice-company-name">United Educators</h5>
          <section className="">
            <p>03/01/2024</p>
            <span>-</span>
            <p>03/31/2024</p>
          </section>
        </section>
      </header>
      {/* The section below is the container for the various company projects and their corresponding billed hours */}
      <section className="invoice-company-projects-container">
        {/* seperate each section below by project */}

        <section className="invoice-company-project">
          <h4>Operational Services (UNE2022050301)</h4>

          <section className="invoice-details-by-resource">
            <details>
              <summary>
                <h6>Randy Lane</h6>
                {/* set to span several columns to match UI design*/}
                <input type="text" onChange={(e) => console.log(e.target)} />
                <p>30</p>
                <div>
                  <span>$</span>
                  <input
                    type="number"
                    onChange={(e) => console.log(e.target)}
                  />
                </div>
                <p>$6,200</p>
              </summary>
              <header>
                <ol>
                  <li>Name</li>
                  <li>Work Area</li>
                  <li>Task</li>
                  <li>Role</li>
                  <li>
                    Rate <span>(/hr)</span>
                  </li>
                  <li>Amount</li>
                </ol>
              </header>
              {/* List of resource's name and billed hours per task area for specific project */}
              {/* List of billed hours per Task */}
              <ol>
                <li>
                  <ol>
                    <li>Randy Lane</li>
                    <li>Operations</li>
                    <li>
                      Ticket Tracking, monitoring and updates, Project
                      Management Work
                    </li>
                    <li>
                      <input
                        type="text"
                        onChange={(e) => console.log(e.target)}
                      />
                    </li>
                    <li>10</li>
                    <li>
                      <span>$</span>
                      <input
                        type="number"
                        onChange={(e) => console.log(e.target)}
                      />
                    </li>
                    <li>$5,000</li>
                    <li>
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </li>
                  </ol>
                </li>
              </ol>
            </details>
            {/* This is the accordian that will show more details when clicked and expanded */}
          </section>
        </section>
      </section>
    </>
  );
}

export default CreateTimesheetInvoice;
