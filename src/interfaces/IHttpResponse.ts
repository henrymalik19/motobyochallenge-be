import { statusCodes } from '../helpers/enums/statusCodes'
import { statusText } from '../helpers/enums/statusText'

export interface IHttpResponse<T> {
    code: statusCodes
    status: statusText
    message?: string
    data?: T
}
