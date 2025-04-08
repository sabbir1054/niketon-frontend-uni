import HouseCard from "../HousePage/HouseCard";
const demoHouses = [
  {
    houseName: "Sunset Villa",
    rentFee: 1200,
    address: "123 Ocean Drive, Miami, FL",
  },
  {
    houseName: "Urban Oasis",
    rentFee: 950,
    address: "456 Downtown St, Austin, TX",
  },
  {
    houseName: "Lakeside Retreat",
    rentFee: 1100,
    address: "789 Lakeview Blvd, Chicago, IL",
  },
  {
    houseName: "Cozy Cottage",
    rentFee: 850,
    address: "321 Country Rd, Nashville, TN",
  },
  {
    houseName: "Mountain Escape",
    rentFee: 1350,
    address: "654 Summit Lane, Denver, CO",
  },
  {
    houseName: "Modern Loft",
    rentFee: 1050,
    address: "987 Skyline Ave, Seattle, WA",
  },
];

const FeaturedPropertiesSection = () => {
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
        {demoHouses.map((house, index) => (
          <HouseCard key={index} house={house} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
