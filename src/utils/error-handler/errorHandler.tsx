import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const errorHandler = (error: string = '') => {
  toast.error(error ? error : 'Something went wrong :(', {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

export default errorHandler
