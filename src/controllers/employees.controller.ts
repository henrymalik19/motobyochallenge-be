import { NextFunction, Request, Response } from 'express'
import CreatedResponse from '../helpers/CreatedResponse'
import { CreateEmployeeDto } from '../helpers/dtos/employees/CreateEmployeeDto'
import { UpdateEmployeeDto } from '../helpers/dtos/employees/UpdateEmployeeDto'
import { statusCodes } from '../helpers/enums/statusCodes'
import OKResponse from '../helpers/OkResponse'
import employeesService from '../services/employees.service'

const findAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees = await employeesService.findAllEmployees()

        res.status(statusCodes.OK).json(new OKResponse(employees))
    } catch (error) {
        next(error)
    }
}

const findEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params
        const employee = await employeesService.findEmployeeByIdOrThrow(id)

        res.status(statusCodes.OK).json(new OKResponse(employee))
    } catch (error) {
        next(error)
    }
}

const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const createEmployeeDto = new CreateEmployeeDto(
            req.body.firstName,
            req.body.middleInitial,
            req.body.lastName,
            req.body.dateOfBirth,
            req.body.dateOfEmployment
        )

        const employee = await employeesService.createEmployee(
            createEmployeeDto
        )

        res.status(statusCodes.CREATED).json(new CreatedResponse(employee))
    } catch (error) {
        next(error)
    }
}

const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
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

        res.status(statusCodes.OK).json(new OKResponse(employee))
    } catch (error) {
        next(error)
    }
}

const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params
        const employee = await employeesService.deleteEmployeeOrThrow(id)

        res.status(statusCodes.OK).json(new OKResponse(employee))
    } catch (error) {
        next(error)
    }
}

export default {
    findAllEmployees,
    findEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}
