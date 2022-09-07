import { Request, Response, NextFunction } from 'express'

export const asyncHandler = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await fn(req, res, next)
            res.status(result.code).send(result)
        } catch (error) {
            next(error)
        }
    }
}
