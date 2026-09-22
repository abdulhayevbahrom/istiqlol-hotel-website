const removeTrailingSlash = (value) =>
  String(value || "")
    .trim()
    .replace(/\/+$/, "");

const backendBaseUrl = removeTrailingSlash(
  import.meta.env.VITE_MAIN_API_BASE_URL || "http://localhost:8343/api",
);

export const API_BASE_URL = backendBaseUrl;
export const API_URL = removeTrailingSlash(
  import.meta.env.VITE_MAIN_API_URL || `${backendBaseUrl}/api`,
);
