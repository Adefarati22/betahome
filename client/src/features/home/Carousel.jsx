import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { MapPin } from "lucide-react";
import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "@/api/property";
import LazyLoader from "@/components/LazyLoader";
import ErrorAlert from "@/components/ErrorAlert";

export default function Carousel() {
  const scrollRef = useRef(null);

  const scrollFn = (direction) => {
    const { current } = scrollRef;
    if (!current) return;
    current.scrollLeft += direction === "left" ? -700 : 700;
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["carouselProperties"],
    queryFn: () => getAllProperties(new URLSearchParams(), null),
  });

  const properties = data?.data?.properties || [];

  return (
    <div className="mt-10 relative w-full">
      <h1 className="text-center text-xl md:text-5xl font-bold text-black">
        Discover Our Popular Properties
      </h1>

      <div className="relative mt-6">
        {isPending && <LazyLoader />}
        {isError && <ErrorAlert error={error}/>}

        <div
          ref={scrollRef}
          className="mx-auto flex gap-6 overflow-x-auto scroll-smooth scrollbarHide py-4"
        >
          {properties.length > 0 ? (
            properties.map((prop) => (
              <div
                className="relative min-w-[220px] lg:min-w-[260px] rounded-xl overflow-hidden shadow"
                key={prop._id}
              >
                <img
                  src={prop.images || "no image to display"}
                  alt={prop.title}
                  className="w-full h-[350px] object-cover"
                />

                <div className="absolute w-full bottom-0 left-1/2 -translate-x-1/2 backdrop-blur-xs text-white p-3 rounded-md space-y-4">
                  <h3 className="text-lg font-semibold">{prop.title}</h3>
                  <p className="text-sm">₦{prop.price?.toLocaleString()}</p>

                  <div className="flex gap-2">
                    <span className="px-2 border-r">{prop.bedrooms} bed</span>
                    <span className="px-2 border-r">{prop.bathrooms} bath</span>
                    <span>{prop.sqft} sqft</span>
                  </div>

                  <p className="flex items-center gap-1 text-sm mt-1">
                    <MapPin size={15} />
                    {prop.location}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full">No properties available</p>
          )}
        </div>

        {/* Arrows */}
        <div className="block">
          <button
            className="absolute top-[40%] left-0 bg-gray-300 text-white rounded-full p-3 shadow hover:bg-green-500 cursor-pointer transition-colors"
            onClick={() => scrollFn("left")}
          >
            <RiArrowLeftLine size={26} />
          </button>
          <button
            className="absolute top-[40%] right-0 bg-gray-300 text-white rounded-full p-3 shadow hover:bg-green-500 cursor-pointer transition-colors"
            onClick={() => scrollFn("right")}
          >
            <RiArrowRightLine size={26} />
          </button>
        </div>
      </div>
    </div>
  );
}


// dummy data

// import { properties } from "@/utils/constant";
// import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
// import { MapPin } from "lucide-react";
// import React, { useRef } from "react";

// export default function Carousel() {
//   const scrollRef = useRef(null);

//  const scrollFn = (direction)=> {
//     const {current} = scrollRef
//     if(direction === "left") {
//       current.scrollLeft -= 700;
//     } else {
//       current.scrollLeft +=700;
//     }
//     // scrollLeft is a property in dom, read up on it, but the -= 700 means scroll 700px from the left and the += 700 means scroll 700px from the right, 700 is the number we are persisting, the number is just for how much ground you want to cover while scrolling, we can choose any number, but 700 covers more ground 
//   };

//   return (
//     <>
//       <div className="mt-10 relative w-full">
//         <h1 className="text-center text-5xl font-bold text-black">
//           Discover Our Popular Properties
//         </h1>

//         <div className="relative mt-6">
//           <div
//             ref={scrollRef}
//             className="mx-auto flex gap-6 overflow-x-auto scroll-smooth scrollbarHide py-4"
//           >
//             {properties.map((prop) => (
//               <div
//                 className="relative min-w-[220px] lg:min-w-[260px] rounded-xl overflow-hidden shadow"
//                 key={prop.id}
//               >
//                 <img
//                   src={prop.image}
//                   alt={prop.name}
//                   className="w-full h-[350px] object-cover text-black"
//                 />
//                 <div className="absolute w-full bottom-0 left-1/2 -translate-x-1/2 backdrop-blur-xs text-white p-3 rounded-md space-y-4">
//                   <h3 className="text-lg font-semibold">{prop.name}</h3>
//                   <p className="text-sm">{prop.price}</p>
//                   <div className="flex gap-2 mt-">
//                     <span className="px-2 border-r">{prop.bed} bed</span>
//                     <span className="px-2 border-r">{prop.bath} bath</span>
//                     <span>{prop.sqft}</span>
//                   </div>
//                   <p className="flex items-center gap-1 text-sm mt-1">
//                     <MapPin size={15} />
//                     {prop.location}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Arrow Buttons */}
//           <div className="hidden lg:block">
//             <button
//               type="button"
//               className="absolute top-[40%] left-0 bg-gray-300 text-white rounded-full p-3 shadow hover:bg-(--primary-color) cursor-pointer transition-colors"
//               onClick={() => scrollFn("left")}
//             >
//               <RiArrowLeftLine size={26} />
//             </button>
//             <button
//               type="button"
//               className="absolute top-[40%] right-0 bg-gray-300 text-white rounded-full p-3 shadow hover:bg-(--primary-color) cursor-pointer transition-colors"
//               onClick={() => scrollFn("right")}
//             >
//               <RiArrowRightLine size={26} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
