export class ApiError extends Error {
  code: number;

  message: string;

  description?: string;

  constructor(code: number, message: string, description = '') {
    super(message);
    this.code = code;
    this.message = message;
    this.description = description;
  }

  static sendBadRequest(description?: string) {
    return new ApiError(400, 'Bad request', description);
  }

  static sendUnauthorized(description?: string) {
    return new ApiError(401, 'Unauthorized', description);
  }

  static sendForbidden(description?: string) {
    return new ApiError(403, 'Forbidden', description);
  }

  static sendNotFound() {
    return new ApiError(404, 'Not found');
  }
}
