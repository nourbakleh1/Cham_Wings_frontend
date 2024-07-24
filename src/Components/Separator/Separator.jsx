import React from 'react';
import "./Separator.css";

const Separator = ({type,Background_color="#000"}) => {
  switch(type){
    case "curved1":return <section className="curved1"></section>; 
    case "spikes" :return <section  className="spikes"></section>;
    case "curved": return <section style={{backgroundColor:Background_color}} className="curved"></section>;
  }
  return (
    {type}
  )
}

export default Separator;