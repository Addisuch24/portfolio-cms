import "../../styles/home.css";
import { resolveAssetUrl } from "../../utils/assetUrls";
import Typewriter from "../common/Typewriter";

function Hero({ profile }) {
  const profileImageUrl = resolveAssetUrl(profile.profile_image);
  const nameText = profile.full_name || "Addisu Hirbo";
  const subtitleText = "Software Engineering Student & Full-Stack Developer";

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="hero-content">
              <h1 className="display-4 fw-bold mb-3">
                <Typewriter
                  text={nameText}
                  typingSpeed={100}
                  deletingSpeed={60}
                  pauseTime={2000}
                />
              </h1>
              <h2 className="hero-subtitle mb-4">{subtitleText}</h2>
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