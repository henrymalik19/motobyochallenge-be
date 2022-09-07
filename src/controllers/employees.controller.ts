import { Request } from 'express'
import CreatedResponse from '../helpers/responses/CreatedResponse'
import { CreateEmployeeDto } from '../helpers/dtos/employees/CreateEmployeeDto'
import { UpdateEmployeeDto } from '../helpers/dtos/employees/UpdateEmployeeDto'
import OKResponse from '../helpers/responses/OkResponse'
import employeesService from '../services/employees.service'
import { IEmployee } from '../interfaces/employees/employees.interfaces'
import { IHttpResponse } from '../interfaces/IHttpResponse'

const findAllEmployees = async (): Promise<IHttpResponse<IEmployee[]>> => {
    const employees = await employeesService.findAllEmployees()

    return new OKResponse({ data: employees })
}

const findEmployeeById = async (
    req: Request
): Promise<IHttpResponse<IEmployee>> => {
    const { id } = req.params
    const employee = await employeesService.findEmployeeByIdOrThrow(id)

    return new OKResponse<IEmployee>({ data: employee })
}

const createEmployee = async (
    req: Request
): Promise<IHttpResponse<CreateEmployeeDto>> => {
    const createEmployeeDto = new CreateEmployeeDto(
        req.body.firstName,
        req.body.middleInitial,
        req.body.lastName,
        req.body.dateOfBirth,
        req.body.dateOfEmployment
    )

    const employee = await employeesService.createEmployee(createEmployeeDto)

    return new CreatedResponse(employee)
}

const updateEmployee = async (
    req: Request
): Promise<IHttpResponse<UpdateEmployeeDto>> => {
    const updateEmployeeDto = new UpdateEmployeeDto(
        req.params.id,
        req.body.firstName,
        req.body.middleInitial,
        req.body.lastName,
        req.body.dateOfBirth,
        req.body.dateOfEmployment
    )

    const employee = await employeesService.updateEmployeeOrThrow(
        updateEmployeeDto
    )

    return new OKResponse<UpdateEmployeeDto>({ data: employee })
}

const deleteEmployee = async (
    req: Request
): Promise<IHttpResponse<IEmployee>> => {
    const { id } = req.params
    const employee = await employeesService.deleteEmployeeOrThrow(id)

    return new OKResponse<IEmployee>({ data: employee })
}

export default {
    findAllEmployees,
    findEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}
