import Badge from "../common/Badge";
import { resolveAssetUrl } from "../../utils/assetUrls";

function Projects({ projects }) {
  return (
    <section id="projects" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-2">My Projects</h2>
          <p className="lead text-muted">Check out some of my recent work</p>
        </div>

        <div className="row g-4">
          {projects.map((project) => {
            const projectImageUrl = resolveAssetUrl(project.image_url);
            return (
              <div key={project.id} className="col-md-6 col-lg-4">
                <div className="card project-card h-100">
                  {projectImageUrl && (
                    <img
                      src={projectImageUrl}
                      alt={project.title}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                      onError={(e) => {
                        try {
                          const url = e.target.src || project.image_url;
                          const fallback = resolveAssetUrl(url)?.replace(/\/uploads\/.*$/, "/uploads/dummy.jpg") || "/uploads/dummy.jpg";
                          e.target.onerror = null;
                          e.target.src = fallback;
                        } catch {
                          e.target.onerror = null;
                          e.target.src = "/uploads/dummy.jpg";
                        }
                      }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{project.title}</h5>
                    <p className="card-text text-muted flex-grow-1">
                      {project.description}
                    </p>

                    {project.technologies && (
                      <div className="mb-3">
                        <div className="d-flex flex-wrap gap-1">
                          {project.technologies
                            .split(",")
                            .map((tech, idx) => (
                              <Badge key={idx} variant="info" pill>
                                {tech.trim()}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}

                    <div className="d-flex gap-2">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="bi bi-github me-1"></i>
                          GitHub
                        </a>
                      )}
                      {project.live_demo_url && (
                        <a
                          href={project.live_demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-primary"
                        >
                          <i className="bi bi-box-arrow-up-right me-1"></i>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="alert alert-info text-center" role="alert">
            No projects available yet.
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;