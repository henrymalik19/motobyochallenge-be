import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

// routers
import healthcheckRouter from './routes/healthcheck.routes'
import employeesRouter from './routes/employees.routes'

// middleware
import { ErrorHandler, NotFound } from './middleware/errors.middleware'
// import { jwtCheck } from './middleware/jwt.middleware'

const app = express()

app.use(cors())
app.use(morgan('short'))
app.use(express.json())

app.use('/api/healthcheck', healthcheckRouter)

// app.use(jwtCheck)
app.use('/api/employees', employeesRouter)

app.use(NotFound)
app.use(ErrorHandler)

export default app
