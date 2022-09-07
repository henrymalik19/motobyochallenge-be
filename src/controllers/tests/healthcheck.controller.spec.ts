import * as healthcheckController from '../healthcheck.controller'

describe('HealthCheckController', () => {
    describe('HealthCheck', () => {
        it('should return an OKResponse', async () => {
            const res = await healthcheckController.healthcheck()

            expect(res.code).toBe(200)
            expect(res.status).toBe('OK')
            expect(res.message).toBe('healthcheck passed')
        })
    })
})
