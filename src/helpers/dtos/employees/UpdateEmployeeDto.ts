import { IUpdateEmployeeDto } from '../../../interfaces/employees.interfaces'
import { EmployeeStatus } from '../../enums/employees/EmployeeStatus'

export class UpdateEmployeeDto implements IUpdateEmployeeDto {
    id: string
    firstName: string
    middleInitial: string
    lastName: string
    dateOfBirth: string
    dateOfEmployment: string
    status: EmployeeStatus = EmployeeStatus.ACTIVE

    constructor(
        id: string,
        firstName: string,
        middleInitial: string,
        lastName: string,
        dateOfBirth: string,
        dateOfEmployment: string
    ) {
        this.id = id
        this.firstName = firstName
        this.middleInitial = middleInitial
        this.lastName = lastName
        this.dateOfBirth = dateOfBirth
        this.dateOfEmployment = dateOfEmployment
    }
}
