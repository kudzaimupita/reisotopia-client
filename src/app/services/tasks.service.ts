import ApiService from './ApiService'

export async function getHotels(params: never) {
    return ApiService.fetchData({
        url: '/recruiting/hotels',
        method: 'get',
        params,
    })
}
