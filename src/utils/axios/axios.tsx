import axios from 'axios'
import config from '../../config'

let instance = axios.create({
  withCredentials: true,
  baseURL: config.API_URL,
})

export default instance
