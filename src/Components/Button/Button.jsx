import React from 'react';
import "./Button.css";

const Button = ({children,color,onClick,padding="10px",text="#fff",width="auto"},props) => {
  return (
    <button onClick={onClick} style={{backgroundColor : color,padding:padding,color:text,width:width}} className="btn-style">{children}</button>
  )
}

export default Button