import { statusCodes } from '../helpers/enums/statusCodes'
import { statusText } from '../helpers/enums/statusText'
import { IHttpError } from '../interfaces/IHttpError'

export default class UnauthorizedError extends Error implements IHttpError {
    statusCode: statusCodes = statusCodes.UNAUTHORIZED
    statusText: statusText = statusText.UNAUTHORIZED
    message: string
    errors?: string[] | undefined

    constructor(errors: string[]) {
        super()

        this.errors = errors
    }
}
