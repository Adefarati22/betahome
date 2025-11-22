import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import { useAuth } from "@/store";
import { toast } from "sonner";

export default function Sort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [bedroom, setBedroom] = useState(
    Number(searchParams.get("bedroom")) || 0
  );

  const onSearch = () => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/account/login");
      return;
    }
    const params = {};
    if (location) params.location = location;
    if (type) params.type = type;
    if (bedroom) params.bedroom = bedroom;
    setSearchParams(params);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white/40 backdrop-blur-md rounded-xl shadow-lg p-5">
      <div className="bg-white w-full p-4 flex flex-col md:flex-row items-center gap-4 rounded-xl">
        {/* Location */}
        <div className="flex flex-col flex-1 px-4 border-r border-black">
          <label className="text-[12px] font-semibold text-gray-600 uppercase">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g Gbagada"
            className="outline-none bg-transparent text-black"
          />
        </div>

        {/* Property Type - might not work because i did not create space for it in the backend */}
        <div className="flex flex-col flex-1 px-4 border-r border-black">
          <label className="text-[12px] font-semibold text-gray-600 uppercase">
            Property Type
          </label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="e.g Duplex"
            className="outline-none bg-transparent text-black"
          />
        </div>

        {/* Bedroom Counter */}
        <div className="flex flex-col items-center px-4 border-r border-black">
          <label className="text-[12px] font-semibold text-gray-600 uppercase">
            Bedroom
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => bedroom > 0 && setBedroom(bedroom - 1)}
              className="p-1 border rounded-full bg-white/40 backdrop-blur-sm text-black"
            >
              <RiSubtractLine size={14} />
            </button>
            <span className="text-black">{bedroom}</span>
            <button
              onClick={() => setBedroom(bedroom + 1)}
              className="p-1 border rounded-full bg-white/40 backdrop-blur-sm text-black"
            >
              <RiAddLine size={14} />
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={onSearch}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg cursor-pointer transition-all duration-300"
        >
          Find Property
        </button>
      </div>
    </div>
  );
}
