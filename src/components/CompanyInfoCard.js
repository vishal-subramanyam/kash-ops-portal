import "../assets/styles/CompaniesDetail.css";

function CompanyInfoCard(props) {
  let projects = props.projects;
  let admins = props.admins;
  let contacts = props.contacts;
  let hoursPerProject = props.hoursPerProject;
  console.log(hoursPerProject);
  return (
    <section className="CompanyInfoCard--info-card">
      <header>
        <div>
          <h1>{props.name}</h1>
          <div>
            <label>Company ID</label>
            <span>{props.id}</span>
          </div>
        </div>

        <div className="CompanyInfoCard--projects-num-display">
          <label>Projects</label>
          <div className="CompanyInfoCard--projects-active">
            <div>
              <h3>Active</h3>
              <p>
                {projects.filter((c) => c.CurrentStatus === "Active").length}
              </p>
            </div>
            <div>
              <h3>Total</h3>
              <p>{projects.length}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="CompanyInfoCard--admin-contact-section">
        <section className="CompanyInfoCard--admin-detail">
          <h3>Company Admins: </h3>
          <ul>
            {admins.map((admin) => {
              return <li>{admin.FirstName + " " + admin.LastName}</li>;
            })}
          </ul>
        </section>

        <section className="CompanyInfoCard--contact-detail">
          <h3>Client Contacts: </h3>
          {/* <ul>
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
          </ul> */}
        </section>
      </section>

      <section className="CompanyInfoCard--projects-section">
        <h3>Projects</h3>
        <ul>
          {hoursPerProject.length === 0 ? (
            <></>
          ) : (
            hoursPerProject.map((project) => {
              return (
                <li>
                  <article className="CompanyInfoDetail--project-detail">
                    <h4>{project.ProjectCategory}</h4>
                    <label>Hours</label>
                    <div className="CompanyInfoDetail--project-progress-bar-container">
                      <span>
                        <label>Billed: </label>
                        <p>{project.TotalBilledHours}</p>
                      </span>
                      <span>
                        <label>Projected: </label>
                        <p>{project.TotalProjectedHours}</p>
                      </span>

                      <div className="CompanyInfoDetail--project-progress-bar"></div>
                    </div>
                  </article>
                </li>
              );
            })
          )}

          {/* <li>
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
          </li> */}
        </ul>
      </section>
    </section>
  );
}

export default CompanyInfoCard;
