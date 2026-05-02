export function getSiteUrl() {
  const configuredUrl = import.meta.env.VITE_SITE_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.endsWith("/") ? configuredUrl.slice(0, -1) : configuredUrl;
  }

  return window.location.origin;
}

export function getAuthCallbackUrl() {
  return `${getSiteUrl()}/auth/callback`;
}
