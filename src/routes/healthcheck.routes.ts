import { Router } from 'express'
import * as healthcheckController from '../controllers/healthcheck.controller'
import { asyncHandler } from '../helpers/asyncHandler'

const healthcheckRouter = Router()

healthcheckRouter
    .route('/')
    .get(asyncHandler(healthcheckController.healthcheck))

export default healthcheckRouter
