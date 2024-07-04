import React from 'react';
import "./Separator.css";

const Separator = ({type}) => {
  switch(type){
    case "triangle":return <section className="triangle"></section>; 
    case "spikes" :return <section className="spikes"></section>;
    case "wave" :return <section className="container"><div className="wave"></div></section>;
    case "curved": return <section className="curved"></section>;
  }
  return (
    {type}
  )
}

export default Separator;