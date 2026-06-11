// Standard JSON envelope returned by the app's API routes.
export interface ApiResult {
  success: boolean;
  message?: string;
}

// Response of the reCAPTCHA site-key endpoint.
export interface SiteKeyResponse {
  siteKey?: string;
  message?: string;
}

// Response of the version endpoint.
export interface VersionResponse {
  version?: string;
  commit?: string;
  message?: string;
}
