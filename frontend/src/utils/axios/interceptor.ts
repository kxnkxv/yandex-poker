import { AxiosError, AxiosRequestConfig } from 'axios'
import instance from './axios'

const setUpInterceptor = (store: any) => {
  const handleError = async (error: AxiosError) => {
    return Promise.reject(error)
  }

  instance.interceptors.request.use(async (config: any | AxiosRequestConfig) => {
    let accessToken = store.getState().auth?.accessToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })

  instance.interceptors.response.use((response) => response, handleError)
}

export default setUpInterceptor
