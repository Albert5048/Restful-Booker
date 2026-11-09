import { test, expect } from '../fixtures/api.fixture.js';

test('health endpoint responds with Created', async ({ bookingApi }) => {
  const response = await bookingApi.ping();

  expect(response.status()).toBe(201);
  expect(await response.text()).toBe('Created');
});
