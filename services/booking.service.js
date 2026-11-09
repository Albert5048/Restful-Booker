import { BaseService } from './base.service.js';

export class BookingService extends BaseService {
  getBookingIds(params) {
    return this.get('/booking', params ? { params } : {});
  }

  getBooking(id) {
    return this.get(`/booking/${encodeURIComponent(id)}`);
  }

  createBooking(payload) {
    return this.post('/booking', { data: payload });
  }

  updateBooking(id, payload, token) {
    return this.put(`/booking/${encodeURIComponent(id)}`, {
      data: payload,
      headers: { Cookie: `token=${token}` },
    });
  }

  partialUpdateBooking(id, payload, token) {
    return this.patch(`/booking/${encodeURIComponent(id)}`, {
      data: payload,
      headers: { Cookie: `token=${token}` },
    });
  }

  deleteBooking(id, token) {
    return this.delete(`/booking/${encodeURIComponent(id)}`, {
      headers: { Cookie: `token=${token}` },
    });
  }

  ping() {
    return this.get('/ping');
  }
}
