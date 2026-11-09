import 'dotenv/config';

const timeout = Number(process.env.API_TIMEOUT_MS ?? '15000');
const baseURL = process.env.API_BASE_URL ?? 'https://restful-booker.herokuapp.com';

if (!Number.isInteger(timeout) || timeout <= 0) {
  throw new Error('API_TIMEOUT_MS must be a positive integer.');
}

let parsedBaseURL;

try {
  parsedBaseURL = new URL(baseURL);
} catch {
  throw new Error('API_BASE_URL must be an absolute HTTP or HTTPS URL.');
}

if (!['http:', 'https:'].includes(parsedBaseURL.protocol)) {
  throw new Error('API_BASE_URL must use HTTP or HTTPS.');
}

export const apiConfig = Object.freeze({
  baseURL,
  timeout,
  headers: Object.freeze({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
  credentials: Object.freeze({
    username: process.env.BOOKER_USERNAME ?? 'admin',
    password: process.env.BOOKER_PASSWORD ?? 'password123',
  }),
});
