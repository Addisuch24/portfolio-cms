export function getAssetBaseUrl() {
  let configuredBase =
    import.meta.env?.VITE_SERVER_URL ||
    import.meta.env?.VITE_API_URL ||
    "http://localhost:5000";

  // If the base URL ends with /api, strip it to get the server root
  configuredBase = String(configuredBase).replace(/\/api\/?$/, "");
  configuredBase = configuredBase.replace(/\/$/, "");

  return configuredBase;
}

export function resolveAssetUrl(url) {
  if (!url || typeof url !== "string") return null;

  const normalizedUrl = url.trim();

  if (!normalizedUrl) return null;
  if (normalizedUrl.startsWith("data:")) return normalizedUrl;
  if (/^https?:\/\//i.test(normalizedUrl)) return normalizedUrl;

  if (normalizedUrl.startsWith("/")) {
    return `${getAssetBaseUrl()}${normalizedUrl}`;
  }

  return normalizedUrl;
}
