import { useEffect, useRef, useState } from "react";
import { resolveIcon, isImageIcon } from "../../utils/iconHelpers";
import { resolveAssetUrl } from "../../utils/assetUrls";

const CATEGORY_ORDER = [
  "Frontend",
  "Backend",
  "Frameworks & Libraries",
  "Databases",
  "Tools & Platforms",
  "Version Control",
  "Other Technologies"
];

const CATEGORY_CONFIG = {
  "Frontend": {
    id: "skills-frontend",
    title: "Frontend",
    icon: "bi-window",
    description: "Modern UI development with responsive layouts, styling, and web interactions.",
    accentColor: "#2563eb",
    badgeBg: "rgba(37, 99, 235, 0.14)",
    badgeText: "#1d4ed8"
  },
  "Backend": {
    id: "skills-backend",
    title: "Backend",
    icon: "bi-server",
    description: "APIs, server architecture, authentication, and scalable backend systems.",
    accentColor: "#16a34a",
    badgeBg: "rgba(22, 163, 74, 0.14)",
    badgeText: "#15803d"
  },
  "Frameworks & Libraries": {
    id: "skills-frameworks",
    title: "Frameworks & Libraries",
    icon: "bi-boxes",
    description: "Reusable tools, component libraries, and state management ecosystems.",
    accentColor: "#9333ea",
    badgeBg: "rgba(147, 51, 234, 0.14)",
    badgeText: "#7e22ce"
  },
  "Databases": {
    id: "skills-databases",
    title: "Databases",
    icon: "bi-database",
    description: "Relational and NoSQL storage, queries, schema design, and performance.",
    accentColor: "#ea580c",
    badgeBg: "rgba(234, 88, 12, 0.14)",
    badgeText: "#c2410c"
  },
  "Tools & Platforms": {
    id: "skills-tools",
    title: "Tools & Platforms",
    icon: "bi-tools",
    description: "Developer environments, deployment tools, and modern platform workflows.",
    accentColor: "#0891b2",
    badgeBg: "rgba(8, 145, 178, 0.14)",
    badgeText: "#0e7490"
  },
  "Version Control": {
    id: "skills-vc",
    title: "Version Control",
    icon: "bi-git",
    description: "Source control, collaboration, branching strategies, and release workflows.",
    accentColor: "#4b5563",
    badgeBg: "rgba(75, 85, 99, 0.14)",
    badgeText: "#374151"
  },
  "Other Technologies": {
    id: "skills-other",
    title: "Other Technologies",
    icon: "bi-cpu",
    description: "Additional technologies, tools, and domain-specific technical strengths.",
    accentColor: "#0d9488",
    badgeBg: "rgba(13, 148, 136, 0.14)",
    badgeText: "#0f766e"
  }
};

const normalizeCategory = (cat, name = "") => {
  const category = String(cat || "").trim();
  const categoryKey = category.toLowerCase();
  const title = String(name || "").trim().toLowerCase();

  if (categoryKey.includes("frontend")) {
    return "Frontend";
  }

  if (categoryKey.includes("backend") || categoryKey.includes("node") || categoryKey.includes("express") || categoryKey.includes("php") || categoryKey.includes("java") || categoryKey.includes("python")) {
    return "Backend";
  }

  if (categoryKey.includes("framework") || categoryKey.includes("library")) {
    return "Frameworks & Libraries";
  }

  if (categoryKey.includes("db") || categoryKey.includes("database")) {
    return "Databases";
  }

  if (categoryKey.includes("tool") || categoryKey.includes("platform")) {
    return "Tools & Platforms";
  }

  if (categoryKey.includes("version") || categoryKey.includes("git")) {
    return "Version Control";
  }

  if (title.includes("react") || title.includes("next") || title.includes("vue") || title.includes("angular") || title.includes("svelte") || title.includes("redux") || title.includes("zustand") || title.includes("axios") || title.includes("formik") || title.includes("mongoose")) {
    return "Frameworks & Libraries";
  }

  if (title.includes("html") || title.includes("css") || title.includes("javascript") || title.includes("typescript") || title.includes("bootstrap") || title.includes("tailwind")) {
    return "Frontend";
  }

  if (title.includes("node") || title.includes("express") || title.includes("php") || title.includes("java") || title.includes("python")) {
    return "Backend";
  }

  if (title.includes("mysql") || title.includes("mongo") || title.includes("postgres") || title.includes("redis") || title.includes("sql") || title.includes("nosql")) {
    return "Databases";
  }

  if (title.includes("docker") || title.includes("postman") || title.includes("figma") || title.includes("vscode") || title.includes("github") || title.includes("gitlab") || title.includes("jenkins")) {
    return "Tools & Platforms";
  }

  if (title.includes("git")) {
    return "Version Control";
  }

  if (CATEGORY_CONFIG[category]) return category;
  return "Other Technologies";
};

function SkillCategoryCard({ skills, config }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`skill-category-card ${isVisible ? "card-visible" : ""} skill-category-card--${config.title.toLowerCase().replace(/\s+/g, "-")}`}
      style={{ "--accent-color": config.accentColor, "--badge-bg": config.badgeBg, "--badge-text": config.badgeText }}
    >
      <div className="skill-category-header">
        <div
          className="category-card-icon"
          style={{ background: config.badgeBg, color: config.accentColor }}
        >
          <i className={`bi ${config.icon}`}></i>
        </div>
        <div className="skill-category-header-content">
          <h3>{config.title}</h3>
          <p>{config.description}</p>
        </div>
      </div>

      <div className="skill-tech-grid">
        {skills.map((skill) => {
          const iconUrl = resolveAssetUrl(skill.icon);
          const description = skill.description || "Core technology used in modern product development.";

          return (
            <div key={skill.id || skill.name} className="skill-tech-card">
              <div className="skill-tech-icon-wrap">
                {isImageIcon(skill.icon) ? (
                  <img src={iconUrl} alt={skill.name} />
                ) : (
                  <i className={`bi ${resolveIcon(skill.name, skill.icon)}`}></i>
                )}
              </div>

              <div className="skill-tech-content">
                <div className="skill-tech-title-area">
                  <h4>{skill.name}</h4>
                </div>
                <p className="skill-tech-caption">{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function Skills({ skills = [] }) {
  // Filter out soft skills - they are displayed separately in ProfessionalSkills
  const technicalSkills = skills.filter((skill) => {
    const category = String(skill.category || "").trim().toLowerCase();
    return !category.includes("soft");
  });

  // Group incoming technical skills by category
  const dbGrouped = technicalSkills.reduce((acc, skill) => {
    const categoryKey = normalizeCategory(skill.category, skill.name);
    if (!acc[categoryKey]) acc[categoryKey] = [];
    acc[categoryKey].push(skill);
    return acc;
  }, {});

  const fullGroupedSkills = {};
  CATEGORY_ORDER.forEach((catKey) => {
    if (dbGrouped[catKey] && dbGrouped[catKey].length > 0) {
      fullGroupedSkills[catKey] = dbGrouped[catKey];
    }
  });

  const activeCategories = CATEGORY_ORDER.filter(
    (cat) => fullGroupedSkills[cat] && fullGroupedSkills[cat].length > 0
  );

  return (
    <div id="skills" className="skills-journey-container bg-white">
      <div className="container py-5">
        {activeCategories.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No skills are available yet. Please add skill data in the admin panel.
          </div>
        ) : (
          <div className="row g-4">
            {activeCategories.map((catKey, index) => {
              const config = CATEGORY_CONFIG[catKey] || CATEGORY_CONFIG["Other Technologies"];
              
              // Add header before Frontend category
              const showHeader = catKey === "Frontend";

              return (
                <div key={catKey} className="col-12">
                  {showHeader && (
                    <div className="text-center mb-5">
                      <span className="badge rounded-pill bg-primary-subtle text-primary fw-bold text-uppercase px-3 py-2 mb-3 d-inline-block">
                        Technology Skillset
                      </span>
                      <h2 className="display-5 fw-extrabold text-dark mt-3">
                        Technical Skills
                      </h2>
                    </div>
                  )}
                  <SkillCategoryCard
                    categoryKey={catKey}
                    skills={fullGroupedSkills[catKey]}
                    config={config}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Skills;