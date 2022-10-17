import Loader from 'components/loader/loader'
import React, { FC, useState } from 'react'

// Types
import { TProps } from './types'

const Button: FC<TProps> = (props) => {
  const [state, setState] = useState({ loading: false })
  function submitForm() {
    setState({ ...state, loading: true })
  }
  return (
    <button className='btn-red' onClick={submitForm} disabled={state.loading}>
      {!state.loading ? props.children : <Loader isPending={true} />}
    </button>
  )
}

export default Button
