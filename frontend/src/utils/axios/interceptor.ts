import config from '@/config'
import axios, { AxiosRequestConfig } from 'axios'
import instance from './axios'

const setUpInterceptor = (store: any) => {
  //const handleError = async (error: AxiosError) => {
  //return Promise.reject(error)
  //}

  instance.interceptors.request.use(async (config: any | AxiosRequestConfig) => {
    let accessToken = store.getState().auth?.accessToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })

  instance.interceptors.response.use(
    (config) => {
      return config
    },
    async (error) => {
      const originalRequest = error.config
      if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
          const response = await axios.get<AxiosRequestConfig>(`${config.API_URL}/refresh`, {
            withCredentials: true,
          })
          store.getState('token', response.data)
          return instance.interceptors.request.use(originalRequest)
        } catch (e) {
          console.log("NOT AUTHORIZED")
        }
      }
      throw error
    },
  )
  //return config
  //response, handleError)
}

export default setUpInterceptor
