import React from "react";

const ProfileFormSkeleton = () => {
  return (
    <div className="space-y-6 mt-6">
      <div className="w-full space-y-8">
        {/* Username Skeleton */}
        <div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="mt-2 h-10 w-full bg-gray-300 rounded"></div>
        </div>

        {/* Password Skeleton */}
        <div className="flex w-full justify-between gap-4 sm:gap-5">
          <div className="w-full sm:w-4/5">
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="mt-2 h-10 w-full bg-gray-300 rounded"></div>
          </div>
          <div className="w-2/5 md:w-1/5">
            <div className="h-8 w-full bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Date of Birth and Gender Skeleton */}
        <div className="block md:flex w-full justify-between gap-5">
          <div className="w-full md:w-1/2 pb-5 md:pb-0">
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="mt-2 h-10 w-full bg-gray-300 rounded"></div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="mt-2 h-10 w-full bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Phone Number and Address Skeleton */}
        <div className="block md:flex justify-between w-full gap-5">
          <div className="w-full md:w-1/2 pb-5 md:pb-0">
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="mt-2 h-10 w-full bg-gray-300 rounded"></div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="mt-2 h-10 w-full bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Bio Skeleton */}
        <div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="mt-2 h-24 w-full bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Submit Button Skeleton */}
      <div className="mt-6 w-32">
        <div className="h-10 w-full bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ProfileFormSkeleton;
