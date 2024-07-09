import React from 'react';
import "./Separator.css";

const Separator = ({type,Background_color="#000"}) => {
  switch(type){
    case "triangle":return <section style={{backgroundColor:Background_color}} className="triangle"></section>; 
    case "spikes" :return <section  className="spikes"></section>;
    case "waves" :return <section style={{backgroundColor:Background_color}} className="container"><div className="waves"></div></section>;
    case "curved": return <section style={{backgroundColor:Background_color}} className="curved"></section>;
  }
  return (
    {type}
  )
}

export default Separator;