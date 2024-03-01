export class ForbiddenRequestException extends Error {
  constructor(message: string) {
    super(message)
  }
}
