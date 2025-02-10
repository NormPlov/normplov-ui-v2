import React from "react";

const TestListSkeleton = () => {
  const skeletonItems = Array.from({ length: 6 }); // Generate 6 skeleton items for placeholders

  return (
    <div className="pt-4 lg:pt-0">
      <h1 className="hidden lg:flex text-3xl pb-3 text-primary font-bold w-full text-left">
      <div className="w-32 h-8 bg-gray-300 rounded-[8px]"></div>
      </h1>
      <div className="grid gap-5 lg:gap-6 grid-cols-1 mb-5">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-white rounded-xl w-full animate-pulse"
          >
            {/* Icon Skeleton */}
            <div className="flex items-center">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-300"></div>
              <div className="ml-4 space-y-2">
                {/* Title Skeleton */}
                <div className="w-36 h-5 bg-gray-300 rounded"></div>
                {/* Assessment Type Skeleton */}
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                {/* Date Skeleton */}
                <div className="w-20 h-3 bg-gray-300 rounded"></div>
              </div>
            </div>
            {/* Dropdown Skeleton */}
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestListSkeleton;
