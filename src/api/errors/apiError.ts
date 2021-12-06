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

  static sendNotFound() {
    return new ApiError(404, 'Not found');
  }
}
