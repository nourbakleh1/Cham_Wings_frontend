import { useEffect, useRef } from "react";

export const usePrevious = (search) => {

  const inputu=useRef("");

  useEffect(()=>{
      inputu.current=search;
  });

  
  return inputu.current;

}

