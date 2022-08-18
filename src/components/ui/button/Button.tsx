import React, { FC } from 'react'

//Types
import { TProps } from './types'

const Button: FC<TProps> = (props) => <button className='btn-red'>{props.children}</button>

export default Button
