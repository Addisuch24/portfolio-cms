import { useEffect, useState } from "react";
import Badge from "../common/Badge";
import { resolveAssetUrl } from "../../utils/assetUrls";

function ProjectImageSlider({ imageUrls, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = () => setActiveIndex((current) => Math.max(current - 1, 0));
  const handleNext = () => setActiveIndex((current) => Math.min(current + 1, imageUrls.length - 1));

  useEffect(() => {
    if (imageUrls.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % imageUrls.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [imageUrls.length, isPaused]);

  return (
    <div
      className="project-image-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={-1}
    >
      <div
        className="project-image-track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {imageUrls.map((url, idx) => {
          const imageUrl = resolveAssetUrl(url);
          return (
            <div key={`${title}-${idx}`} className="project-image-slide">
              <img
                src={imageUrl}
                alt={`${title} screenshot ${idx + 1}`}
                className="project-image"
                onError={(e) => {
                  try {
                    const fallbackUrl = e.target.src || url;
                    const fallback = resolveAssetUrl(fallbackUrl)?.replace(/\/uploads\/.*$/, "/uploads/dummy.jpg") || "/uploads/dummy.jpg";
                    e.target.onerror = null;
                    e.target.src = fallback;
                  } catch {
                    e.target.onerror = null;
                    e.target.src = "/uploads/dummy.jpg";
                  }
                }}
              />
            </div>
          );
        })}
      </div>

      {imageUrls.length > 1 && (
        <>
          <button
            type="button"
            className="project-image-nav project-image-prev"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous image"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            type="button"
            className="project-image-nav project-image-next"
            onClick={handleNext}
            disabled={activeIndex === imageUrls.length - 1}
            aria-label="Next image"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
          <div className="project-image-counter">
            {activeIndex + 1}/{imageUrls.length}
          </div>
        </>
      )}
    </div>
  );
}

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
            const imageUrls = Array.isArray(project.images)
              ? project.images
              : String(project.image_url || "").split(",").map((url) => url.trim()).filter(Boolean);

            return (
              <div key={project.id} className="col-md-6 col-lg-4">
                <div className="card project-card h-100">
                  {imageUrls.length > 0 && (
                    <ProjectImageSlider
                      imageUrls={imageUrls}
                      title={project.title}
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