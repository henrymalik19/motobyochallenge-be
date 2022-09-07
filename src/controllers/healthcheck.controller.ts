import OKResponse from '../helpers/responses/OkResponse'

export const healthcheck = async (): Promise<OKResponse<void>> => {
    return await Promise.resolve(
        new OKResponse({ message: 'healthcheck passed' })
    )
}
