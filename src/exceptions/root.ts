// message, status code, error codes, error

export class HttpException extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  errors: any;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  UNPROCESSABLE_ENTITY = 1004,
  ADDRESS_NOT_FOUND = 1005,
  INTERNAL_EXCEPTION = 3001,
  INTERNAL_SERVER_ERROR = 500,
  PRODUCT_NOT_FOUND = 2001,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
}
