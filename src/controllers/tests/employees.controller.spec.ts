import employeesController from '../employees.controller'
import employeesService from '../../services/employees.service'
import { Request } from 'express'

jest.mock('../../services/employees.service')
// , () => ({
//     findAllEmployees: jest
//         .fn()
//         .mockResolvedValue([])
//         .mockResolvedValueOnce([{ id: '123' }, { id: '456' }]),
//     findEmployeeByIdOrThrow: jest
//         .fn()
//         .mockResolvedValue({
//             id: '123',
//             firstName: 'malik',
//             status: 'ACTIVE',
//         })
//         .mockRejectedValue({ code: 404, status: 'Not Found' }),
//     createEmployee: jest
//         .fn()
//         .mockImplementation((arg) => ({ id: '123', ...arg.data })),
//     updateEmployeeOrThrow: jest
//         .fn()
//         .mockResolvedValue({ id: '123', ...arg.data })
//         .mockRejectedValue({ code: 404, status: 'Not Found' }),
//     deleteEmployeeOrThrow: jest
//         .fn()
//         .mockImplementation((arg) => ({ id: '123', ...arg.data })),
// }))

describe('EmployeesController', () => {
    employeesService.findAllEmployees = jest.fn()

    describe('findAllEmployees', () => {
        beforeEach(() => {
            ;(employeesService.findAllEmployees as any as jest.Mock).mockReset()
        })

        it('should return an OKResponse with an array of employees', async () => {
            ;(
                employeesService.findAllEmployees as any as jest.Mock
            ).mockResolvedValue([{ id: '123' }, { id: '456' }])

            const res = await employeesController.findAllEmployees()

            expect(res.code).toBe(200)
            expect(res.status).toBe('OK')
            expect(res.data?.length).toBe(2)
        })

        it('should return an OKResponse with an empty array if no employees', async () => {
            ;(
                employeesService.findAllEmployees as any as jest.Mock
            ).mockResolvedValue([])

            const res = await employeesController.findAllEmployees()

            expect(res.code).toBe(200)
            expect(res.status).toBe('OK')
            expect(res.data?.length).toBe(0)
        })
    })

    describe('findEmployeeByIdOrThrow', () => {
        employeesService.findEmployeeByIdOrThrow = jest.fn()

        beforeEach(() => {
            ;(
                employeesService.findEmployeeByIdOrThrow as any as jest.Mock
            ).mockReset()
        })

        it('should return an OKResponse with an employee - valid id', async () => {
            ;(
                employeesService.findEmployeeByIdOrThrow as any as jest.Mock
            ).mockResolvedValue({
                id: '123',
                firstName: 'malik',
                status: 'ACTIVE',
            })

            const req = { params: { id: '123' } } as any as Request
            const res = await employeesController.findEmployeeById(req)

            expect(res.code).toBe(200)
            expect(res.status).toBe('OK')
            expect(res.data?.id).toBe('123')
            expect(res.data?.firstName).toBe('malik')
        })

        it('should throw an NotFoundError if id is not found', async () => {
            ;(
                employeesService.findEmployeeByIdOrThrow as any as jest.Mock
            ).mockRejectedValue({
                code: 404,
                status: 'Not Found',
            })

            try {
                const req = { params: { id: '456' } } as any as Request
                await employeesController.findEmployeeById(req)
            } catch (error: any) {
                expect(error.code).toBe(404)
                expect(error.status).toBe('Not Found')
            }
        })
    })

    describe('UpdateEmployeeByIdOrThrow', () => {
        employeesService.updateEmployeeOrThrow = jest.fn()

        beforeEach(() => {
            ;(
                employeesService.updateEmployeeOrThrow as any as jest.Mock
            ).mockReset()
        })

        it('should return an OKResponse with an updated employee - valid id', async () => {
            ;(
                employeesService.updateEmployeeOrThrow as any as jest.Mock
            ).mockImplementation((arg) => ({ id: '123', ...arg }))

            const req = {
                params: { id: '123' },
                body: { firstName: 'malik update' },
            } as any as Request
            const res = await employeesController.updateEmployee(req)

            expect(res.code).toBe(200)
            expect(res.status).toBe('OK')
            expect(res.data?.id).toBe('123')
            expect(res.data?.firstName).toBe('malik update')
        })

        it('should throw an NotFoundError if id is not found', async () => {
            ;(
                employeesService.updateEmployeeOrThrow as any as jest.Mock
            ).mockRejectedValue({
                code: 404,
                status: 'Not Found',
            })

            try {
                const req = {
                    params: { id: '456' },
                    body: { firstName: 'malik update' },
                } as any as Request
                await employeesController.updateEmployee(req)
            } catch (error: any) {
                expect(error.code).toBe(404)
                expect(error.status).toBe('Not Found')
            }
        })
    })

    describe('DeleteEmployeeByIdOrThrow', () => {
        employeesService.deleteEmployeeOrThrow = jest.fn()

        beforeEach(() => {
            ;(
                employeesService.deleteEmployeeOrThrow as any as jest.Mock
            ).mockReset()
        })

        it('should return an OKResponse with an updated employee - valid id', async () => {
            ;(
                employeesService.deleteEmployeeOrThrow as any as jest.Mock
            ).mockImplementation((arg) => ({
                id: '123',
                ...arg,
                status: 'INACTIVE',
            }))

            const req = { params: { id: '123' } } as any as Request
            const res = await employeesController.deleteEmployee(req)

            expect(res.code).toBe(200)
            expect(res.status).toBe('OK')
            expect(res.data?.id).toBe('123')
            expect(res.data?.status).toBe('ACTIVE')
        })

        it('should throw an NotFoundError if id is not found', async () => {
            ;(
                employeesService.deleteEmployeeOrThrow as any as jest.Mock
            ).mockRejectedValue({
                code: 404,
                status: 'Not Found',
            })

            try {
                const req = { params: { id: '123' } } as any as Request
                await employeesController.deleteEmployee(req)
            } catch (error: any) {
                expect(error.code).toBe(404)
                expect(error.status).toBe('Not Found')
            }
        })
    })
})
