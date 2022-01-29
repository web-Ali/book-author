import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
const $authHostStats = axios.create({
    baseURL: process.env.REACT_APP_API_STATS_URL
})

const authInterceptor = config => {
    if (localStorage.getItem('token')){
        config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config
}

$authHost.interceptors.request.use(authInterceptor)
$authHostStats.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
    $authHostStats
}
