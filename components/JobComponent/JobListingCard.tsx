'use client'
import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'

type props = {
    title: string;
    desc: string;
    image?: string;
    time?: string;
    location?: string;
    isActive?: boolean;
    onClick?: () => void;
}

export const JobListingCard = ({ title, desc, image, time, location, isActive, onClick }: props) => {
    const [currentImgSrc, setImgSrc] = useState<string | StaticImageData>(
        `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${image}`
      );

    // const handleCardClick = () => {
    //     router.push(`/jobs/${id}`); // Navigate to the detail page
    // };


    // const handleCardClick = () => {
    //     if (onCardClick) {
    //       onCardClick(id); // Notify parent component of the click
    //     }
    //     router.push(`/jobs/${id}`); // Navigate to the detail page
    //   };

    return (
        <div className={`grid grid-cols-4 w-full border  border-gray-100 bg-white p-4 gap-4 rounded-xl justify-start items-center cursor-pointer hover:bg-slate-100 focus:bg-gray-100 transition-colors ${isActive ? 'bg-gray-200' : ''} `} onClick={onClick}  >
            {/* Image Section */}
            <div className="col-span-1 place-content-center place-items-center">
                <Image
                    src={currentImgSrc}
                    alt="Technique Illustration"
                    width={100}
                    height={100}
                    className="object-fill rounded-xl"
                    onError={() => setImgSrc("/assets/placeholder.png")}
                />
            </div>

            {/* Text Section */}
            <div className="col-span-3  space-y-2 ">
                <h2 className="text-lg lg:text-2xl font-semibold text-primary ">{title}</h2>
                <p className="text-sm lg:text-base text-textprimary">{desc}</p>
                <div className='flex flex-wrap gap-2'>
                    <div className="rounded-[8px] text-secondary bg-secondary bg-opacity-10 text-opacity-80 text-xs lg:text-sm max-w-fit px-1 lg:px-2">{time}</div>
                    <div className="rounded-[8px] text-primary bg-bgPrimaryLight text-opacity-80 text-xs lg:text-sm max-w-fit px-1 lg:px-2">{location}</div>
                </div>

            </div>
        </div>
    )
}
