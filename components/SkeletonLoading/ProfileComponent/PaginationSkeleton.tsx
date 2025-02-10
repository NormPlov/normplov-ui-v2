import React from "react";

const PaginationSkeleton = () => {
  return (
    <div className="flex gap-3 items-center justify-end mt-4 animate-pulse">
      {/* Page Info Skeleton */}
      <div className="flex items-center space-x-6 lg:space-x-8 ">
        <div className="flex w-[100px] h-5 bg-gray-300 rounded text-gray-500 items-center justify-center"></div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex items-center space-x-3">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-8 w-8 bg-gray-300 rounded-[6px]"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PaginationSkeleton;
