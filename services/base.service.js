export class BaseService {
  constructor(request, timeout) {
    this.request = request;
    this.timeout = timeout;
  }

  get(path, options = {}) {
    return this.request.get(path, { timeout: this.timeout, ...options });
  }

  post(path, options = {}) {
    return this.request.post(path, { timeout: this.timeout, ...options });
  }

  put(path, options = {}) {
    return this.request.put(path, { timeout: this.timeout, ...options });
  }

  patch(path, options = {}) {
    return this.request.patch(path, { timeout: this.timeout, ...options });
  }

  delete(path, options = {}) {
    return this.request.delete(path, { timeout: this.timeout, ...options });
  }
}
