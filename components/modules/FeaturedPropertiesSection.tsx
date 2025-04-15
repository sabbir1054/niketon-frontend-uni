"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetHousesQuery } from "@/redux/api/houseApi";
import HouseCard from "../HousePage/HouseCard";
import SpinnerOverlay from "../shared/SpinnerOverlay";

const FeaturedPropertiesSection = () => {
  const { data, isLoading } = useGetHousesQuery({});
  if (isLoading) {
    return <SpinnerOverlay />;
  }
  console.log(data);
  
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold">Featured Properties for Sales</h2>
        <p className="text-gray-500 mt-2">
          Hand-picked selection of quality places
        </p>
        <div className="w-16 h-1 bg-red-500 mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.data?.slice(0, 6).map((house: any, idx: number) => (
          <HouseCard key={idx} house={house} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
