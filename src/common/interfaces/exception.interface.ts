export interface IException {
  message: string;
  error: string;
  statusCode: number;
}

export interface IExceptionResponse extends IException {
  timestamp: string;
  path: string;
}
