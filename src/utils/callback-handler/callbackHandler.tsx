import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const callbackHandler = (result: string = '') => {
  toast.success(result ? result : 'Success 👍', {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

export default callbackHandler
