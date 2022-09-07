import { ICreateEmployeeDto } from '../../../interfaces/employees/employees.interfaces'
import { EmployeeStatus } from '../../enums/employees/EmployeeStatus'

export class CreateEmployeeDto implements ICreateEmployeeDto {
    firstName: string
    middleInitial: string
    lastName: string
    dateOfBirth: string
    dateOfEmployment: string
    status: EmployeeStatus = EmployeeStatus.ACTIVE

    constructor(
        firstName: string,
        middleInitial: string,
        lastName: string,
        dateOfBirth: string,
        dateOfEmployment: string
    ) {
        this.firstName = firstName
        this.middleInitial = middleInitial.toUpperCase()
        this.lastName = lastName
        this.dateOfBirth = dateOfBirth
        this.dateOfEmployment = dateOfEmployment
    }
}
