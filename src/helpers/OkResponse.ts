import { IHttpResponse } from '../interfaces/IHttpResponse'
import { statusCodes } from './enums/statusCodes'
import { statusText } from './enums/statusText'

export default class OKResponse<T> implements IHttpResponse<T> {
    code: statusCodes = statusCodes.OK
    status: statusText = statusText.OK
    message?: string
    data: T

    constructor(data: T, message?: string) {
        this.message = message
        this.data = data
    }
}
