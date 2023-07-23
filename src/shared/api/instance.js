import axios from "axios"
import config from "../config"

const instance = axios.create({
    withCredentials: true,
    baseURL: config.baseUrl
})

instance.interceptors.request.use( async (config) => {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
},
    (error) => error
)

export {instance}

