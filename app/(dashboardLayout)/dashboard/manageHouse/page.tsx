/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { useMyHousesQuery } from "@/redux/api/houseApi";
import { Plus } from "lucide-react";
import Link from "next/link";
import HouseCard from "../../../../components/HousePage/HouseCard";
const ManageHousePage = () => {
  const { data: allHouse, isLoading } = useMyHousesQuery({});

  return (
    <div className="min-h-screen container mx-auto">
      <h2 className="mt-10 text-center text-2xl font-medium">My Houses</h2>
      <Link href={"/dashboard/manageHouse/add"}>
        {" "}
        <Button>
          <Plus></Plus> Add New House
        </Button>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 lg:grid-cols-4 gap-6 mb-5">
        {allHouse?.data?.data?.map((house: any) => (
          <HouseCard key={house?.id} house={house} />
        ))}
      </div>
    </div>
  );
};

export default ManageHousePage;
