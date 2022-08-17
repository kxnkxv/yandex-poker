import React from 'react'

//Types
import { TProps } from './types'

const Button: TProps = (props) => <button className='btn-red'>{props.children}</button>

export default Button
