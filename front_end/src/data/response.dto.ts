export default interface ResponseDto<T> {
    status: number,
    message: string,
    data: T
}