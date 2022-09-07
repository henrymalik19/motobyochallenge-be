import { statusCodes } from '../helpers/enums/statusCodes'
import { statusText } from '../helpers/enums/statusText'
import { IHttpError } from '../interfaces/IHttpError'

export default class NotFoundError extends Error implements IHttpError {
    statusCode: statusCodes = statusCodes.NOT_FOUND
    statusText: statusText = statusText.NOT_FOUND
    message: string

    constructor(message: string) {
        super(message)
        this.message = message
    }
}
