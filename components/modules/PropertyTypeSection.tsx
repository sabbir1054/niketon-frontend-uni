import { Card, CardContent } from "@/components/ui/card";
import { Building2, Home, Landmark } from "lucide-react";

const propertyTypes = [
  {
    title: "Houses",
    count: 30,
    icon: <Home className="w-12 h-12 text-[#0e7673]" />,
  },
  {
    title: "Offices",
    count: 25,
    icon: <Building2 className="w-12 h-12 text-[#0e7673]" />,
  },
  {
    title: "Villas",
    count: 40,
    icon: <Landmark className="w-12 h-12 text-[#0e7673]" />,
  },
  {
    title: "Apartment",
    count: 35,
    icon: <Home className="w-12 h-12 text-[#0e7673]" />,
  },
];

export default function PropertyTypeSection() {
  return (
    <section className="bg-[#1b1472] text-white py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="space-y-6 md:col-span-1">
          <div>
            <h2 className="text-3xl font-bold leading-snug">
              Explore by <br /> Property Type
            </h2>
            <div className="flex gap-2 mt-2">
              <span className="w-4 h-1 bg-[#e8292f] rounded"></span>
              <span className="w-8 h-1 bg-[#e8292f] rounded"></span>
            </div>
          </div>
          <p className="text-sm text-gray-300 max-w-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis
            et sem sed.
          </p>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyTypes.map((type) => (
            <Card
              key={type.title}
              className="text-center py-10 hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-center gap-4">
                {type.icon}
                <h3 className="text-lg font-semibold text-black">
                  {type.title}
                </h3>
                <p className="text-sm text-gray-500">{type.count} Properties</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
