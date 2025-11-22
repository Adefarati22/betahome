import axiosInstance from "@/utils/axiosInstance";
import { headers } from "@/utils/constant";

export const getAllProperties = async (searchParams, accessToken) => {
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const query = searchParams.get("query") || "";
  const location = searchParams.get("location") || "";
  const type = searchParams.get("type") || "";
  const bedrooms = searchParams.get("bedrooms") || "";
  const bathrooms = searchParams.get("bathrooms") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);

  if (query) params.append("query", query);
  if (location) params.append("location", location);
  if (type) params.append("type", type);
  if (bedrooms) params.append("bedrooms", bedrooms);
  if (bathrooms) params.append("bathrooms", bathrooms);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);

  return await axiosInstance.get(
    `/properties/all?${params.toString()}`,
   
      headers(accessToken),
  );
};


