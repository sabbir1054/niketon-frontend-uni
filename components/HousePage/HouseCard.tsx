/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDeleteHouseMutation } from "@/redux/api/houseApi";
import { useCurrentToken } from "@/redux/slice/authSlice";
import { getUserRoleFromLocal } from "@/utils/AuthServices";
import { DeleteIcon, MapPin, PenBoxIcon, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const HouseCard = ({ house }: any) => {
  console.log(house);

  const pathName = usePathname();
  const user = useSelector(useCurrentToken);
  const decodeUser = getUserRoleFromLocal(user ? user : "");
  const [deleteHouse, { isLoading }] = useDeleteHouseMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteHouse({ id: house?.id }).unwrap();
      console.log(response);

      if (response?.success === true) {
        toast.success("House deleted");
      }
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="rounded-2xl shadow-lg overflow-hidden border p-4">
      <Link className="" href={`/houses/${house?.id}`}>
        {" "}
        <div className="relative">
          <img
            src={`${house?.images?.length > 0 ? house?.images[0]?.url : "/"}`}
            alt={house.houseName}
            width={400}
            height={300}
            className="w-full h-52 object-cover rounded-xl"
          />
          <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
            Featured
          </Badge>
          <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
            ❤️
          </button>
          <div className="absolute bottom-3 right-3 bg-white p-1 rounded-full shadow-md">
            <Image
              src={`${
                house?.houseOwner?.photo ? house?.houseOwner?.photo : "/"
              }`}
              alt="Owner"
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
        </div>
      </Link>

      <CardContent className="mt-3">
        <div className="flex justify-between">
          <p className="text-xl font-bold">${house.rentFee.toLocaleString()}</p>
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <Star className="w-4 h-4" />{" "}
            <span className="text-gray-600">4.0 (28 Reviews)</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold mt-1">{house?.houseName}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <MapPin className="w-4 h-4" /> {house?.address}
        </p>

        <div className="mt-3 text-sm text-gray-600 flex justify-between">
          <span>Listed on: 13 Jan 2023</span>
          <span className="font-semibold">Category: House</span>
        </div>
        <Link className="" href={`/houses/${house?.id}`}>
          {" "}
          <Button
            className={`${
              decodeUser?.role === "TENANT" && "w-full"
            } mt-3 bg-blue-600 hover:bg-blue-700 cursor-pointer`}
          >
            Details
          </Button>
        </Link>
        {pathName === "/dashboard/manageHouse" && (
          <>
            <Link href={`/dashboard/manageHouse/update/${house?.id}`}>
              {" "}
              <Button
                className={`${
                  decodeUser?.role !== "OWNER" && "hidden"
                } mt-3 bg-yellow-500 hover:bg-yellow-400 cursor-pointer ml-2`}
              >
                <PenBoxIcon /> EDIT
              </Button>
            </Link>
            <Button
              onClick={handleDelete}
              className={`${
                decodeUser?.role !== "OWNER" && "hidden"
              } mt-3 bg-red-500 hover:bg-red-700 cursor-pointer ml-2`}
            >
              <DeleteIcon /> Delete
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default HouseCard;
