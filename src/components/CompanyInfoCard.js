import "../assets/styles/CompaniesDetail.css";

function CompanyInfoCard(props) {
  return (
    <section className="CompanyInfoCard--info-card">
      <header>
        <div>
          <h1>Swisher International</h1>
          <div>
            <label>Company ID</label>
            <span>SWR20240101</span>
          </div>
        </div>

        <div className="CompanyInfoCard--projects-num-display">
          <label>Projects</label>
          <div className="CompanyInfoCard--projects-active">
            <div>
              <h3>Active</h3>
              <p>1</p>
            </div>
            <div>
              <h3>Total</h3>
              <p>3</p>
            </div>
          </div>
        </div>
      </header>

      <section className="CompanyInfoCard--admin-contact-section">
        <section className="CompanyInfoCard--admin-detail">
          <h3>Company Admins: </h3>
          <ul>
            <li>Kevin Munley</li>
            <li>Doug Monson</li>
            <li>Kahren Tomvassian</li>
            <li>Alex Gardner</li>
          </ul>
        </section>

        <section className="CompanyInfoCard--contact-detail">
          <h3>Client Contacts: </h3>
          <ul>
            <li>
              <span>Herbert Corea</span>
              <label> - Director of IT Services</label>
            </li>
            <li>
              <span>Marcus Pierce</span>
              <label> - Business Analyst</label>
            </li>
            <li>
              <span>David Silbert</span>
              <label> - Business Analyst</label>
            </li>
            <li>
              <span>Jessica Dunton</span>
              <label> - Business Analyst</label>
            </li>
          </ul>
        </section>
      </section>

      <section className="CompanyInfoCard--projects-section">
        <ul>
          <li>
            <article className="CompanyInfoDetail--project-detail">
              <h4>Power BI Migration</h4>
              <label>Hours</label>
              <div className="CompanyInfoDetail--project-progress-bar-container">
                <span>
                  <label>Billed: </label>
                  <p>280</p>
                </span>
                <span>
                  <label>Projected: </label>
                  <p>300</p>
                </span>

                <div className="CompanyInfoDetail--project-progress-bar"></div>
              </div>
            </article>
          </li>

          <li>
            <article className="CompanyInfoDetail--project-detail project-detail_over-billed">
              <h4>WebFOCUS Administration</h4>
              <label>Hours</label>
              <div className="CompanyInfoDetail--project-progress-bar-container">
                <span>
                  <label>Billed: </label>
                  <p>150</p>
                </span>
                <span>
                  <label>Projected: </label>
                  <p>150</p>
                </span>

                <div className="CompanyInfoDetail--project-progress-bar"></div>
              </div>
            </article>
          </li>
        </ul>
      </section>
    </section>
  );
}

export default CompanyInfoCard;
