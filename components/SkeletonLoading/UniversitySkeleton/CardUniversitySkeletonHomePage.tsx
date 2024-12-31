import React from "react";

export default function CardUniversitySkeletonHomePage() {
  return (
    <div className="">
      <div
        className={`flex  bg-slate-50 lg:p-6 md:p-6 p-2 lg:h-48 md:h-48 h-32 w-full flex-row items-center  border border-gray-100 shadow-sm rounded-2xl  md:flex-row  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 `}
      >
        <div className="animate-pulse bg-slate-100   lg:w-[150px] lg:h-[150px] md:w-[150px] md:h-[150px] w-[100px] h-[100px] rounded-full"></div>
        <div className="flex  w-[75%] lg:ml-4 md:ml-4 ml-2 flex-col justify-between  lg:p-2 md:p-2 p-0 leading-normal truncate">
          <h1 className="animate-pulse lg:w-[300px] lg:h-[28px] md:w-[300px] md:h-[28px] w-[200px] h-[20px] bg-slate-100 rounded-xl  lg:mb-3 md:mb-2  mb-1.5 text-lg md:text-2xl lg:text-2xl  font-bold tracking-tight text-textprimary dark:text-white truncate"></h1>
          <h2 className="animate-pulse lg:w-[380px] lg:h-[20px] md:w-[380px] md:h-[20px] w-[240px] h-[16px] bg-slate-100 rounded-xl lg:mb-3 md:mb-2 mb-1.5 text-sm md:text-xl lg:text-xl  text-gray-600 truncate"></h2>
          <div className="flex space-x-2">
            <p className="animate-pulse  lg:w-[430px] lg:h-[20px] md:w-[470px] md:h-[20px] w-[240px] h-[16px] bg-slate-100 rounded-xl lg:mb-3  md:mb-2 mb-1.5 text-sm md:text-lg lg:text-lg font-normal text-gray-600 dark:text-gray-400 truncate"></p>
          </div>
          <div className="animate-pulse lg:w-[150px] lg:h-[20px] md:w-[150px] md:h-[20px] w-[240px] h-[16px] bg-slate-100 rounded-xl lg:mb-3 md:mb-2 mb-2 text-sm md:text-lg block md:hidden lg:hidden  lg:text-lg text-textprimary"></div>
          <div className="flex justify-between items-center ">
            <div className="animate-pulse lg:w-[300px] lg:h-[20px] md:w-[300px] md:h-[20px] w-[200px] h-[16px] bg-slate-100 rounded-xl text-sm md:text-lg hidden md:flex lg:flex lg:text-lg text-textprimary"></div>
            <div className=" items-center hidden md:flex lg:flex">
              <div className="animate-pulse lg:w-[110px] lg:h-[20px] md:w-[110px] md:h-[20px] w-[70px] h-[16px] bg-slate-100 rounded-xl text-sm md:text-lg lg:text-lg text-primary "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
