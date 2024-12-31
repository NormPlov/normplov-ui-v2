'use client'
import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import placeholderImage from '@/public/Quiz/placeholder.jpg'

type props = {
    title: string;
    desc: string;
    image: StaticImageData | string;
}

export const QuizInterestResultCard = ({ title, desc, image }: props) => {

    // const [imgSrc, setImgSrc] = useState(image);

    const [currentImgSrc, setImgSrc] = useState<string | StaticImageData>(
        `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${image}`
    );

    return (
        <div className=" max-w-[350px] lg:max-w-[400px] bg-white p-4 md:p-6 gap-4 rounded-xl">
            {/* Text and Response Section */}
            <div >
                <h2 className="text-3xl font-bold mb-2 text-secondary">{title}</h2>
                <p className="text-base text-textprimary mb-4">
                    {desc}
                </p>


            </div>
            {/* Image Section */}
            <div className="flex-none flex justify-center items-center overflow-hidden">
                <Image
                   src={currentImgSrc}
                    alt="Quiz Illustration"
                    width={350}
                    height={350}
                    className="object-fill"
                    onError={() => setImgSrc(placeholderImage)}
                />
            </div>


        </div>
    )
}
