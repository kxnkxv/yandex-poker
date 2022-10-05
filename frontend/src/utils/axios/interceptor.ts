import config from '@/config'

import { TAuthInitialState } from 'pages/login/types'
import { AxiosRequestConfig } from 'axios'
import axios from './axios'
import instance from './axios'

const setUpInterceptor = (store: any) => {
  instance.interceptors.request.use((config: any | AxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  })

  instance.interceptors.response.use(
      (config: any | AxiosRequestConfig) => {
        return config
      }
      ,
      async (error) => {
        const originalRequest = error.config
        if (error.response.status == 401 && error.config && !error.config._isRetry) {
          originalRequest._isRetry = true
          try {
            const response = await axios.get<TAuthInitialState>(`${config.API_URL}/refresh`, {
              withCredentials: true,
            })
            localStorage.setState('token', response.data.accessToken)
            return instance.request(originalRequest)
          } catch (e) {
            console.log("NOT AUTHORIZED")
          }
        }
        throw error
      },
    )
}

export default setUpInterceptor
