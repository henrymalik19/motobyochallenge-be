import { Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError'
import NotFoundError from '../../errors/NotFoundError'
import { IHttpError } from '../../interfaces/IHttpError'
import * as errorsMiddleware from '../errors.middleware'

describe('Errors Middleware', () => {
    let err: IHttpError
    let req: Request
    let res: Response
    let next: jest.Mock

    beforeEach(() => {
        req = { url: '/test' } as any as Request
        res = {
            status: jest.fn().mockReturnValue(res),
            send: jest.fn(),
        } as any as Response
        next = jest.fn()
    })

    describe('Errors Middleware - NotFound', () => {
        it('should call next once', () => {
            errorsMiddleware.NotFound(req, res, next)

            expect(next).toHaveBeenCalledTimes(1)
        })

        it('should call next with a NotFound error', () => {
            errorsMiddleware.NotFound(req, res, next)

            expect(next).toHaveBeenCalledWith(
                new NotFoundError(`${req.url} Not Found`)
            )
        })
    })

    describe('Errors Middleware - Error Handler', () => {
        it('should return a BadRequestError if specified', () => {
            err = new BadRequestError(['bad request'])

            errorsMiddleware.ErrorHandler(err, req, res, next)

            expect(res.status).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(400)
        })
        it('should return 500 by default', () => {
            err = {} as any as IHttpError

            errorsMiddleware.ErrorHandler(err, req, res, next)

            expect(res.status).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })
})
