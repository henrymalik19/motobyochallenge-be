import { z } from 'zod'
import {
    createEmployeeSchema,
    employeeSchema,
    updateEmployeeSchema,
} from '../../schemas/employees.schema'

export type IEmployee = z.infer<typeof employeeSchema>
export type ICreateEmployeeDto = z.infer<typeof createEmployeeSchema>
export type IUpdateEmployeeDto = z.infer<typeof updateEmployeeSchema>
