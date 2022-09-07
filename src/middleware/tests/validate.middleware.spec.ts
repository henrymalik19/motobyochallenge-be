import { Request, Response } from 'express'
import { AnyZodObject } from 'zod'
import BadRequestError from '../../errors/BadRequestError'
import * as validateMiddleware from '../validate.middleware'

describe('Validate Middleware', () => {
    let schema: AnyZodObject
    let req: Request
    let res: Response
    let next: jest.Mock

    beforeEach(() => {
        req = { body: { test: 'string' } } as any as Request
        res = {} as any as Response
        next = jest.fn()
    })

    beforeEach(() => {
        next.mockReset()
    })

    describe('Validate Middleware - ValidateBody', () => {
        it('should call next if req.body matches schema', () => {
            schema = { parse: jest.fn() } as any as AnyZodObject
            const handler = validateMiddleware.validateBody(schema)

            handler(req, res, next)

            expect(schema.parse).toHaveBeenCalledTimes(1)
            expect(next).toHaveBeenCalledTimes(1)
        })

        it('should call next with a BadRequestError if req.body does not match schema', () => {
            schema = {
                parse: jest
                    .fn()
                    .mockImplementation(
                        () => new BadRequestError(['bad request'])
                    ),
            } as any as AnyZodObject

            try {
                const handler = validateMiddleware.validateBody(schema)
                handler(req, res, next)
            } catch (error) {
                expect(schema.parse).toHaveBeenCalledTimes(1)
                expect(next).toHaveBeenCalledWith(error)
            }
        })
    })
})
