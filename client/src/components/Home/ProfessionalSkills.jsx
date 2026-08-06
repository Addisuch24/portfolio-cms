import { useEffect, useRef, useState } from "react";
import { resolveIcon, isImageIcon } from "../../utils/iconHelpers";
import { resolveAssetUrl } from "../../utils/assetUrls";

const CARD_THEMES = [
  { border: "#bfdbfe", bg: "#eff6ff", text: "#1d4ed8", bar: "#2563eb" }, // Blue
  { border: "#bbf7d0", bg: "#f0fdf4", text: "#15803d", bar: "#16a34a" }, // Green
  { border: "#e9d5ff", bg: "#faf5ff", text: "#7e22ce", bar: "#9333ea" }, // Purple
  { border: "#fed7aa", bg: "#fff7ed", text: "#c2410c", bar: "#ea580c" }, // Orange
  { border: "#99f6e4", bg: "#f0fdfa", text: "#0f766e", bar: "#0d9488" }, // Teal
  { border: "#e5e7eb", bg: "#f9fafb", text: "#374151", bar: "#4b5563" }  // Gray
];

function ProfessionalSkillCard({ skill, index }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const theme = CARD_THEMES[index % CARD_THEMES.length];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`col-12 col-md-6 col-lg-4 reveal reveal-up ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      <div
        className="card h-100 border-0 shadow-sm professional-skill-card"
        style={{
          "--card-theme-color": theme.bar,
          "--card-theme-bg": theme.bg,
          "--card-theme-border": theme.border
        }}
      >
        <div className="card-body p-4 d-flex flex-column justify-content-between">
          <div>
            {/* Icon & Name */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="prof-skill-icon-wrap rounded-circle d-flex align-items-center justify-content-center"
                style={{ backgroundColor: theme.bg, color: theme.bar }}
              >
                {isImageIcon(skill.icon) ? (
                  <img src={resolveAssetUrl(skill.icon)} alt={skill.name} style={{ width: 28, height: 28, objectFit: 'cover', borderRadius: '50%' }} />
                ) : (
                  <i className={`bi ${resolveIcon(skill.name, skill.icon)} fs-4`}></i>
                )}
              </div>
              <h3 className="h5 fw-bold mb-0" style={{ color: theme.text }}>{skill.name}</h3>
            </div>

            {/* Description */}
            <p className="text-sm mb-4 leading-relaxed" style={{ color: '#64748b' }}>
              {skill.description}
            </p>
          </div>

          {/* Description only, no percentage bar */}
        </div>
      </div>
    </div>
  );
}

function ProfessionalSkills({ professionalSkills = [] }) {
  const itemsToRender = professionalSkills;

  return (
    <section id="professional-skills" className="py-6 bg-white position-relative border-top">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5 reveal reveal-up visible">
          <span className="badge rounded-pill bg-primary-subtle text-primary fw-bold text-uppercase px-3 py-2 mb-3">
            Core Competencies
          </span>
          <h2 className="display-6 fw-extrabold mb-3" style={{ color: '#1d4ed8' }}>
            Soft Skills
          </h2>
          <p className="lead mx-auto" style={{ maxWidth: "720px", color: '#64748b' }}>
            Beyond technical expertise, these professional skills help me collaborate effectively, solve complex problems, and deliver high-quality software.
          </p>
        </div>

        {/* Skill Cards Grid */}
        <div className="row g-4 justify-content-center">
          {itemsToRender.length > 0 ? (
          itemsToRender.map((skill, idx) => (
            <ProfessionalSkillCard
              key={skill.id || skill.name}
              skill={skill}
              index={idx}
            />
          ))
        ) : (
          <div className="text-center py-5 text-muted">
            No technical skills are available yet. Please add them in the admin panel.
          </div>
        )}
        </div>
      </div>
    </section>
  );
}

export default ProfessionalSkills;
