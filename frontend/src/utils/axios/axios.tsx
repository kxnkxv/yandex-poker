import axios from 'axios'
import config from '@/config'

// const standartBaseUrl =
//   process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : config.API_URL

const instance = axios.create({
  withCredentials: true,
  baseURL: config.API_URL,
})

export default instance
