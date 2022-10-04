import axios from 'axios'
import config from '@/config'

const instance = axios.create({
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  baseURL: config.API_URL,
})

export default instance
