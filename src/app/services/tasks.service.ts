import ApiService from './ApiService'

export async function getHotels() {
    return ApiService.fetchData({
        url: '/recruiting/hotels',
        method: 'get'
    })
}
