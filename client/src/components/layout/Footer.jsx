import { useEffect, useState } from "react";
import publicService from "../../services/publicService";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const response = await publicService.getSocialLinks();
      setSocialLinks(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch social links:", error);
    }
  };

  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-center justify-content-center">
            <p className="text-muted mb-0 text-center">
              Building amazing web experiences with modern technologies.
            </p>
          </div>

          <div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-center">
            <h5 className="fw-bold mb-3">Connect With Me</h5>
            <div className="social-links mb-3 d-flex flex-wrap justify-content-center">
              {socialLinks.map((link) => {
                const iconClass = link.icon ? `bi bi-${link.icon}` : "bi bi-link-45deg";

                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white me-3"
                    title={link.platform}
                  >
                    <i className={`${iconClass} fs-4`}></i>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <hr className="my-4 bg-secondary" />

        <div className="text-center text-muted">
          <p className="mb-0">© {currentYear} Portfolio CMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
