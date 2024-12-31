"use client";
import React from "react";


// Button component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    className={`px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${className}`}
    ref={ref}
    {...props}
  />
));
Button.displayName = "Button";

// Card component
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={`bg-white animate-pulse rounded-xl shadow-sm ${className}`}
    ref={ref}
    {...props}
  />
));
Card.displayName = "Card";

// CardContent component
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={`lg:p-6 md:p-4 p-3 ${className}`} ref={ref} {...props} />
));
CardContent.displayName = "CardContent";

// Button component
const Button1 = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`inline-flex items-center bg-green-50 justify-between rounded-md  px-4 py-2 text-sm font-medium text-gray-700   focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
));
Button1.displayName = "Button1";

export default function UniversityDetailSkeleton() {
  return (
    <div className="min-h-screen bg-bglight">
      {/* Header */}
      <header className="relative">
        <div className="animate-pulse lg:w-full bg-slate-200 lg:h-[300px] md:w-full md:h-[200px] w-full h-[100px] overflow-hidden"></div>
        {/* screen laptop and ipad */}
        <div className=" hidden md:block lg:block  container mx-auto px-4  relative lg:-mt-12 md:-mt-12 -mt-6">
          <div className="bg-slate-300 animate-pulse  bg-opacity-30 lg:w-auto lg:h-[290px] md:w-auto md:h-[230px] w-auto h-[200px] backdrop-blur-lg border rounded-xl lg:p-6 md:p-6 p-3 shadow-sm flex  flex-row md:flex-row items-center lg:gap-6 md:gap-6 gap-2">
            <div className="animate-pulse bg-slate-50 lg:w-[240px] lg:h-[240px] md:w-[140px] md:h-[140px] w-[240px]  h-[240px] rounded-full"></div>
            <div className="text-center md:text-left">
              <div className="animate-pulse lg:w-[700px] lg:h-[50px] md:w-[400px] md:h-[36px] rounded-xl bg-slate-50 lg:text-5xl md:text-2xl text-lg font-bold text-textprimary mb-3"></div>
              <div className="animate-pulse lg:w-[700px] lg:h-[30px] md:w-[400px] md:h-[20px] rounded-xl bg-slate-50 text-gray-600 lg:text-3xl md:text-xl text-sm mb-4"></div>
              <div className="animate-pulse w-[700px] h-[30px] md:w-[400px] md:h-[20px] rounded-xl bg-slate-50 text-textprimary lg:text-2xl md:text-xl text-sm mb-4"></div>
              <button className="animate-pulse lg:w-[200px] lg:h-[40px] md:w-[170px] md:h-[40px] rounded-xl bg-slate-50  lg:text-lg md:text-lg text-sm text-white py-2 px-6   transition-all"></button>
            </div>
          </div>
        </div>

        {/* screen phone */}
        <div className="block  md:hidden lg:hidden  container mx-auto px-4  relative lg:-mt-12 md:-mt-12 -mt-6">
          <div className="bg-slate-300 animate-pulse  bg-opacity-30 lg:w-auto lg:h-[290px] md:w-auto md:h-[230px] w-auto h-[140px] backdrop-blur-lg border rounded-xl lg:p-6 md:p-6 p-3 shadow-sm lg:flex md:flex  flex-row md:flex-row items-center lg:gap-6 md:gap-6 gap-2">
            <div className="flex">
              <div className="animate-pulse bg-slate-50  w-[60px]  h-[60px] rounded-full "></div>
              <div className="text-center md:text-left ml-3 space-y-2">
                <div className="animate-pulse bg-blue-50 w-[200px] h-[20px] rounded-xl"></div>
                <div className="animate-pulse bg-blue-50 w-[200px] h-[20px] rounded-xl"></div>
              </div>
            </div>
            <div className="flex justify-between  items-center">
              <div className="animate-pulse bg-slate-50 w-[230px] h-[16px] rounded-xl"></div>
              <button className=" bg-slate-50 animate-pulse w-[80px] h-[40px] lg:text-lg md:text-lg text-sm text-white lg:py-2 lg:px-6 md:py-2 md:px-6 py-2 px-3 rounded-xl hover:bg-secondary transition-all"></button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4  lg:py-8 md:py-4 py-2.5 grid grid-cols-1 md:grid-cols-3 lg:gap-8 md:gap-4 gap-2.5">
        {/* Sidebar */}
        <div className="md:col-span-1 lg:space-y-3 md:space-y-2 space-y-2.5">
          <Card>
            <CardContent>
              <div className="animate-pulse bg-slate-100 w-[200px] h-[26px]  rounded-xl font-bold text-textprimary text-xl mb-4"></div>
              <div className="aspect-[4/3] rounded-xl bg-gray-100 mb-4">
                {/* Map placeholder */}
                <div className="animate-pulse w-full h-full bg-slate-100 flex items-center justify-center text-gray-400"></div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="animate-pulse bg-slate-100 w-full h-[20px] rounded-xl"></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="animate-pulse bg-slate-100 w-full h-[20px] rounded-xl"></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="animate-pulse bg-slate-100 w-full h-[20px] rounded-xl"></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="animate-pulse bg-slate-100 w-full h-[20px] rounded-xl"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="animate-pulse bg-slate-100  w-[100px] h-[26px]  rounded-xl font-bold text-xl text-primary mb-4"></div>
              <div className="space-y-1.5 text-md text-gray-600">
                <div className="animate-pulse bg-slate-100  w-full h-[18px]  rounded-xl"></div>
                <div className="animate-pulse bg-slate-100  w-full h-[18px]  rounded-xl"></div>
                <div className="animate-pulse bg-slate-100  w-full h-[18px]  rounded-xl"></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="animate-pulse bg-slate-100  w-[100px] h-[26px]  rounded-xl font-bold text-xl text-primary mb-4"></div>
              <div className="space-y-1.5 text-md text-gray-600">
                <div className="animate-pulse bg-slate-100  w-full h-[18px]  rounded-xl"></div>
                <div className="animate-pulse bg-slate-100  w-full h-[18px]  rounded-xl"></div>
                <div className="animate-pulse bg-slate-100  w-full h-[18px]  rounded-xl"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Card>
            <CardContent>
              <div className="animate-pulse bg-slate-100  w-[100px] h-[26px]  rounded-xl font-bold text-xl text-textprimary mb-4"></div>
              <div className="space-y-1.5 lg:text-lg md:text-lg text-md text-gray-600">
                <div className="animate-pulse bg-slate-100  w-full h-[18px]  rounded-xl"></div>
                <div className="animate-pulse bg-slate-100  w-full h-[18px]  rounded-xl"></div>
                <div className="animate-pulse bg-slate-100  w-full h-[18px]  rounded-xl"></div>
                <div className="animate-pulse bg-slate-100  w-full h-[18px]  rounded-xl"></div>
              </div>
            </CardContent>
          </Card>
          <div className="bg-white lg:p-6 animate-pulse md:p-4 p-3  rounded-xl shadow-sm mt-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="animate-pulse bg-slate-100  w-[200px] h-[26px] rounded-xl lg:text-2xl md:text-xl text-xl font-bold text-textprimary"></div>
              <span className="animate-pulse bg-slate-100  w-[200px] h-[20px] rounded-xl text-orange-500 font-medium"></span>
            </div>

            <div className="relative  grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 ">
              {/* Degree Filter */}
              <div className="lg:p-6 md:p-4 p-3">
                <div className="animate-pulse bg-slate-100  w-[150px] h-[20px] rounded-xl font-bold text-textprimary text-xl mb-4"></div>
                <div className="space-y-2 animate-pulse bg-slate-100  w-full h-[30px] rounded-xl"></div>
              </div>
              {/* Faculty Filter */}
              <div className="lg:p-6 md:p-4 p-3">
                <div className="animate-pulse bg-slate-100  w-[150px] h-[20px] rounded-xl font-bold text-textprimary text-xl mb-4"></div>
                <div className="space-y-2 animate-pulse bg-slate-100  w-full h-[30px] rounded-xl"></div>
              </div>
            </div>
          </div>
          {/* Main Content - Courses */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            {[...new Array(6)].map((pr) => (
              <div key={pr} className="">
                <div className="animate-pulse bg-white rounded-xl shadow-sm p-4">
                  <div className="animate-pulse bg-slate-100 lg:w-[300px] md:w-[200px] h-[20px] rounded-xl text-lg font-semibold text-textprimary"></div>
                  <div className="animate-pulse bg-slate-100 w-full h-[16px] mt-2 rounded-xl text-md text-gray-600"></div>
                  <div className="animate-pulse bg-slate-100 w-full h-[16px] mt-2 rounded-xl text-md text-gray-600"></div>
                  <div className="animate-pulse bg-slate-100 w-full h-[16px] mt-2 rounded-xl text-md text-gray-600"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
