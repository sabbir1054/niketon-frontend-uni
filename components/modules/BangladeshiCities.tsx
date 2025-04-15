import Image from "next/image";

const bangladeshiCities = [
  {
    name: "Dhaka",
    properties: 1200,
    image: "/images/dhaka_photo.webp",
  },
  {
    name: "Chittagong",
    properties: 850,
    image: "/images/dhaka_photo.webp",
  },
  {
    name: "Sylhet",
    properties: 540,
    image: "/images/dhaka_photo.webp",
  },
  {
    name: "Khulna",
    properties: 300,
    image: "/images/dhaka_photo.webp",
  },
  {
    name: "Rajshahi",
    properties: 250,
    image: "/images/dhaka_photo.webp",
  },
  {
    name: "Cox's Bazar",
    properties: 670,
    image: "/images/dhaka_photo.webp",
  },
];

export default function BangladeshiCities() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#1b1472]">
          Cities With Listing
        </h2>
        <div className="flex justify-center gap-2 mt-2">
          <span className="w-4 h-1 bg-[#e8292f] rounded"></span>
          <span className="w-8 h-1 bg-[#e8292f] rounded"></span>
        </div>
        <p className="text-gray-500 mt-2">Destinations we love the most</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {bangladeshiCities.map((city) => (
          <div
            key={city.name}
            className="relative rounded-lg overflow-hidden h-56 group shadow-md"
          >
            <Image
              src={city.image}
              alt={city.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-[#00000070]"></div>
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold">{city.name}</h3>
              <p className="text-sm">{city.properties} Properties</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
