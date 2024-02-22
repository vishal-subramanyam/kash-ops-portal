import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/ControlCenter.css";
import KPI from "../components/KPI";
import ProjectHoursKPI from "../components/ProjectHoursKPI";
import CompanyHoursKPI from "../components/CompanyHoursKPI";
import PieChartKPI from "../components/PieChartKPI";
import LineChartKPI from "../components/LineChartKPI";
import BarChartKPI from "../components/BarChartKPI";
import HorizontalBarChartKPI from "../components/HorizontalBarChartKPI";

function ControlCenter(props) {
  return (
    <div className="ControlCenter--container">
      <header>
        <div class="kash_operations--upper-section-holder">
          <Link to="/" class="return-to-operations-hub">
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
            <p>Return to Operations Hub</p>
          </Link>
          <h1 class="kash_operations--hub-title clients-hub-page-title ControlCenter--page-title">
            Control Center
          </h1>
        </div>
      </header>

      <div className="ControlCenter--main-content-container">
        <aside className="ControlCenter--desktop-sidebar">
          <ol>
            <li>Overall</li>
            <li>Company 1</li>
            <li>Company 2</li>
            <li>Company 3</li>
          </ol>
        </aside>

        <select className="ControlCenter--mobile-company-selector">
          <option value="">- Make a Selection -</option>
          <option value="Overall">Overall</option>
          <option value="Company 1">Company 1</option>
          <option value="Company 2">Company 2</option>
          <option value="Company 3">Company 3</option>
        </select>

        <main className="ControlCenter--main-content">
          <h2 className="ControlCenter--selected-company-heading">
            Selected Company
          </h2>
          {/* tabs */}
          <ul className="ControlCenter--tabs-container">
            <li className="ControlCenter--tab-active">Monthly</li>
            <li className="ControlCenter--tab">Lifetime</li>
          </ul>

          <section className="ControlCenter--KPI-section-container">
            {/* KPI section */}
            <section>
              <KPI value="15" caption="Companies with Projects" />
              <KPI value="10" caption="Employees Assigned" />
              <KPI value="500" caption="Avg Hours Billed Per Resource" />
              <KPI value="15" caption="Company Admins" />
              <KPI value="6" caption="Companies with Projects" />
              <ProjectHoursKPI
                hoursBilled="3000"
                hoursAllotted="5000"
                percentage={(3000 / 5000) * 100 + "%"}
              />
              <KPI value="12" caption="Active Projects" />
              <CompanyHoursKPI hoursBilled="50000" avgHoursPerCompany="3500" />
              <KPI value="4" caption="Projects with time < 100" />
            </section>

            {/* KPI Charts and Graphs Section 
          <section>
            <PieChartKPI />
            <LineChartKPI />
            <BarChartKPI />
            <HorizontalBarChartKPI />
          </section>
          */}
          </section>
        </main>
      </div>
    </div>
  );
}

export default ControlCenter;
