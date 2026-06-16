export const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL ?? '';
export const API_BASE = BACKEND_URL ? `${BACKEND_URL}/api` : '';
export const SITE_URL = process.env.EXPO_PUBLIC_SITE_URL ?? 'https://pdfsunlocker.com';
export const MAX_MB = 5;
export const MAX_BYTES = MAX_MB * 1024 * 1024;
export const SUPPORT_EMAIL = 'support@pdfsunlocker.com';
