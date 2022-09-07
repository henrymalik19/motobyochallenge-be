// import fs from 'fs/promises'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { EmployeeStatus } from '../src/helpers/enums/employees/EmployeeStatus'
// import data from './data.json'

const prisma = new PrismaClient()

async function main(): Promise<void> {
    const { data } = await axios.get(
        'https://random-data-api.com/api/users/random_user?size=10'
    )
    // await fs.writeFile('./prisma/data.json', JSON.stringify(data))

    await Promise.all(
        data.map(async (employee: any) => {
            await prisma.employee.create({
                data: {
                    firstName: employee.first_name,
                    middleInitial: employee.first_name[2],
                    lastName: employee.last_name,
                    dateOfBirth: employee.date_of_birth,
                    dateOfEmployment: '2018-06-12',
                    status: EmployeeStatus.ACTIVE,
                },
            })
        })
    )
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
