import { Router } from 'express'
import employeesController from '../controllers/employees.controller'
import { asyncHandler } from '../helpers/asyncHandler'
import { validateBody } from '../middleware/validate.middleware'
import {
    createEmployeeSchema,
    updateEmployeeSchema,
} from '../schemas/employees.schema'

const employeesRouter = Router()

employeesRouter
    .route('/')
    .get(asyncHandler(employeesController.findAllEmployees))
    .post(
        validateBody(createEmployeeSchema),
        asyncHandler(employeesController.createEmployee)
    )

employeesRouter
    .route('/:id')
    .get(asyncHandler(employeesController.findEmployeeById))
    .put(
        validateBody(updateEmployeeSchema),
        asyncHandler(employeesController.updateEmployee)
    )
    .delete(asyncHandler(employeesController.deleteEmployee))

export default employeesRouter
