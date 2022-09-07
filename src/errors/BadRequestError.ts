import { statusCodes } from '../helpers/enums/statusCodes'
import { statusText } from '../helpers/enums/statusText'
import { IHttpError } from '../interfaces/IHttpError'

export default class BadRequest extends Error implements IHttpError {
    statusCode: statusCodes = statusCodes.BAD_REQUEST
    statusText: statusText = statusText.BAD_REQUEST
    message: string
    errors?: string[] | undefined

    constructor(errors: string[]) {
        super()

        this.errors = errors
    }
}
