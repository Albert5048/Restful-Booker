import { BaseService } from './base.service.js';

export class AuthService extends BaseService {
  createToken(username, password) {
    return this.post('/auth', {
      data: { username, password },
    });
  }
}
