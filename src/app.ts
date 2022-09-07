import express from 'express'
import cors from 'cors'
import employeesRouter from './routes/employees.routes'
import { ErrorHandler, NotFound } from './middleware/errors.middleware'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/employees', employeesRouter)

app.use(NotFound)
app.use(ErrorHandler)

export default app
