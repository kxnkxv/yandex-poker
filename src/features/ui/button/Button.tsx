import React from 'react'

const Button = (props: {
  clicked: React.MouseEventHandler<HTMLButtonElement> | undefined
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
}) => (
  <button className='bg-red hover:bg-crimson text-white font-roboto w-full py-2 px-4 m-4 rounded focus:outline-none focus:shadow-outline' onClick={props.clicked}>
    {props.children}
  </button>
)
export default Button
