class HTTPError extends Error {
  status: number;
  constructor(status: number, message?: string) {
    super(message);
    this.status = status;
  }
}

export class UnauthorizedError extends HTTPError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

export class ConflictError extends HTTPError {
  constructor(message = "Conflict") {
    super(409, message);
  }
}

