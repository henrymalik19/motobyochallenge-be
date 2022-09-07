import employeesService from '../employees.service'
import { CreateEmployeeDto } from '../../helpers/dtos/employees/CreateEmployeeDto'
import { EmployeeStatus } from '../../helpers/enums/employees/EmployeeStatus'
import { UpdateEmployeeDto } from '../../helpers/dtos/employees/UpdateEmployeeDto'

jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn().mockReturnValue({
        employee: {
            findMany: jest
                .fn()
                .mockResolvedValue([{ id: '123' }, { id: '456' }]),
            findFirst: jest
                .fn()
                .mockResolvedValue({
                    id: '123',
                    firstName: 'malik',
                    status: 'ACTIVE',
                })
                .mockResolvedValueOnce({ id: '123' })
                .mockRejectedValueOnce({ message: 'Not Found' }),
            create: jest
                .fn()
                .mockImplementation((arg) => ({ id: '123', ...arg.data })),
            update: jest
                .fn()
                .mockImplementation((arg) => ({ id: '123', ...arg.data })),
        },
    }),
}))

describe('Employees Service', () => {
    describe('findAllEmployees', () => {
        it('should return employees', async () => {
            const result = await employeesService.findAllEmployees()

            expect(result.length).toBe(2)
        })
    })

    describe('findEmployeeByIdOrThrow', () => {
        it('should return employee if id is found', async () => {
            const result = await employeesService.findEmployeeByIdOrThrow('123')
            expect(result.id).toBe('123')
        })

        it('should return employee if id is not found', async () => {
            try {
                await employeesService.findEmployeeByIdOrThrow('123')
            } catch (error: any) {
                expect(error.message).toBe('Not Found')
            }
        })
    })

    describe('createEmployee', () => {
        it('should create employee with given dto', async () => {
            const employee = { firstName: 'malik' } as any as CreateEmployeeDto

            const result = await employeesService.createEmployee(employee)

            expect(result.id).toBe('123')
            expect(result.firstName).toBe('malik')
            expect(result.status).toBe(EmployeeStatus.ACTIVE)
        })
    })

    describe('updateEmployeeOrThrow', () => {
        it('should update employee if id is found', async () => {
            const employee = {
                id: '123',
                firstName: 'malik update',
            } as any as UpdateEmployeeDto

            const found = await employeesService.findEmployeeByIdOrThrow(
                employee.id
            )

            expect(found.id).toBe('123')
            expect(found.firstName).toBe('malik')

            const result = await employeesService.updateEmployeeOrThrow(
                employee
            )

            expect(result.id).toBe('123')
            expect(result.firstName).toBe('malik update')
        })

        it('should return employee if id is not found', async () => {
            const employee = {
                id: '123',
                firstName: 'malik update',
            } as any as UpdateEmployeeDto

            try {
                await employeesService.updateEmployeeOrThrow(employee)
            } catch (error: any) {
                expect(error.message).toBe('Not Found')
            }
        })
    })

    describe('deleteEmployeeOrThrow', () => {
        it('should set employee status to INACTIVE', async () => {
            const found = await employeesService.findEmployeeByIdOrThrow('123')

            expect(found.id).toBe('123')

            const result = await employeesService.deleteEmployeeOrThrow('123')
            expect(result.id).toBe('123')
            expect(result.status).toBe(EmployeeStatus.INACTIVE)
        })

        it('should throw NotFoundError if status is INACTIVE', async () => {
            try {
                const found = await employeesService.findEmployeeByIdOrThrow(
                    '123'
                )
                expect(found.id).toBe('123')

                await employeesService.deleteEmployeeOrThrow('123')

                await employeesService.findEmployeeByIdOrThrow('123')
            } catch (error: any) {
                expect(error.message).toBe('Not Found')
            }
        })

        it('should throw NotFoundError if id is wrong', async () => {
            try {
                const found = await employeesService.findAllEmployees()
                expect(found.length).toBe(2)
                expect(found[0].id).toBe('123')
                expect(found[1].id).toBe('456')

                await employeesService.deleteEmployeeOrThrow('789')
            } catch (error: any) {
                expect(error.message).toBe('Not Found')
            }
        })
    })
})
