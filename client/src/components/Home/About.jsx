import { resolveAssetUrl } from "../../utils/assetUrls";

function About({ profile }) {
  const profileImageUrl = resolveAssetUrl(profile.profile_image);

  return (
    <section id="about" className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="about-card">
              <h2 className="display-6 fw-bold mb-4">About Me</h2>
              <p className="lead text-muted mb-4">{profile.about}</p>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <h5 className="fw-bold">
                    <i className="bi bi-geo-alt me-2 text-primary"></i>
                    Location
                  </h5>
                  <p className="text-muted">{profile.address || "Not specified"}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <h5 className="fw-bold">
                    <i className="bi bi-envelope me-2 text-primary"></i>
                    Email
                  </h5>
                  <p className="text-muted">
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </p>
                </div>
                <div className="col-md-6 mb-3">
                  <h5 className="fw-bold">
                    <i className="bi bi-telephone me-2 text-primary"></i>
                    Phone
                  </h5>
                  <p className="text-muted">{profile.phone || "Not specified"}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <h5 className="fw-bold">
                    <i className="bi bi-briefcase me-2 text-primary"></i>
                    Title
                  </h5>
                  <p className="text-muted">{profile.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;