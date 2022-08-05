import React from 'react';
import '../ui.css';

const Button = ( props: { clicked: React.MouseEventHandler<HTMLButtonElement> | undefined; children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; } ) => (

  <button
    className="button"
    onClick={props.clicked}
  >
    {props.children}
  </button>
)
export default Button;