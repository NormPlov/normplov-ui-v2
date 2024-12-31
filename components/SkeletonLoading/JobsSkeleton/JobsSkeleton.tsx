import React from "react";

export default function JobsSkeleton() {
  return (
    <div className="w-full bg-bgPrimaryLight">
      {/* JobMainContainer */}
      <div className="text-center animate-pulse py-4 w-full h-[600px] bg-slate-100 lg:space-y-4 md:space-y-3">
        <div className="lg:w-1/6 md:w-2/6 w-3/6 mx-auto  lg:h-6 md:h-4 h-3 bg-slate-200 rounded-xl animate-pulse mt-4" />
        <div className="lg:w-2/6 md:w-3/6 w-5/6 mx-auto lg:h-10 md:h-6 h-5 bg-slate-200 rounded-xl animate-pulse mt-2" />
        <div className="lg:w-4/6 md:w-5/6 w-5/6 mx-auto lg:h-6 md:h-4 h-3 bg-slate-200 rounded-xl animate-pulse mt-2" />
        <div className="lg:hidden md:hidden block lg:w-4/6 md:w-5/6 w-5/6 mx-auto lg:h-6 md:h-4 h-3 bg-slate-200 rounded-xl animate-pulse mt-2" />
        <div className="lg:hidden md:hidden block lg:w-4/6 md:w-5/6 w-5/6 mx-auto lg:h-6 md:h-4 h-3 bg-slate-200 rounded-xl animate-pulse mt-2" />
        <div className="lg:w-1/3 md:w-2/3 mx-auto lg:h-6 md:h-4 bg-slate-200 rounded-xl animate-pulse lg:mt-2 md:-mt-4" />
        <div className=" lg:w-2/5 md:w-4/5 w-[370px] mx-auto lg:h-12 md:h-9 h-8 bg-slate-200 rounded-full animate-pulse mt-2 flex justify-between items-center">
          <div className="lg:w-1/5 md:w-1/5 w-[80px]  ml-4   flex justify-start lg:h-4 md:h-4 h-3 bg-gray-100 rounded-full animate-pulse" />
          <div className="lg:w-10 md:w-8 w-[25px]  mr-1  lg:h-10 md:h-8 h-[25px] bg-gray-100 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-10 lg:py-12 space-y-4 lg:space-y-6">
        <div className="md:text-xl lg:h-8 md:h-6 h-5 lg:w-[140px] md:w-[140px] w-[100px] bg-slate-100  rounded-xl lg:text-2xl font-semibold text-textprimary"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-textprimary">
          {/* Category Filter */}
          <div className="h-12 bg-slate-100 border border-slate-100 rounded-xl animate-pulse"></div>

          {/* Location Filter */}
          <div className="h-12 bg-slate-100 border border-slate-100 rounded-xl animate-pulse"></div>

          {/* Job Type Filter */}
          <div className="h-12 bg-slate-100 border border-slate-100 rounded-xl animate-pulse"></div>

          <div className="h-12 bg-slate-100 border border-slate-100 rounded-xl animate-pulse"></div>
        </div>
      </div>

      {/* Job Searching */}
      <div className="max-w-7xl mx-auto px-4 pb-4 md:pb-6">
        <div className="md:text-xl lg:h-8 md:h-6 h-5 lg:w-[140px] md:w-[140px] w-[100px] bg-slate-100 rounded-xl lg:text-2xl font-semibold text-textprimary"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 mt-6">
          <div className="lg:col-span-8 space-y-4  ">
            {/* Job Listing Card Skeleton */}
            <div className="lg:h-32 md:h-32 h-[110px] bg-white border flex border-slate-100 rounded-xl animate-pulse">
              <div className="col-span-1 ml-3 flex justify-center items-center place-content-center place-items-center">
                <div className="lg:w-32 md:w-32 w-[90px] lg:h-24 md:h-24 h-[70px] bg-slate-200 animate-pulse rounded-xl"></div>
              </div>

              {/* Text Section */}
              <div className="col-span-3 space-y-2 ">
                <div className="lg:w-60 md:w-60 w-[200px] lg:h-6 md:h-6 h-[20px] bg-slate-200 animate-pulse rounded-xl mt-5 ml-6 mb-3"></div>
                <div className="lg:w-96 md:w-60 w-[210px]  lg:h-4 md:h-6 h-[14px] bg-slate-200 animate-pulse rounded-xl  ml-6 "></div>
                <div className="flex flex-wrap lg:gap-2 md:gap-2 gap-1">
                  <div className="rounded-[8px] lg:w-[130px] md:w-[130px] w-[100px]  lg:h-5 md:h-5 h-[14px] mt-2 ml-6 mb-3 bg-slate-200 "></div>
                  <div className="rounded-[8px] lg:w-[130px] md:w-[130px] w-[90px]  lg:h-5 md:h-5 h-[14px] mt-2 ml-6 lg:mb-3 md:mbb-3 mb-0 bg-slate-200 "></div>
                </div>
              </div>
            </div>
            <div className="lg:h-32 md:h-32 h-[110px] bg-white border flex border-slate-100 rounded-xl animate-pulse">
              <div className="col-span-1 ml-3 flex justify-center items-center place-content-center place-items-center">
                <div className="lg:w-32 md:w-32 w-[90px] lg:h-24 md:h-24 h-[70px] bg-slate-200 animate-pulse rounded-xl"></div>
              </div>

              {/* Text Section */}
              <div className="col-span-3 space-y-2 ">
                <div className="lg:w-60 md:w-60 w-[200px] lg:h-6 md:h-6 h-[20px] bg-slate-200 animate-pulse rounded-xl mt-5 ml-6 mb-3"></div>
                <div className="lg:w-96 md:w-60 w-[210px]  lg:h-4 md:h-6 h-[14px] bg-slate-200 animate-pulse rounded-xl  ml-6 "></div>
                <div className="flex flex-wrap lg:gap-2 md:gap-2 gap-1">
                  <div className="rounded-[8px] lg:w-[130px] md:w-[130px] w-[100px]  lg:h-5 md:h-5 h-[14px] mt-2 ml-6 mb-3 bg-slate-200 "></div>
                  <div className="rounded-[8px] lg:w-[130px] md:w-[130px] w-[90px]  lg:h-5 md:h-5 h-[14px] mt-2 ml-6 lg:mb-3 md:mbb-3 mb-0 bg-slate-200 "></div>
                </div>
              </div>
            </div>
            <div className="lg:h-32 md:h-32 h-[110px] bg-white border flex border-slate-100 rounded-xl animate-pulse">
              <div className="col-span-1 ml-3 flex justify-center items-center place-content-center place-items-center">
                <div className="lg:w-32 md:w-32 w-[90px] lg:h-24 md:h-24 h-[70px] bg-slate-200 animate-pulse rounded-xl"></div>
              </div>

              {/* Text Section */}
              <div className="col-span-3 space-y-2 ">
                <div className="lg:w-60 md:w-60 w-[200px] lg:h-6 md:h-6 h-[20px] bg-slate-200 animate-pulse rounded-xl mt-5 ml-6 mb-3"></div>
                <div className="lg:w-96 md:w-60 w-[210px]  lg:h-4 md:h-6 h-[14px] bg-slate-200 animate-pulse rounded-xl  ml-6 "></div>
                <div className="flex flex-wrap lg:gap-2 md:gap-2 gap-1">
                  <div className="rounded-[8px] lg:w-[130px] md:w-[130px] w-[100px]  lg:h-5 md:h-5 h-[14px] mt-2 ml-6 mb-3 bg-slate-200 "></div>
                  <div className="rounded-[8px] lg:w-[130px] md:w-[130px] w-[90px]  lg:h-5 md:h-5 h-[14px] mt-2 ml-6 lg:mb-3 md:mbb-3 mb-0 bg-slate-200 "></div>
                </div>
              </div>
            </div>
            <div className="lg:h-32 md:h-32 h-[110px] bg-white border flex border-slate-100 rounded-xl animate-pulse">
              <div className="col-span-1 ml-3 flex justify-center items-center place-content-center place-items-center">
                <div className="lg:w-32 md:w-32 w-[90px] lg:h-24 md:h-24 h-[70px] bg-slate-200 animate-pulse rounded-xl"></div>
              </div>

              {/* Text Section */}
              <div className="col-span-3 space-y-2 ">
                <div className="lg:w-60 md:w-60 w-[200px] lg:h-6 md:h-6 h-[20px] bg-slate-200 animate-pulse rounded-xl mt-5 ml-6 mb-3"></div>
                <div className="lg:w-96 md:w-60 w-[210px]  lg:h-4 md:h-6 h-[14px] bg-slate-200 animate-pulse rounded-xl  ml-6 "></div>
                <div className="flex flex-wrap lg:gap-2 md:gap-2 gap-1">
                  <div className="rounded-[8px] lg:w-[130px] md:w-[130px] w-[100px]  lg:h-5 md:h-5 h-[14px] mt-2 ml-6 mb-3 bg-slate-200 "></div>
                  <div className="rounded-[8px] lg:w-[130px] md:w-[130px] w-[90px]  lg:h-5 md:h-5 h-[14px] mt-2 ml-6 lg:mb-3 md:mbb-3 mb-0 bg-slate-200 "></div>
                </div>
              </div>
            </div>

            {/* Pagination Skeleton */}
            <div className=" flex justify-end rounded-xl  mt-3">
              <div className="lg:h-8 md:h-8 h-6 lg:w-2/6 md:w-2/6 w-3/6  bg-slate-100  rounded-xl animate-pulse " />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-0">
              {/* Job Banner Skeleton */}
              <div className="w-full flex-none border animate-pulse border-slate-100 md:flex md:items-center md:flex-row lg:flex-col bg-white p-4 md:p-6 gap-4 rounded-xl">
                {/* Image Section */}
                <div className="flex justify-center items-center overflow-hidden">
                  <div className="lg:h-[350px] md:h-[250px] h-[200px] w-96  bg-slate-100  rounded-xl animate-pulse "></div>
                </div>
                <div className=" lg:flex-none lg:mt-0 md:mt-0 mt-4">
                  <div className="h-6 lg:w-96 md:w-96 bg-slate-100  rounded-xl animate-pulse mb-2 text-textprimary"></div>
                  <div className=" h-4 lg:w-96 md:w-96  bg-slate-100  rounded-xl animate-pulse mb-4"></div>
                  <div className=" h-4 lg:w-96 md:w-96  bg-slate-100  rounded-xl animate-pulse mb-4"></div>
                  <div className=" h-10 lg:w-96 md:w-96  bg-slate-100  rounded-full animate-pulse "></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
