import axios from 'axios'

const BaseService = axios.create({
    timeout: 60000,
    baseURL: 'https://pi8fwbp2e5.execute-api.us-east-1.amazonaws.com/v1',
})

export default BaseService
