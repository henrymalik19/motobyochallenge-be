import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodIssue } from 'zod'
import BadRequestError from '../errors/BadRequestError'

export const validateBody = (schema: AnyZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error: any) {
            next(
                new BadRequestError(
                    error.errors.map((err: ZodIssue) =>
                        err.path[0] != null
                            ? `${err.path[0]} - ${err.message}`
                            : err.message
                    )
                )
            )
        }
    }
}
