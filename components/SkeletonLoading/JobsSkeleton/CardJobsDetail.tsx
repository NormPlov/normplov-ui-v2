import React from "react";

export default function CardJobsDetail() {
  return (
    <div className="w-full border border-gray-100 bg-white p-4 md:p-6 space-y-6 rounded-xl animate-pulse">
      <div className="grid md:grid-cols-4  w-full md:gap-4 rounded-xl ">
        {/* Image Section */}
        <div className="col-span-1 h-[100px]  flex items-start justify-between md:col-span-1  md:place-items-center">
          <div className="w-[130px] h-[100px]  bg-slate-200  rounded-xl animate-pulse"></div>
          <div className="block md:hidden">
            <div className="w-[100px] h-[40px] bg-slate-200  animate-pulse rounded-xl"></div>
          </div>
        </div>

        {/* Text Section */}
        <div className="pl-2 md:pl-0 lg:mt-0 md:mt-0 mt-3 col-span-1 md:col-span-3 space-y-2 md:flex md:justify-between md:place-items-center ">
          <div className=" space-y-2 ">
            <div className="w-[280px] h-[30px]  bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-[200px] h-[20px]  bg-slate-200 animate-pulse rounded-xl"></div>
          </div>
          <div className="hidden md:block">
            <div className="w-[130px] h-[40px]  bg-slate-200  animate-pulse rounded-xl"></div>
          </div>
        </div>
      </div>

      <div className=" justify-between flex-wrap pb-6 pl-2 lg:flex md:flex hidden">
        <div className="col-span-1 space-y-2 ">
          <div className="w-[110px] h-[16px]  bg-slate-200 animate-pulse rounded-xl"></div>
          <div className="w-[150px] h-[20px]  bg-slate-200 animate-pulse rounded-xl"></div>
        </div>

        <div className="col-span-1 space-y-2">
          <div className="w-[130px] h-[16px]  bg-slate-200 animate-pulse rounded-xl"></div>
          <div className="w-[140px] h-[20px]  bg-slate-200 animate-pulse rounded-xl"></div>
        </div>
        <div className="col-span-1 space-y-2">
          <div className="w-[110px] h-[16px]  bg-slate-200 animate-pulse rounded-xl"></div>
          <div className="w-[120px] h-[20px]  bg-slate-200 animate-pulse rounded-xl"></div>
        </div>
      </div>

      <div className="space-y-8">
        <div className=" rounded-xl bg-slate-300 bg-opacity-10 w-full h-[185px]  relative text-textprimary">
          <span className="w-[160px] h-[35px]  bg-slate-200 animate-pulse absolute left-4 -top-4 inline-flex items-center  px-2 md:px-4 py-1 text-md md:text-lg font-medium text-white rounded-xl">
            <div className="w-[140px] h-[17px] bg-white rounded-xl"></div>
          </span>
          <div className="px-4 pt-8 pb-6 rounded-b-lg space-y-3">
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
          </div>
        </div>

        {/* Job requirement */}
        <div className=" rounded-xl bg-slate-300 bg-opacity-10 w-full h-[185px]  relative text-textprimary">
          <span className="w-[160px] h-[35px]  bg-slate-200 animate-pulse absolute left-4 -top-4 inline-flex items-center  px-2 md:px-4 py-1 text-md md:text-lg font-medium text-white rounded-xl">
            <div className="w-[140px] h-[17px] bg-white rounded-xl"></div>
          </span>
          <div className="px-4 pt-8 pb-6 rounded-b-lg space-y-3">
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
          </div>
        </div>

        {/* Job Responsible */}
        <div className=" rounded-xl bg-slate-300 bg-opacity-10 w-full h-[185px]  relative text-textprimary">
          <span className="w-[160px] h-[35px]  bg-slate-200 animate-pulse absolute left-4 -top-4 inline-flex items-center  px-2 md:px-4 py-1 text-md md:text-lg font-medium text-white rounded-xl">
            <div className="w-[140px] h-[17px] bg-white rounded-xl"></div>
          </span>
          <div className="px-4 pt-8 pb-6 rounded-b-lg space-y-3">
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
          </div>
        </div>

        <div className=" rounded-xl bg-slate-300 bg-opacity-10 w-full h-[185px]  relative text-textprimary">
          <span className="w-[160px] h-[35px]  bg-slate-200 animate-pulse absolute left-4 -top-4 inline-flex items-center  px-2 md:px-4 py-1 text-md md:text-lg font-medium text-white rounded-xl">
            <div className="w-[140px] h-[17px] bg-white rounded-xl"></div>
          </span>
          <div className="px-4 pt-8 pb-6 rounded-b-lg space-y-3">
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
            <div className="w-full h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
