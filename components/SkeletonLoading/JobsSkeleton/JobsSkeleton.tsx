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
            <div className="grid grid-cols-5 w-full border  border-gray-100 bg-white p-4 gap-4 rounded-xl justify-start items-start  hover:bg-slate-100 focus:bg-gray-100 transition-colors">
              <div className="col-span-1 lg:ml-3 md:ml-3 ml-0 flex justify-center items-center place-content-center place-items-center">
                <div className="lg:w-[150px] md:w-32 w-full lg:h-24 md:h-24 h-10 bg-slate-200 animate-pulse rounded-xl"></div>
              </div>

              {/* Text Section */}
              <div className="col-span-3  lg:space-y-3 md:space-y-4 space-y-2 cursor-pointer">
                <div className="lg:w-60 md:w-60 w-[150px] lg:h-6 md:h-5 h-[20px] bg-slate-200 animate-pulse rounded-xl"></div>
                <div className="lg:w-80 md:w-60 w-[180px] lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                {/* create at */}
                <div className="flex flex-wrap gap-2  ">
                  <div className="lg:w-20 md:w-20 w-[60px] lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                  <div className="lg:w-32 md:w-20 w-[70px] lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                  <div className="lg:w-32 md:w-20 w-[40px] flex lg:hidden md:hidden lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                </div>
                <div className="flex space-x-6">
                  <div className="flex justify-start items-center space-x-2">
                    <div className="lg:w-6 md:w-5 w-5 lg:h-6 md:h-5 h-5 bg-slate-200 animate-pulse rounded-xl"></div>
                    <div className="lg:w-40 md:w-[150px] w-[200px] lg:h-4 md:h-5 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                  </div>
                  <div className=" justify-start items-center space-x-2 hidden lg:flex md:flex ">
                    <div className="lg:w-6 md:w-5 w-[200px] lg:h-6 md:h-5 h-[20px] bg-slate-200 animate-pulse rounded-xl"></div>
                    <div className="lg:w-40 md:w-[150px] w-[200px] lg:h-4 md:h-5 h-[20px] bg-slate-200 animate-pulse rounded-xl"></div>
                  </div>
                </div>
              </div>
              <div className="col-span-1  space-y-[65px] ">
                {/*bookmark*/}
                <div className="flex justify-end text-lime-300">
                  <div className="lg:w-6 md:w-6 w-6 lg:h-6 md:h-6 h-6 bg-slate-200 animate-pulse rounded-xl"></div>
                </div>
              </div>
            </div>
            {/* Job Listing Card Skeleton */}
            <div className="grid grid-cols-5 w-full border  border-gray-100 bg-white p-4 gap-4 rounded-xl justify-start items-start  hover:bg-slate-100 focus:bg-gray-100 transition-colors">
              <div className="col-span-1 lg:ml-3 md:ml-3 ml-0 flex justify-center items-center place-content-center place-items-center">
                <div className="lg:w-[150px] md:w-32 w-full lg:h-24 md:h-24 h-10 bg-slate-200 animate-pulse rounded-xl"></div>
              </div>

              {/* Text Section */}
              <div className="col-span-3  lg:space-y-3 md:space-y-4 space-y-2 cursor-pointer">
                <div className="lg:w-60 md:w-60 w-[150px] lg:h-6 md:h-5 h-[20px] bg-slate-200 animate-pulse rounded-xl"></div>
                <div className="lg:w-80 md:w-60 w-[180px] lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                {/* create at */}
                <div className="flex flex-wrap gap-2  ">
                  <div className="lg:w-20 md:w-20 w-[60px] lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                  <div className="lg:w-32 md:w-20 w-[70px] lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                  <div className="lg:w-32 md:w-20 w-[40px] flex lg:hidden md:hidden lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                </div>
                <div className="flex space-x-6">
                  <div className="flex justify-start items-center space-x-2">
                    <div className="lg:w-6 md:w-5 w-5 lg:h-6 md:h-5 h-5 bg-slate-200 animate-pulse rounded-xl"></div>
                    <div className="lg:w-40 md:w-[150px] w-[200px] lg:h-4 md:h-5 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                  </div>
                  <div className=" justify-start items-center space-x-2 hidden lg:flex md:flex ">
                    <div className="lg:w-6 md:w-5 w-[200px] lg:h-6 md:h-5 h-[20px] bg-slate-200 animate-pulse rounded-xl"></div>
                    <div className="lg:w-40 md:w-[150px] w-[200px] lg:h-4 md:h-5 h-[20px] bg-slate-200 animate-pulse rounded-xl"></div>
                  </div>
                </div>
              </div>
              <div className="col-span-1  space-y-[65px] ">
                {/*bookmark*/}
                <div className="flex justify-end text-lime-300">
                  <div className="lg:w-6 md:w-6 w-6 lg:h-6 md:h-6 h-6 bg-slate-200 animate-pulse rounded-xl"></div>
                </div>
              </div>
            </div>
            {/* Job Listing Card Skeleton */}
            <div className="grid grid-cols-5 w-full border  border-gray-100 bg-white p-4 gap-4 rounded-xl justify-start items-start  hover:bg-slate-100 focus:bg-gray-100 transition-colors">
              <div className="col-span-1 lg:ml-3 md:ml-3 ml-0 flex justify-center items-center place-content-center place-items-center">
                <div className="lg:w-[150px] md:w-32 w-full lg:h-24 md:h-24 h-10 bg-slate-200 animate-pulse rounded-xl"></div>
              </div>

              {/* Text Section */}
              <div className="col-span-3  lg:space-y-3 md:space-y-4 space-y-2 cursor-pointer">
                <div className="lg:w-60 md:w-60 w-[150px] lg:h-6 md:h-5 h-[20px] bg-slate-200 animate-pulse rounded-xl"></div>
                <div className="lg:w-80 md:w-60 w-[180px] lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                {/* create at */}
                <div className="flex flex-wrap gap-2  ">
                  <div className="lg:w-20 md:w-20 w-[60px] lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                  <div className="lg:w-32 md:w-20 w-[70px] lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                  <div className="lg:w-32 md:w-20 w-[40px] flex lg:hidden md:hidden lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                </div>
                <div className="flex space-x-6">
                  <div className="flex justify-start items-center space-x-2">
                    <div className="lg:w-6 md:w-5 w-5 lg:h-6 md:h-5 h-5 bg-slate-200 animate-pulse rounded-xl"></div>
                    <div className="lg:w-40 md:w-[150px] w-[200px] lg:h-4 md:h-5 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                  </div>
                  <div className=" justify-start items-center space-x-2 hidden lg:flex md:flex ">
                    <div className="lg:w-6 md:w-5 w-[200px] lg:h-6 md:h-5 h-[20px] bg-slate-200 animate-pulse rounded-xl"></div>
                    <div className="lg:w-40 md:w-[150px] w-[200px] lg:h-4 md:h-5 h-[20px] bg-slate-200 animate-pulse rounded-xl"></div>
                  </div>
                </div>
              </div>
              <div className="col-span-1  space-y-[65px] ">
                {/*bookmark*/}
                <div className="flex justify-end text-lime-300">
                  <div className="lg:w-6 md:w-6 w-6 lg:h-6 md:h-6 h-6 bg-slate-200 animate-pulse rounded-xl"></div>
                </div>
              </div>
            </div>

            {/* Job Listing Card Skeleton */}
            <div className="grid grid-cols-5 w-full border  border-gray-100 bg-white p-4 gap-4 rounded-xl justify-start items-start  hover:bg-slate-100 focus:bg-gray-100 transition-colors">
              <div className="col-span-1 lg:ml-3 md:ml-3 ml-0 flex justify-center items-center place-content-center place-items-center">
                <div className="lg:w-[150px] md:w-32 w-full lg:h-24 md:h-24 h-10 bg-slate-200 animate-pulse rounded-xl"></div>
              </div>

              {/* Text Section */}
              <div className="col-span-3  lg:space-y-3 md:space-y-4 space-y-2 cursor-pointer">
                <div className="lg:w-60 md:w-60 w-[150px] lg:h-6 md:h-5 h-[20px] bg-slate-200 animate-pulse rounded-xl"></div>
                <div className="lg:w-80 md:w-60 w-[180px] lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                {/* create at */}
                <div className="flex flex-wrap gap-2  ">
                  <div className="lg:w-20 md:w-20 w-[60px] lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                  <div className="lg:w-32 md:w-20 w-[70px] lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                  <div className="lg:w-32 md:w-20 w-[40px] flex lg:hidden md:hidden lg:h-5 md:h-4 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                </div>
                <div className="flex space-x-6">
                  <div className="flex justify-start items-center space-x-2">
                    <div className="lg:w-6 md:w-5 w-5 lg:h-6 md:h-5 h-5 bg-slate-200 animate-pulse rounded-xl"></div>
                    <div className="lg:w-40 md:w-[150px] w-[200px] lg:h-4 md:h-5 h-[15px] bg-slate-200 animate-pulse rounded-xl"></div>
                  </div>
                  <div className=" justify-start items-center space-x-2 hidden lg:flex md:flex ">
                    <div className="lg:w-6 md:w-5 w-[200px] lg:h-6 md:h-5 h-[20px] bg-slate-200 animate-pulse rounded-xl"></div>
                    <div className="lg:w-40 md:w-[150px] w-[200px] lg:h-4 md:h-5 h-[20px] bg-slate-200 animate-pulse rounded-xl"></div>
                  </div>
                </div>
              </div>
              <div className="col-span-1  space-y-[65px] ">
                {/*bookmark*/}
                <div className="flex justify-end text-lime-300">
                  <div className="lg:w-6 md:w-6 w-6 lg:h-6 md:h-6 h-6 bg-slate-200 animate-pulse rounded-xl"></div>
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
