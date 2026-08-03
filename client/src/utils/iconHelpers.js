export function mapSkillToIcon(name) {
  if (!name) return "bi-file-earmark-code";
  const n = String(name).toLowerCase();

  const map = {
    html: "bi-filetype-html",
    css: "bi-filetype-css",
    javascript: "bi-filetype-js",
    js: "bi-filetype-js",
    typescript: "bi-filetype-ts",
    react: "bi-braces",
    vue: "bi-vue",
    angular: "bi-box-seam",
    node: "bi-terminal",
    express: "bi-server",
    mysql: "bi-database",
    postgres: "bi-database",
    postgresq: "bi-database",
    git: "bi-git",
    github: "bi-github",
    docker: "bi-box-seam",
    aws: "bi-cloud",
    azure: "bi-cloud",
    mongodb: "bi-database",
    graphql: "bi-code-slash",
    redux: "bi-kanban",
    bootstrap: "bi-bootstrap",
    tailwind: "bi-stars",
    python: "bi-file-earmark-code",
    java: "bi-cup-straw",
  };

  for (const key of Object.keys(map)) {
    if (n.includes(key)) return map[key];
  }

  return "bi-file-earmark-code";
}

export function resolveIcon(name, iconValue) {
  // If iconValue looks like a valid bootstrap icon class, use it.
  if (typeof iconValue === "string" && iconValue.startsWith("bi-")) return iconValue;

  // If iconValue contains HTML-like or percent symbols or spaces, ignore it and map from name.
  if (typeof iconValue === "string" && /[^a-zA-Z0-9-_:]/.test(iconValue)) {
    return mapSkillToIcon(name);
  }

  // If empty or not a bootstrap class, try to map from name
  if (!iconValue) return mapSkillToIcon(name);

  // If it looks like just the icon name without bi- prefix, add prefix
  if (typeof iconValue === "string" && /^[a-z0-9-]+$/i.test(iconValue)) {
    return `bi-${iconValue}`;
  }

  return mapSkillToIcon(name);
}

export function isImageIcon(iconValue) {
  if (!iconValue || typeof iconValue !== 'string') return false;
  const lower = iconValue.toLowerCase();
  return (
    lower.startsWith('http') ||
    lower.startsWith('/') ||
    lower.includes('uploads') ||
    /\.(png|jpe?g|svg|gif|webp)$/.test(lower) ||
    lower.startsWith('data:')
  );
}
