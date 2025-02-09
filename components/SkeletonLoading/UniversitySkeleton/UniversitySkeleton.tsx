import React from "react";
import CardUniversitySkeleton from "./CardUniversitySkeleton";

export default function UniversitySkeleton() {
  return (
    <div>
      <div className="animate-pulse flex justify-center items-center bg-slate-200 lg:h-screen md:h-[400px] h-60 w-full">
        <div className="max-w-6xl mx-auto -mt-10  px-2 md:px-4  z-10 space-y-4">
          <div className="text-center flex justify-center  text-white text-sm md:text-base lg:text-lg   ">
            <div className=" flex justify-center items-center space-x-2 px-2 rounded-full bg-opacity-25">
              <div className="animate-pulse bg-slate-50 rounded-full w-[300px] lg:h-6 md:h-6 h-4"></div>
            </div>
          </div>
          <div className="text-center flex justify-center  text-white text-sm md:text-base lg:text-lg   ">
            <div className=" flex justify-center items-center space-x-2 px-2 rounded-full bg-opacity-25">
              <div className="animate-pulse bg-slate-50 rounded-full lg:w-[500px] md:w-[500px] w-[400px] lg:h-10 md:h-10 h-7"></div>
            </div>
          </div>
          <div className="text-center flex justify-center  text-white text-sm md:text-base lg:text-lg   ">
            <div className=" flex justify-center items-center space-x-2 px-2 rounded-full bg-opacity-25">
              <div className="animate-pulse bg-slate-50 rounded-full lg:w-[800px] md:w-[600px] w-[400px] lg:h-6 md:h-6 h-4"></div>
            </div>
          </div>
          <div className="text-center flex justify-center  text-white text-sm md:text-base lg:text-lg   ">
            <div className=" flex justify-center items-center space-x-2 px-2 rounded-full bg-opacity-25">
              <div className="animate-pulse bg-slate-50 rounded-full lg:w-[150px] md:w-[150px] w-[100px] h-10"></div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full h-full flex justify-center ">
        <div className=" lg:w-[80%] md:w-[85%] w-[93%] ">
          <div className="animate-pulse bg-slate-100  lg:w-[245px] lg:h-[40px] md:w-[245px] md:h-[40px] w-[200px] h-[30px] lg:mt-[50px] md:mt-[50px] mt-[30px]  rounded-xl"></div>
          <div className="animate-pulse bg-slate-100 lg:w-full lg:h-[50px] md:w-full md:h-[40px] w-full h-[30px] mt-[30px]  rounded-full"></div>
          <div className="grid lg:grid-cols-2 md:grid-cols-2  grid-cols-1 gap-4 lg:space-y-5 md:space-y-3">
            <div className="animate-pulse bg-slate-100 lg:w-full lg:h-[50px] md:w-full md:h-[40px] w-full h-[30px] lg:mt-[20px] md:mt-[10px] mt-[14px]  rounded-full"></div>
            <div className="animate-pulse bg-slate-100 lg:w-full lg:h-[50px] md:w-full md:h-[40px] w-full h-[30px] lg:mt-0 md:mt-0 mt-0  rounded-full"></div>
          </div>
          <div className="animate-pulse bg-slate-100  lg:w-[345px] lg:h-[40px] md:w-[400px] md:h-[40px] w-[320px] h-[30px] lg:mt-[50px] md:mt-[40px] mt-[40px] rounded-xl"></div>
          <CardUniversitySkeleton />
        </div>
      </div>
      <div></div>
    </div>
  );
}
