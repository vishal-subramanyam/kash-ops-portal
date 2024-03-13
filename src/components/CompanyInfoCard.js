import "../assets/styles/CompaniesDetail.css";

function CompanyInfoCard(props) {
  let projects = props.projects;
  let admins = props.admins;
  let contacts = props.contacts;
  let hoursPerProject = props.hoursPerProject;

  return (
    <section className="CompanyInfoCard--info-card">
      <header>
        <div className="CompanyInfoCard--company-name-display">
          <h1>{props.name}</h1>
          <div className="CompanyInfoCard--company-id-display">
            <label>Company ID:</label>
            <span>{props.id}</span>
          </div>
        </div>

        <div className="CompanyInfoCard--projects-num-display">
          <label>Projects:</label>
          <div className="CompanyInfoCard--projects-active">
            <div>
              <h5>Active</h5>
              <p>
                {
                  hoursPerProject.filter((c) => c.CurrentStatus === "Active")
                    .length
                }
              </p>
            </div>
            <div>
              <h5>Total</h5>
              <p>{hoursPerProject.length}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="CompanyInfoCard--admin-contact-section">
        <section className="CompanyInfoCard--admin-detail">
          <h6>Company Admins: </h6>
          <ul>
            {admins.map((admin) => {
              return <li>{admin.FirstName + " " + admin.LastName}</li>;
            })}
          </ul>
        </section>

        <section className="CompanyInfoCard--contact-detail">
          <h6>Client Contacts: </h6>
          {/* <ul>
            <li>
              <span>Herbert Corea</span>
              <label className="CompanyInfoCard--client-contact-title">
                {" "}
                - Director of IT Services
              </label>
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
        <h4>Projects</h4>
        <ul>
          {hoursPerProject.length === 0 ? (
            <></>
          ) : (
            hoursPerProject.map((project) => {
              if (
                (project.TotalBilledHours / project.TotalProjectedHours) *
                  100 <=
                70
              ) {
                return (
                  <li>
                    {/* If percentage of total projected hours/ total billed hours is 80% or greater, add  CompanyInfoDetail--project-overdue class to project  */}
                    <article className="CompanyInfoDetail--project-detail">
                      <h6>{project.ProjectCategory}</h6>
                      <label className="CompanyInfoDetail--hours-label">
                        Hours
                      </label>
                      <div className="CompanyInfoDetail--project-progress-bar-container">
                        <div className="CompanyInfoDetail--hours-heading">
                          <span>
                            <label>Billed: </label>
                            <p>
                              {console.log(project.TotalBilledHours)}
                              {isNaN(project.TotalBilledHours) === true
                                ? "0"
                                : project.TotalBilledHours}
                            </p>
                          </span>
                          <span>
                            <label>Projected: </label>
                            <p>{project.TotalProjectedHours}</p>
                          </span>
                        </div>

                        <div className="CompanyInfoDetail--project-progress-bar-wrapper">
                          <div
                            className="CompanyInfoDetail--project-progress-bar"
                            style={{
                              width:
                                (project.TotalBilledHours /
                                  project.TotalProjectedHours) *
                                  100 <=
                                20
                                  ? "20%"
                                  : (project.TotalBilledHours /
                                      project.TotalProjectedHours) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              } else {
                return (
                  <li>
                    {/* If percentage of total projected hours/ total billed hours is 70% or greater, add  CompanyInfoDetail--project-overdue class to project  */}
                    <article className="CompanyInfoDetail--project-detail CompanyInfoCard--project-detail_over-billed">
                      <h6>{project.ProjectCategory}</h6>
                      <label className="CompanyInfoDetail--hours-label">
                        Hours
                      </label>
                      <div className="CompanyInfoDetail--project-progress-bar-container">
                        <div className="CompanyInfoDetail--hours-heading">
                          <span>
                            <label>Billed: </label>
                            <p>
                              {isNaN(project.TotalBilledHours) === true
                                ? "0"
                                : project.TotalBilledHours}
                            </p>
                          </span>
                          <span>
                            <label>Projected: </label>
                            <p>{project.TotalProjectedHours}</p>
                          </span>
                        </div>

                        <div className="CompanyInfoDetail--project-progress-bar-wrapper">
                          <div
                            className="CompanyInfoDetail--project-progress-bar CompanyInfoCard--project-detail_over-billed-progress-bar"
                            style={{
                              width:
                                (project.TotalBilledHours /
                                  project.TotalProjectedHours) *
                                  100 >=
                                100
                                  ? "100%"
                                  : (project.TotalBilledHours /
                                      project.TotalProjectedHours) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              }
            })
          )}
        </ul>
      </section>
    </section>
  );
}

export default CompanyInfoCard;
