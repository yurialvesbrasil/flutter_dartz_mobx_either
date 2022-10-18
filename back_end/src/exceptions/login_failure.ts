class LoginError extends Error {}

export class LoginServerErrorFailure extends LoginError {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LoginServerErrorFailure.prototype);
  }

  getErrorMessage() {
    return this.message;
  }

  getStateCode() {
    return 403;
  }
}

export class LoginNotFoundFailure extends LoginError {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LoginNotFoundFailure.prototype);
  }

  getErrorMessage() {
    return this.message;
  }

  getStateCode() {
    return 404;
  }
}
