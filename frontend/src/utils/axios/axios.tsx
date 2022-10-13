import axios from 'axios'
import config from '@/config'

const $api = axios.create({
  withCredentials: true,
  baseURL: config.API_URL,
})
// Todo: Затипизировать конфиг
$api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})
$api.interceptors.response.use(
  (config: any) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get(`${config.API_URL}/v1/auth/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('token', response.data.accessToken)
        return $api.request(originalRequest)
      } catch (error) {
        console.log('Пользователь не Авторизован')
      }
    }
    throw error
  },
)
export default $api
