import { PrismaClient } from '@prisma/client'
import NotFoundError from '../errors/NotFoundError'
import { CreateEmployeeDto } from '../helpers/dtos/employees/CreateEmployeeDto'
import { UpdateEmployeeDto } from '../helpers/dtos/employees/UpdateEmployeeDto'
import { EmployeeStatus } from '../helpers/enums/employees/EmployeeStatus'
import { IEmployee } from '../interfaces/employees.interfaces'

const prisma = new PrismaClient()

const findAllEmployees = async (): Promise<IEmployee[]> => {
    const employees = (await prisma.employee.findMany({
        where: { status: EmployeeStatus.ACTIVE },
    })) as IEmployee[]

    return employees
}

const findEmployeeByIdOrThrow = async (id: string): Promise<IEmployee> => {
    const employee = (await prisma.employee.findFirst({
        where: { id, status: EmployeeStatus.ACTIVE },
    })) as IEmployee

    if (employee === null)
        throw new NotFoundError(`Employee with id ${id} not found`)

    return employee
}

const createEmployee = async (
    employeeDto: CreateEmployeeDto
): Promise<IEmployee> => {
    const createdEmployee = (await prisma.employee.create({
        data: {
            firstName: employeeDto.firstName,
            middleInitial: employeeDto.middleInitial,
            lastName: employeeDto.lastName,
            dateOfBirth: employeeDto.dateOfBirth,
            dateOfEmployment: employeeDto.dateOfEmployment,
            status: EmployeeStatus.ACTIVE,
        },
    })) as IEmployee

    return createdEmployee
}

const updateEmployeeOrThrow = async (
    employeeDto: UpdateEmployeeDto
): Promise<IEmployee> => {
    await findEmployeeByIdOrThrow(employeeDto.id)
    const updatedEmployee = (await prisma.employee.update({
        data: {
            firstName: employeeDto.firstName,
            middleInitial: employeeDto.middleInitial,
            lastName: employeeDto.lastName,
            dateOfBirth: employeeDto.dateOfBirth,
            dateOfEmployment: employeeDto.dateOfEmployment,
        },
        where: { id: employeeDto.id },
    })) as IEmployee

    return updatedEmployee
}

const deleteEmployeeOrThrow = async (id: string): Promise<IEmployee> => {
    await findEmployeeByIdOrThrow(id)

    const softDeletedEmployee = (await prisma.employee.update({
        data: { status: EmployeeStatus.INACTIVE },
        where: { id },
    })) as IEmployee

    return softDeletedEmployee
}

export default {
    findAllEmployees,
    findEmployeeByIdOrThrow,
    createEmployee,
    updateEmployeeOrThrow,
    deleteEmployeeOrThrow,
}
