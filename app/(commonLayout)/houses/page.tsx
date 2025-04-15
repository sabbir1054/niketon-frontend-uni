/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetHousesQuery } from "@/redux/api/houseApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import HouseCard from "@/components/HousePage/HouseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

const tenantTypes = ["OTHERS", "BACHELOR", "FAMILY"];
const houseStatuses = ["AVAILABLE", "BOOKED"];
const houseCategories = [
  "FLAT",
  "SINGLE_ROOM",
  "HOSTEL",
  "SHOP",
  "OFFICE",
  "GARAGE",
];

const AllHouse = () => {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      searchTerm: searchParams.get("q") || "",
      minRentFee: "",
      maxRentFee: "",
      category: "",
      tenantType: "",
      status: "",
    },
  });

  const [queryParams, setQueryParams] = useState({});

  const onSubmit = (filters: any) => {
    const query: Record<string, string> = {};

    if (filters.searchTerm) query.searchTerm = filters.searchTerm;
    if (filters.minRentFee) query.minRentFee = filters.minRentFee;
    if (filters.maxRentFee) query.maxRentFee = filters.maxRentFee;
    if (filters.category) query.category = filters.category;
    if (filters.tenantType) query.tenantType = filters.tenantType;
    if (filters.status) query.status = filters.status;

    setQueryParams(query);
  };

  const handleReset = () => {
    reset();
    setQueryParams({});
  };

  const { data: houses, isLoading } = useGetHousesQuery(queryParams);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query && query.length > 0) {
      setQueryParams({ searchTerm: query });
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto my-5 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="md:col-span-1">
          <div className="bg-white p-5 border rounded-lg shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-lg">Filters</Label>
              <Button
                type="button"
                variant="ghost"
                className="text-red-500 hover:text-red-600 hover:bg-transparent cursor-pointer"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <Input placeholder="Search..." {...register("searchTerm")} />

              <Input
                type="number"
                placeholder="Min Rent Fee"
                {...register("minRentFee")}
              />

              <Input
                type="number"
                placeholder="Max Rent Fee"
                {...register("maxRentFee")}
              />

              <Select onValueChange={(val) => setValue("category", val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {houseCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(val) => setValue("tenantType", val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tenant Type" />
                </SelectTrigger>
                <SelectContent>
                  {tenantTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(val) => setValue("status", val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {houseStatuses.map((stat) => (
                    <SelectItem key={stat} value={stat}>
                      {stat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button type="submit" className="w-full mt-4">
                Search
              </Button>
            </form>
          </div>
        </div>

        {/* House Cards */}
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 h-40 rounded-md"
                ></div>
              ))}
            </div>
          ) : houses?.data?.data?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {houses.data.data.map((house: any, idx: number) => (
                <HouseCard key={idx} house={house} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground mt-10">
              No houses found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllHouse;
