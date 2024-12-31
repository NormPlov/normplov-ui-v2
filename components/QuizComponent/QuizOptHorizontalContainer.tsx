'use client'
import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { QuizButton } from './QuizButton'
import { ArrowRight } from "lucide-react";
import placeholderImage from '@/public/Quiz/placeholder.jpg'


// this compoenent can be use as main option type of quiz or learning style technique card

type props = {
  title: string;
  desc: string;
  image?: StaticImageData | string;
  buttonText?: string;
  type?: 'main' | 'learninigStyle'
  badgeText?: string;
  onClick?: () => void;
  isDraft?: boolean;
  isAuthenticated?: boolean;
}

export const QuizOptHorizontalContainer = ({ title, desc, image, type = 'main', badgeText, onClick, isDraft, isAuthenticated }: props) => {

  const [imageSrc] = useState<StaticImageData | string>(image || placeholderImage);

  const [currentImgSrc, setImgSrc] = useState<string | StaticImageData>(
    `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${image}`
  );

  return (
    <div className={`flex flex-col sm:flex-row w-full bg-white p-4 gap-4 rounded-xl ${type === 'learninigStyle' ? 'justify-center items-center' : ''} `}>
      {/* Image Section */}
      <div className="flex-none flex justify-center items-center overflow-hidden">

        {
          type === 'learninigStyle' ? (
            <Image
              src={currentImgSrc}
              alt="Technique Illustration"
              width={100}
              height={100}
              className="object-fill"
              onError={() => setImgSrc(placeholderImage)}
            />
          ) : (
            isAuthenticated === true ? (
              < Image
                src={currentImgSrc}
                alt="Technique Illustration"
                width={200}
                height={200}
                className="object-fill"
                onError={() => setImgSrc(placeholderImage)}
              />
            ) : (
              < Image
              src={imageSrc}
              alt="Technique Illustration"
              width={200}
              height={200}
              className="object-fill"
              onError={() => setImgSrc(placeholderImage)}
            />
            )


          )
        }


      </div>


      <div className="flex flex-col justify-between flex-1 gap-4 space-y-1">
        <div>

          <h2 className={`text-xl font-bold  ${type === 'main' ? 'text-primary' : 'text-secondary '} `}>{title}</h2>
          {isDraft ? (
            <div className="max-w-4xl inline-block bg-secondary bg-opacity-10 mb-1  rounded-xl">
              <p className='text-secondary text-sm px-1'>
                ការធ្វើតេស្តមិនទាន់បានបញ្ចប់
              </p>
            </div>

          ) : ('')}
          <p className={`rounded-full text-textprimary text-opacity-80 text-sm  ${type === 'main' ? 'hidden' : ''}`}>{badgeText}</p>
          <p className="text-base text-textprimary ">
            {desc}
          </p>


        </div>

        <div className={`flex justify-start md:justify-end ${type === 'main' ? '' : 'hidden'}`}>
          <QuizButton title={isDraft === true ? 'បន្តតេស្ត' : 'ចាប់ផ្តើមតេស្ត'} rounded='full' icon={<ArrowRight />} type='rightIcon' onClick={onClick} />
        </div>

      </div>
    </div>
  )
}
