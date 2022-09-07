import { z } from 'zod'
import { EmployeeStatus } from '../helpers/enums/employees/EmployeeStatus'

const dateRegex =
    /[1-2]0|9\d\d-([0][1-9]|[1][1-2])-([0][1-9]|[1-2][0-9]|[3][0-1])/gm

export const employeeSchema = z
    .object({
        id: z.string().uuid(),
        createdAt: z.date(),
        updatedAt: z.date(),

        firstName: z.string().max(50),
        middleInitial: z.string().max(1),
        lastName: z.string().max(50),
        dateOfBirth: z.string().regex(dateRegex),
        dateOfEmployment: z.string().regex(dateRegex),
        status: z.nativeEnum(EmployeeStatus),
    })
    .strict()

export const upsertEmployeeSchema = z
    .object({
        firstName: z.string().max(50),
        middleInitial: z.string().max(1),
        lastName: z.string().max(50),
        dateOfBirth: z.string().regex(dateRegex),
        dateOfEmployment: z.string().regex(dateRegex),
    })
    .strict()

export const createEmployeeSchema = upsertEmployeeSchema
export const updateEmployeeSchema = upsertEmployeeSchema
