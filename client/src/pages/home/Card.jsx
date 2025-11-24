import { getAllProperties } from "@/api/property";
import ErrorAlert from "@/components/ErrorAlert";
import LazyLoader, { SkeletonCard } from "@/components/LazyLoader";
import Paginate from "@/components/Paginate";
import PropertyCard from "@/components/PropertyCard";
import Carousel from "@/features/home/Carousel";
import usePaginate from "@/hooks/usePaginate";
import { useAuth } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

export default function Card() {
  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["properties", searchParams.toString()],
    queryFn: () => getAllProperties(searchParams, accessToken),
  });

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
      totalPages: data?.data?.meta?.totalPages || 1,
      hasMore: data?.data?.meta?.hasMore || false,
      currentPage: data?.data?.meta?.currentPage || 1,
  });
  

  if (isPending) return <SkeletonCard />;
  if (isError) return <ErrorAlert error={error?.response?.data?.message} />;


  return (
    <div className="bg-white px-5 md:px-20 md:mx-auto py-20 mt-40">
      <div className="grid md:grid-cols-12  lg:grid-cols-4 md:gap-6 mt-10">
        {data?.data?.properties?.length > 0 ? (
          data?.data?.properties?.map((item) => (
            <PropertyCard
              key={item._id}
              id={item._id}
              image={item.images || "no image to display"}
              title={item.title}
              location={item.location}
              bedrooms={item.bedrooms}
              bathrooms={item.bathrooms}
              price={item.price}
              status="status"
              featured="featured"
            />
          ))
        ) : (
          <p className="text-green-500">No properties found</p>
        )}
      </div>

      <Paginate
        totalPages={totalPages}
        hasMore={hasMore}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />

      <Carousel />
    </div>
  );
}
