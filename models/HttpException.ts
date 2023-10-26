class HttpException extends Error {
  errorCode: number;

  debugMessage?: string;

  constructor(errorCode: number, public readonly message = '', debugMessage?: string) {
    super(message);
    this.errorCode = errorCode;
    this.debugMessage = debugMessage;
  }
}

export default HttpException;
