import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPowerOff, faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import Headings from "../Headings/Headings";
import Modal from "../Modal/Modal";

const SpeachToText = ({search,setSearch,open5,setOpen5}) => {
    // Speach 
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }

      
   
      useEffect(()=>{
        setSearch(transcript.replace(".",''));
       
      },[transcript])
  return ( <Modal open={open5} setOpen={setOpen5}>
    <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 flex-col bg-no-repeat bg-cover">
   <Headings element={"h1"}>search...</Headings>

    <div className='flex flex-col justify-center items-center gap-8 '>
          {
            listening ? <div className='flex justify-center items-center flex-col gap-3'><img src='/assets/images/Lestening.gif' className='w-[80%] hue-rotate-60 brightness-125  rounded-xl m-auto'/>
            <button  onClick={SpeechRecognition.stopListening} color={"#ae3a38"}><FontAwesomeIcon icon={faPowerOff}  className='text-red_color/80 bg-black/20  p-4  text-[18px] md:text-[28px] rounded-full'/></button>
            </div> :
            
            <> <Headings element={"h3"} color='#000'>{transcript}</Headings>
            <div className='flex gap-5 items-center justify-center'><button onClick={SpeechRecognition.startListening}><FontAwesomeIcon icon={faMicrophone} className='text-secoundary_color/80 bg-black/20  p-5   text-[20px] md:text-[32px] rounded-full'/></button>
            {transcript && <button onClick={resetTranscript}><FontAwesomeIcon icon={faTrashArrowUp} className='text-primary_color/80 bg-black/20  p-5  text-[20px] md:text-[32px] rounded-full'/></button>}</div>
              </>
          }   
    </div>


    </div>
   </Modal>
  )
}

export default SpeachToText