import { IHttpResponse } from '../../interfaces/IHttpResponse'
import { statusCodes } from '../enums/statusCodes'
import { statusText } from '../enums/statusText'

export default class CreatedResponse<T> implements IHttpResponse<T> {
    code: statusCodes = statusCodes.CREATED
    status: statusText = statusText.CREATED
    message?: string
    data: T

    constructor(data: T, message?: string) {
        this.message = message
        this.data = data
    }
}
