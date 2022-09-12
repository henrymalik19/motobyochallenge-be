import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError as ExpressJwtUnauthorizedError } from 'express-jwt'
import BadRequestError from '../errors/BadRequestError'
import NotFoundError from '../errors/NotFoundError'
import UnauthorizedError from '../errors/UnauthorizedError'
import { statusCodes } from '../helpers/enums/statusCodes'
import { statusText } from '../helpers/enums/statusText'
import { IHttpError } from '../interfaces/IHttpError'

export const NotFound = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    next(new NotFoundError(`${req.url} Not Found`))
}

export const ErrorHandler = (
    error: IHttpError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (error instanceof SyntaxError)
        res.status(statusCodes.BAD_REQUEST).send(
            new BadRequestError([error.message])
        )
    if (error instanceof ExpressJwtUnauthorizedError)
        res.status(statusCodes.UNAUTHORIZED).send(
            new UnauthorizedError([error.message])
        )
    else {
        res.status(error.statusCode ?? statusCodes.INTERNAL_SERVER_ERROR).send({
            code: error.statusCode ?? statusCodes.INTERNAL_SERVER_ERROR,
            status: error.statusText ?? statusText.INTERNAL_SERVER_ERROR,
            ...(error.message !== '' && { message: error.message }),
            ...(error.errors != null && { errors: error.errors }),
        })
    }
}
