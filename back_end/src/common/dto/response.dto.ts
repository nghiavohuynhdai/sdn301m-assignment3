export class ResponseDto {
  public constructor(
    private status: number,
    private message: string,
    private data?: object
  ) {}

  public getStatus(): number {
    return this.status
  }

  public getMessage(): string {
    return this.message
  }

  public getData(): object | null {
    return this.data ?? null
  }
}
