import { Employee as PrismaEmployee } from '@prisma/client'
import { EmployeeStatus } from '../helpers/enums/employees/EmployeeStatus'
import { IEmployee } from '../interfaces/employees.interfaces'

export class Employee implements IEmployee {
    id: string
    firstName: string
    middleInitial: string
    lastName: string
    dateOfBirth: Date
    dateOfEmployment: Date
    status: EmployeeStatus

    constructor(rawEmployee: PrismaEmployee) {
        this.id = rawEmployee.id
        this.firstName = rawEmployee.firstName
        this.middleInitial = rawEmployee.middleInitial
        this.lastName = rawEmployee.lastName
        this.dateOfBirth = new Date(rawEmployee.dateOfBirth)
        this.dateOfEmployment = new Date(rawEmployee.dateOfEmployment)
        this.status = rawEmployee.status as EmployeeStatus
    }
}
