import { Router } from 'express'
import employeesController from '../controllers/employees.controller'
import { validateBody } from '../middleware/validate.middleware'
import {
    createEmployeeSchema,
    updateEmployeeSchema,
} from '../schemas/employees.schema'

const employeesRouter = Router()

employeesRouter
    .route('/')
    .get(employeesController.findAllEmployees)
    .post(
        validateBody(createEmployeeSchema),
        employeesController.createEmployee
    )

employeesRouter
    .route('/:id')
    .get(employeesController.findEmployeeById)
    .put(validateBody(updateEmployeeSchema), employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)

export default employeesRouter
