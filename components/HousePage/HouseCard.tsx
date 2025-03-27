"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Bath, BedDouble, MapPin } from "lucide-react";

const HouseCard = ({ house }) => {
  return (
    <Card className="rounded-2xl shadow-lg overflow-hidden border p-4">
      <div className="relative">
        <img
          src="https://www.thetolet.com/storage/property_images/82203/property_jXoDNDNWz.webp"
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
            src="/images/profile.jpg"
            alt="Owner"
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
      </div>
      <CardContent className="mt-3">
        <p className="text-xl font-bold">${house.rentFee.toLocaleString()}</p>
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <Star className="w-4 h-4" />{" "}
          <span className="text-gray-600">4.0 (28 Reviews)</span>
        </div>
        <h3 className="text-lg font-semibold mt-1">{house.houseName}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <MapPin className="w-4 h-4" /> {house.address}
        </p>

        <div className="mt-3 text-sm text-gray-600 flex justify-between">
          <span>Listed on: 13 Jan 2023</span>
          <span className="font-semibold">Category: House</span>
        </div>
        <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default HouseCard;
