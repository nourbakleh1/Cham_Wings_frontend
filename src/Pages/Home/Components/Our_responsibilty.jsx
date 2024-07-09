import React from 'react'
import "./Responsibilty.css"
import Headings from '../../../Components/Headings/Headings'
const Our_responsibilty = () => {
  return (
    <>
        <section className='pt-5 md:pt-[50px] bg-off_white'>
        <Headings element={"h1"}>our responsibilty</Headings>
        <div className='resposibilty h-[500px] overflow-hidden bg-fixed flex justify-center items-center '>
        <div className='max-w-[700px] z-40 flex flex-col gap-5 px-3 sm:px-0'>
        <Headings element={"p"} color_P='#fff'>
            Cham Wings Airlines is looking forward
             to working on the development of the Syrian
              community, which we consider as our large family.
               Therefore, we strive in the company with an
                insightful strategy to support this family in
                 all possible ways, as Cham Wings offers direct
                  employment opportunities to more than 300
                   Syrians through its operations in Damascus,
                    and indirectly, has created hundreds of other
                     jobs in Syria through its dealing with
                      several local companies, in addition to its
             network of suppliers and partners around the world.
             </Headings>
             <Headings element={"p"} color_P='#fff'>
            Cham Wings Airlines plays an important
            role in enhancing Syrian participation in local and international
            events by sponsoring various social, artistic and cultural activities
            and that originates from our belief in the importance of supporting
            and developing the Syrian community in the best possible manner.
             </Headings>
        </div>
            
        </div>
        </section>
       
    </>
  )
}

export default Our_responsibilty