export class UnauthorizedRequestException extends Error {
  constructor() {
    super('Unauthorized request')
  }
}
