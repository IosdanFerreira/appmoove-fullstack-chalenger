export class InternalServerError extends Error {
  constructor(
    public message: string,
    public errors?: Array<{ property: string; message: string }>,
  ) {
    super(message);
    this.name = 'InternalServerError';
  }
}
