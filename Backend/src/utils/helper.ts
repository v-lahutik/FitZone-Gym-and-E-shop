export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    // Set the prototype explicitly when extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const createError = (msg: string, status: number) => {
  return new CustomError(msg, status);
};
