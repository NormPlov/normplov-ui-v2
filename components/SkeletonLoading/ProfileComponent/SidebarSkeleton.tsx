import React from "react";
import { Menu, X } from "lucide-react"; // Keep the icons for the skeleton structure

const SideBarSkeleton = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <div className="flex flex-col h-fit">
      {/* Mobile Header Skeleton */}
      <div className="bg-white pb-4 lg:hidden flex justify-between items-center w-full p-4 text-white rounded-[8px] sticky top-14 left-0 right-0 z-50">
        <button className="flex items-center space-x-2 text-lg font-bold p-3 rounded-[8px] bg-gray-300 animate-pulse">
          <Menu className="w-6 h-6 text-gray-500" />
        </button>
        <div className="w-40 h-6 bg-gray-300 animate-pulse rounded"></div>
      </div>

      {/* Sidebar Skeleton */}
      <div className={`lg:hidden`}>
        <aside
          className={`w-96 xl:w-[420px] rounded-r-xl bg-gray-100 p-8 flex flex-col justify-between fixed top-0 left-0 z-50 transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Icon */}
          <div className="lg:hidden flex justify-end">
            <button className="text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Profile Picture Skeleton */}
          <div className="flex justify-center">
            <div className="relative border-2 border-gray-300 bg-gray-200 w-28 h-28 rounded-full p-2 animate-pulse"></div>
          </div>
          <div className="text-center mt-2">
            <div className="w-24 h-4 bg-gray-300 animate-pulse rounded mx-auto"></div>
            <div className="w-32 h-4 bg-gray-300 animate-pulse rounded mt-2 mx-auto"></div>
          </div>

          {/* Menu Skeleton */}
          <div className="space-y-5 mt-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md animate-pulse"
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex-1 h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>

          {/* Logout Skeleton */}
          <div className="pt-6 mt-6 bg-white">
            <div className="flex items-center space-x-4 p-4 rounded-lg shadow-md animate-pulse">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </aside>
      </div>

      {/* Desktop Sidebar Skeleton */}
      <div className="hidden lg:block bg-white rounded-xl">
        <aside
          className={`h-screen bg-gray-50 border p-6 flex flex-col justify-between rounded-[8px]`}
        >
          {/* Profile Picture Skeleton */}
          <div className="flex justify-center">
            <div className="relative border-1 border-gray-200 bg-gray-200 w-28 h-28 rounded-full p-2 animate-pulse"></div>
          </div>
          <div className="text-center mt-2">
            <div className="w-24 h-4 bg-gray-200 animate-pulse rounded mx-auto"></div>
            <div className="w-32 h-4 bg-gray-200 animate-pulse rounded mt-2 mx-auto"></div>
          </div>

          {/* Menu Skeleton */}
          <div className="space-y-5 mt-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm animate-pulse"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Logout Skeleton */}
          <div className="pt-6 mt-6 bg-white rounded-xl ">
            <div className="flex items-center space-x-4 p-4 rounded-xl shadow-sm animate-pulse">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </aside>
      </div>

      {/* Backdrop for Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-300 opacity-50 md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      />
    </div>
  );
};

export default SideBarSkeleton;
