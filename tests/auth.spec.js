import { readFileSync } from 'node:fs';
import { test, expect } from './fixtures/api.fixture.js';
import { ajv } from '../config/ajv.js';
import { apiConfig } from '../config/env.js';

const authResponseSchema = JSON.parse(
  readFileSync(new URL('../data/schemas/authResponse.schema.json', import.meta.url)),
);
const validateAuthResponse = ajv.compile(authResponseSchema);

test.describe('Authentication API', () => {
  test('creates a token with valid credentials', async ({ authApi }) => {
    const { username, password } = apiConfig.credentials;
    const response = await authApi.createToken(username, password);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(validateAuthResponse(body), JSON.stringify(validateAuthResponse.errors)).toBe(true);
    expect(body.token).toMatch(/^[A-Za-z0-9]{10,}$/);
  });
});
