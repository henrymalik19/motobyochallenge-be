import { statusCodes } from '../helpers/enums/statusCodes'
import { statusText } from '../helpers/enums/statusText'

export interface IHttpError extends Error {
    statusCode: statusCodes
    statusText: statusText
    message: string
    errors?: string[]
}
