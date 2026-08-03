function Experience({ experiences }) {
  if (experiences.length === 0) {
    return null;
  }

  // Sort experiences by start_date in descending order
  const sortedExperiences = [...experiences].sort(
    (a, b) => new Date(b.start_date) - new Date(a.start_date)
  );

  return (
    <section id="experience" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-2">Experience</h2>
          <p className="lead text-muted">My professional journey</p>
        </div>

        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="timeline">
              {sortedExperiences.map((exp) => (
                <div key={exp.id} className="experience-item">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h5 className="fw-bold mb-1">{exp.position}</h5>
                      <h6 className="text-primary mb-2">{exp.company}</h6>
                      <p className="small text-muted mb-2">
                        <i className="bi bi-calendar-event me-1"></i>
                        {new Date(exp.start_date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {exp.is_current
                          ? "Present"
                          : new Date(exp.end_date).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                      </p>
                      {exp.location && (
                        <p className="small text-muted mb-2">
                          <i className="bi bi-geo-alt me-1"></i>
                          {exp.location}
                        </p>
                      )}
                      {exp.description && (
                        <p className="text-muted">{exp.description}</p>
                      )}
                      {exp.technologies && (
                        <div className="mt-2">
                          <small className="text-muted d-block mb-2">
                            <strong>Technologies:</strong>
                          </small>
                          <div className="d-flex flex-wrap gap-1">
                            {exp.technologies.split(",").map((tech, idx) => (
                              <span key={idx} className="badge bg-light text-dark">
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;