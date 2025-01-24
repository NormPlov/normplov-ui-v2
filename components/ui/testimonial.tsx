import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Marquee from "../ui/marquee";
import Image from "next/image";
import { useGetTestimonialQuery } from "@/redux/service/user";

interface Review {
  feedback_uuid: string;
  avatar: string;
  username: string;
  feedback: string;
}

const ReviewCard = ({
  img,
  name,
  body,
}: {
  img: string | null;
  name: string;
  body: string;
}) => {
  const [imgSrc, setImgSrc] = useState<string>(
    img
      ? `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${img}`
      : "/assets/default.png"
  );

  return (
    <figure
      className={cn(
        "relative w-[380px]  cursor-pointer overflow-hidden rounded-xl shadow-md shadow-slate-200 border-slate-50 p-4",
        // light styles
        "border-gray-950/[.1] bg-white hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="w-12  h-12">
        <Image
          className="rounded-full border border-slate-200  object-cover w-full h-full "
          width={1000}
          height={1000}
          alt=""
          src={imgSrc}
          onError={() => setImgSrc("/assets/default.png")} 
        />
        </div>
        <div className="flex flex-col">
          <figcaption className="text-md text-gray-600 font-semibold dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-base text-gray-600 line-clamp-2 overflow-hidden">{body}</blockquote>
    </figure>
  );
};

export default function Testimonial() {
  const { data, error, isLoading } = useGetTestimonialQuery(undefined);

  if (isLoading) return <p>Loading testimonials...</p>;
  if (error) return <p>Failed to load testimonials.</p>;

  const testimonials = data?.payload || [];
  const firstRow = testimonials.slice(0, testimonials.length / 2);
  const secondRow = testimonials.slice(testimonials.length / 2);

  return (
    <div className=" flex  w-full h-screen  flex-row items-center justify-center overflow-hidden rounded-lg  bg-background ">
      
      <Marquee   pauseOnHover vertical className="[--duration:15s]">
        {firstRow.map((review:Review) => (
          <ReviewCard
            key={review.feedback_uuid}
            img={review.avatar }
            name={review.username}
            body={review.feedback}
          />
        ))}
      </Marquee>
      <Marquee  pauseOnHover vertical className="[--duration:20s]">
        {secondRow.map((review:Review) => (
          <ReviewCard
            key={review.feedback_uuid}
            img={review.avatar }
            name={review.username}
            body={review.feedback}
          />
        ))}
      </Marquee>
      <Marquee  pauseOnHover vertical className="[--duration:15s]">
        {secondRow.map((review:Review) => (
          <ReviewCard
            key={review.feedback_uuid}
            img={review.avatar }
            name={review.username}
            body={review.feedback}
          />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-x-0 top-[200px] h-1/4 bg-gradient-to-b from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/4 bg-gradient-to-t from-white dark:from-background"></div>
    </div>
  );
}

