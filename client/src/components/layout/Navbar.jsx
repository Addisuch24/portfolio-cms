import { useState, useEffect } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container">
        <a className="navbar-brand fw-bold" href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>
          Portfolio
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${mobileMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#home"
                onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#about"
                onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#skills"
                onClick={(e) => { e.preventDefault(); scrollToSection("skills"); }}
              >
                Skills
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#projects"
                onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }}
              >
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#experience"
                onClick={(e) => { e.preventDefault(); scrollToSection("experience"); }}
              >
                Experience
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
