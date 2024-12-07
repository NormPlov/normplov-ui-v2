import React from 'react'
import Image from 'next/image'
import QuizHeader from './QuizHeader'


type props = {
  title: string;
    highlight: string;
    description: string; 
    size: 'md' | 'sm';
    type: 'quiz' | 'result';
}

export const QuizResultIntroContainer = ({ title, highlight, description, size, type = 'result'} : props) => {

  

  return (
    <div className=" w-full bg-bglight gap-y-6 lg:gap-y-0 py-4 sm:py-6 md:py-8 lg:py-6 ">

      <div className='max-w-7xl mx-auto p-4 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12'>
        <div className="col-span-1 lg:col-span-8 ">
          <QuizHeader
            title={title}
            highlight={highlight}
            description={description}
            size={size}
            type={type}
          />
        </div>

        {/* Image Section: Full width for screens 1024px and lower, spans 3 columns on larger screens */}
        <div className="col-span-1 lg:col-span-4">
          <div className="relative w-full h-[300px] md:h-[600px] lg:h-[300px]">
            <Image
              src="/Quiz/stepup.png"
              alt="Stepup"
              fill
              className="object-contain"
              priority={true}
            />
          </div>
        </div>
      </div>


    </div>
  )
}
