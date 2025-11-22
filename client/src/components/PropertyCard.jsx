import { useAuth } from "@/store";
import {
  RiArrowLeftRightLine,
  RiImage2Line,
  RiLinksLine,
  RiVideoOnLine,
} from "@remixicon/react";
import { MapPin, Bed, Bath, Share2, Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function PropertyCard({
  image,
  title,
  location,
  bedrooms,
  bathrooms,
  price,
  status,
  featured,
}) {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleLike = () => {
    if (!user) return navigate("/account/login");
    setLike(!like);
  };
  const handleCardClick = () => {
      if (!user) {
      toast.error("Please login to continue");
      navigate("/account/login");
      return;
    }
    }

  // const handleCardClick = () => {
  //   if (!user) return navigate("/account/login");
  // };

  return (
    <div
      className="bg-white rounded-md shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={handleCardClick}
    >
      {/* IMAGE SECTION */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-56 object-cover" />

        {/* Featured Label */}
        {featured && (
          <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-5 py-2 rounded-md">
            Featured
          </span>
        )}

        {/* For Sale / For Rent Label */}
        {status && (
          <span className="absolute top-3 right-3 bg-gray-400 text-white text-xs font-semibold px-5 py-2 rounded-md">
            {status}
          </span>
        )}

        {/* Icon overlays */}
        <div className="absolute bottom-3 right-3 flex gap-3">
          <button className="bg-gray-100/40 text-white p-2 rounded-md shadow hover:text-black cursor-pointer">
            <RiLinksLine size={18} />
          </button>
          <button className="bg-gray-100/40 text-white p-2 rounded-md shadow hover:text-black cursor-pointer">
            <RiVideoOnLine size={18} />
          </button>
          <button className="bg-gray-100/40 text-white p-2 rounded-md shadow hover:text-black cursor-pointer">
            <RiImage2Line size={20} />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        {/* Location */}
        <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <MapPin size={15} />
          {location}
        </p>

        {/* BED & BATH */}
        <div className="flex gap-6 text-gray-600 text-sm mt-3">
          <span className="flex items-center gap-1">
            <Bed size={16} /> {bedrooms} Bedrooms
          </span>
          <span className="flex items-center gap-1">
            <Bath size={16} /> {bathrooms} Bathrooms
          </span>
        </div>

        <div className="border border-gray-200 mt-5"></div>

        {/* PRICE */}
        <div className="flex justify-between items-center mt-3">
          <p className="mt-3 text-lg font-bold text-gray-900">
            ₦ {price}</p>
          <div className="bottom-3 right-3 flex gap-3 text-black">
            <button className="cursor-pointer">
              <RiArrowLeftRightLine size={18} />
            </button>
            <button className="cursor-pointer">
              <Share2 size={18} />
            </button>
            <button className="cursor-pointer" onClick={handleLike}>
              <Heart
                size={18}
                fill={like ? "red" : "none"}
                color={like ? "red" : "black"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
