import React from 'react';
import "./Button.css";

const Button = ({children,color,onClick},props) => {
  return (
    <button onClick={onClick} style={{backgroundColor : color}} className="btn-style">{children}</button>
  )
}

export default Button