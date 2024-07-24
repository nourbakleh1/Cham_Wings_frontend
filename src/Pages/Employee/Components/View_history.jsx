import React, { useEffect} from 'react'

const View_history = () => {
    useEffect(()=>{
      window.scrollTo(0,0);
    },[]);
  return (
    <div>
    <div className='h-[1500px] bg-gradient-to-t bg-gray_color'>
    </div>
    </div>
  )
}

export default View_history