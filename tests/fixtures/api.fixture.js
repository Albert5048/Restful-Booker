import { test as base, expect } from '@playwright/test';
import { apiConfig } from '../../config/env.js';
import { AuthService } from '../../services/auth.service.js';
import { BookingService } from '../../services/booking.service.js';

export const test = base.extend({
  bookingApi: async ({ request }, use) => {
    await use(new BookingService(request, apiConfig.timeout));
  },
  authApi: async ({ request }, use) => {
    await use(new AuthService(request, apiConfig.timeout));
  },
});

export { expect };
