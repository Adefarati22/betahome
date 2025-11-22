import React from "react";

export default function LazyLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* <h1 className="relative text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 animate-[shimmer_2s_infinite]">
        ALULU
      </h1> */}
      <div className="w-16 h-16 border-4 border-(--secondary-color) border-t-transparent border-b-transparent rounded-full animate-spin"></div>
    </div>
  );
}


export function SkeletonCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="pb-9 shadow-md rounded-lg hover:shadow-lg transition-all animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="w-full h-40 bg-gray-200 rounded-t-lg" />
          
          {/* Content Skeleton */}
          <div className="px-6 mt-6">
            {/* Title Skeleton */}
            <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4" />
            
            {/* Population Skeleton */}
            <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-2" />
            
            {/* Region Skeleton */}
            <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-2" />
            
            {/* Capital Skeleton */}
            <div className="h-4 bg-gray-200 rounded-md w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
