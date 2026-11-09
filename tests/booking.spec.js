import { readFileSync } from 'node:fs';
import { test, expect } from './fixtures/api.fixture.js';
import { ajv } from '../config/ajv.js';
import { apiConfig } from '../config/env.js';
import { createBookingPayload } from '../data/payloads/bookingPayload.js';

const authResponseSchema = JSON.parse(
  readFileSync(new URL('../data/schemas/authResponse.schema.json', import.meta.url)),
);
const bookingResponseSchema = JSON.parse(
  readFileSync(new URL('../data/schemas/bookingResponse.schema.json', import.meta.url)),
);
const validateAuthResponse = ajv.compile(authResponseSchema);
const validateBookingResponse = ajv.compile(bookingResponseSchema);

test.describe('Booking lifecycle API', () => {
  let token;
  let bookingId;

  test.beforeEach(async ({ authApi }) => {
    const { username, password } = apiConfig.credentials;
    const response = await authApi.createToken(username, password);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(validateAuthResponse(body), JSON.stringify(validateAuthResponse.errors)).toBe(true);
    token = body.token;
  });

  test.afterEach(async ({ bookingApi }) => {
    if (bookingId === undefined) {
      return;
    }

    const response = await bookingApi.deleteBooking(bookingId, token);
    expect([201, 404]).toContain(response.status());
    bookingId = undefined;
  });

  test('creates, reads, updates, and deletes a booking', async ({ bookingApi }) => {
    const initialPayload = createBookingPayload();
    const createResponse = await bookingApi.createBooking(initialPayload);

    expect(createResponse.status()).toBe(200);
    const createdBooking = await createResponse.json();
    bookingId = createdBooking.bookingid;

    expect(
      validateBookingResponse(createdBooking),
      JSON.stringify(validateBookingResponse.errors),
    ).toBe(true);
    expect(createdBooking.booking).toMatchObject(initialPayload);

    const getResponse = await bookingApi.getBooking(bookingId);
    expect(getResponse.status()).toBe(200);
    expect(await getResponse.json()).toEqual(initialPayload);

    const updatedPayload = createBookingPayload();
    const updateResponse = await bookingApi.updateBooking(
      bookingId,
      updatedPayload,
      token,
    );

    expect(updateResponse.status()).toBe(200);
    expect(await updateResponse.json()).toEqual(updatedPayload);

    const updatedGetResponse = await bookingApi.getBooking(bookingId);
    expect(updatedGetResponse.status()).toBe(200);
    expect(await updatedGetResponse.json()).toEqual(updatedPayload);

    const deleteResponse = await bookingApi.deleteBooking(bookingId, token);
    expect(deleteResponse.status()).toBe(201);
    expect(await deleteResponse.text()).toBe('Created');
    bookingId = undefined;

    const deletedGetResponse = await bookingApi.getBooking(createdBooking.bookingid);
    expect(deletedGetResponse.status()).toBe(404);
  });
});
