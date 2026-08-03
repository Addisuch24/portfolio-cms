import "../../styles/home.css";
import { resolveAssetUrl } from "../../utils/assetUrls";

function Hero({ profile }) {
  const profileImageUrl = resolveAssetUrl(profile.profile_image);

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="hero-content">
              <h1 className="display-4 fw-bold mb-3">{profile.full_name}</h1>
              <h2 className="h4 mb-4 hero-title">{profile.title}</h2>
              <p className="lead mb-4 hero-description">{profile.about}</p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#projects" className="btn btn-light btn-lg hero-btn-primary">
                  View My Work
                </a>
                <a href="#contact" className="btn btn-outline-light btn-lg hero-btn-secondary">
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            {profileImageUrl && (
              <div className="hero-photo-wrap">
                <img
                  src={profileImageUrl}
                  alt={profile.full_name}
                  className="hero-photo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/uploads/dummy.jpg";
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;