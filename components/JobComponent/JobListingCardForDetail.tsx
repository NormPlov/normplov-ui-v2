"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { BsBookmark } from "react-icons/bs";
import Lottie from "lottie-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePostBookmarkMutation } from "@/redux/service/user";
import { RootState } from "@/redux/store";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { setBookmark } from "@/redux/feature/jobs/bookmarkSlice";
import "react-toastify/dist/ReactToastify.css";
import animationData from "@/public/lottie/Success-icon.json";
import bookmark from "@/public/lottie/bookmark.json";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
type props = {
  uuid: string;
  title: string; 
  desc: string;
  image?: string;
  time?: string;
  location?: string;
  isActive?: boolean; // Optional
  salary?: string;
  created_at_days_ago?: string;
  posted_at_days_ago?: string;
  is_scraped?: boolean;
  bookmarked: boolean;
  visitor_count: number;
  category: string;
  onClick?: () => void;
};

export const JobListingCardForDetail = ({
  uuid,
  title,
  desc,
  image,
  time,
  location,
  isActive,
  salary,
  category,
  created_at_days_ago,
  posted_at_days_ago,
  bookmarked,
  is_scraped,
  onClick,
}: props) => {
  const [currentImgSrc, setImgSrc] = useState<string | StaticImageData>(
    image
      ? image.startsWith("http") // If the image is a full URL
        ? image // Use the image directly
        : `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${image}` // Prepend base URL
      : "/assets/placeholder-job.png" // Fallback to placeholder
  );

  const imgSrc =
    currentImgSrc ||
    (image
      ? image.startsWith("http") // Check if `image` is a full URL
        ? image // Use it directly
        : `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${image}` // Prepend base URL for relative paths
      : "/assets/placeholder-job.png"); // Fallback to placeholder

  const { locale } = useParams(); // Extract the current locale

  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const { toast } = useToast();
  // Using the postBookmarkMutation hook for handling the bookmark functionality
  const [postBookmark] = usePostBookmarkMutation();

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click handlers

    if (!token) {
      // If no token, redirect to login
      //toast.error("You need to log in before you can bookmark jobs.");
      router.push(`/${locale}/login`);
      return;
    }

    try {
      // Attempt to bookmark
      await postBookmark({ uuid }).unwrap();

      // Toggle bookmark state
      const newIsBookmarked = !isBookmarked;
      setIsBookmarked(newIsBookmarked);
      dispatch(setBookmark({ uuid, isBookmarked: newIsBookmarked }));

      toast({
        description: (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              <Lottie animationData={animationData} loop={true} />
            </div>
            <span className="text-base">Successfully added to bookmarks!</span>
          </div>
        ),
        variant: "default",
        className: "bg-white",
        duration: 2000,
      });
    } catch (error: unknown) {
      // Handle backend-specific error
      const errorMessage =
        (error as { data?: { detail?: string } })?.data?.detail ||
        "Failed to update bookmark. Please try again.";

      if (errorMessage.includes("Job is already bookmarked")) {
        toast({
          description: (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10">
                <Lottie animationData={bookmark} loop={true} />
              </div>
              <span className="text-base">This job is already bookmarked.</span>
            </div>
          ),
          variant: "default",
          className: "bg-white",
          duration: 2000,
        });
      } else {
        // Generic error message
        //toast.error(errorMessage, {
        //  position: "top-right",
        //  autoClose: 3000,
        //});
      }

      //console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <div
      className={`grid  lg:grid-cols-4 md:grid-cols-4 cursor-pointer ${
        isActive
          ? " border-[1.5px] border-primary  bg-green-700 bg-opacity-5"
          : "border-gray-100"
      }  w-full border  border-gray-100 bg-white lg:p-4 md:p-6 p-3  rounded-xl justify-start items-start hover:border-slate-200 hover:bg-slate-100 focus:bg-gray-100 transition-colors 
        `}
    >
      <div
        className=" lg:col-span-3 md:col-span-3   space-y-5"
        onClick={onClick}
      >
        <div className="lg:block md:block flex justify-between space-x-2">
          <div className="grid lg:grid-cols-8 md:grid-cols-8 grid-cols-9   lg:space-x-7 md:space-x-3 space-x-7 ">
            {/* Image Section */}
            <div className=" place-content-start  lg:col-span-1 md:col-span-1 col-span-1 w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[60px] lg:h-[60px]   place-items-start cursor-pointer ">
              <Image
                src={imgSrc}
                alt={title || "Job Logo"}
                className=" object-cover lg:w-[60px] md:w-[60px] w-[50px] lg:h-[60px] md:h-[60px] h-[50px]  border border-slate-200 rounded-full"
                width={2000}
                height={2000}
                onError={() => setImgSrc("/assets/placeholder-job.png")}
              />
            </div>
            <div className="lg:col-span-7 md:col-span-7 col-span-8 space-y-1">
              <h2 className="text-lg lg:text-[22px] font-semibold text-slate-700 truncate ">
                {title}
              </h2>
              <p className="text-sm lg:text-[16px] text-textprimary  line-clamp-1">
                <span className=" text-primary">{desc}</span> in{" "}
                <span className=" text-textprimary">{category}</span>
              </p>
            </div>
          </div>
          <div className="flex  justify-end  text-end lg:hidden md:hidden">
            {isBookmarked ? (
              <BsBookmarkCheckFill
                className="text-primary text-xl cursor-pointer"
                onClick={handleBookmarkClick}
              />
            ) : (
              <BsBookmark
                className="text-gray-400 text-xl cursor-pointer"
                onClick={handleBookmarkClick}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between space-x-2">
          <div className="flex space-x-2">
            <div className="rounded-2xl text-orange-500 text-opacity-90 bg-secondary  bg-opacity-10  text-xs lg:text-sm max-w-fit py-0.5 px-1 lg:px-3">
              {time || "Job Opportunity"}
            </div>
            <div className="flex justify-center items-center space-x-1  rounded-2xl text-primary bg-primary bg-opacity-10  text-xs lg:text-sm max-w-fit py-0.5 px-1 lg:px-3">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="">{location ?? "Location not available"}</div>
            </div>
            <div className=" lg:hidden md:flex hidden  rounded-2xl  justify-center items-center space-x-1 text-primary bg-primary bg-opacity-10  text-xs lg:text-sm py-0.5 max-w-fit px-1 lg:px-3">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>{salary}</div>
            </div>
          </div>
          <div className=" justify-end text-gray-600 text-sm lg:hidden md:hidden flex">
            {is_scraped ? `${created_at_days_ago}` : `${posted_at_days_ago}`}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 md:col-span-1  justify-end  lg:space-y-[60px] md:space-y-[60px] space-y-[50px]   lg:block md:block hidden ">
        {/*bookmark*/}
        <div className="flex justify-end  text-lime-300">
          {isBookmarked ? (
            <BsBookmarkCheckFill
              className="text-primary  text-xl cursor-pointer"
              onClick={handleBookmarkClick}
            />
          ) : (
            <BsBookmark
              className="text-gray-400  text-xl cursor-pointer"
              onClick={handleBookmarkClick}
            />
          )}
        </div>
        <div className="flex justify-end text-gray-600 text-sm ">
          {is_scraped ? `${created_at_days_ago}` : `${posted_at_days_ago}`}
        </div>
      </div>
    </div>
  );
};
