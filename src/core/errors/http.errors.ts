export class HttpError extends Error {
  public statusCode: number;
  public params?: Record<string, any>;

  constructor(
    message: string,
    statusCode: number,
    params?: Record<string, any>,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.params = params;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class NotFoundError extends HttpError {
  constructor(
    message = 'errors.resourceNotFound',
    params?: Record<string, any>,
  ) {
    super(message, 404, params);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'errors.badRequest', params?: Record<string, any>) {
    super(message, 400, params);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = 'errors.internalServerError') {
    super(message, 500);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
