import { expressjwt } from 'express-jwt'
import jwks from 'jwks-rsa'

export const jwtCheck = expressjwt({
    // @ts-expect-error
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${
            process.env.AUTH0_DOMAIN as string
        }/.well-known/jwks.json`,
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN as string}/`,
    algorithms: ['RS256'],
})
