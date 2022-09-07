import { IHttpResponse } from '../../interfaces/IHttpResponse'
import { statusCodes } from '../enums/statusCodes'
import { statusText } from '../enums/statusText'

interface OKResponseConfig<T> {
    data?: T
    message?: string
}

export default class OKResponse<T> implements IHttpResponse<T> {
    code: statusCodes = statusCodes.OK
    status: statusText = statusText.OK
    message?: string = ''
    data?: T

    constructor(config: OKResponseConfig<T>) {
        this.message = config.message
        this.data = config.data
    }
}
