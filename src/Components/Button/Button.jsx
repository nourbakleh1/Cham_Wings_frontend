import React from 'react';
import "./Button.css";

const Button = ({children,color,onClick,padding="10px",text="#fff"},props) => {
  return (
    <button onClick={onClick} style={{backgroundColor : color,padding:padding,color:text}} className="btn-style">{children}</button>
  )
}

export default Button