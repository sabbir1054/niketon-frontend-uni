import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url('/images/banner.webp')`,
        backgroundSize: "cover",
        minHeight: "70vh",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto">
        <div className="p-5 md:p-20 md:w-6xl">
          <h1 className="text-[#0E0E46] text-7xl font-medium ">
            Find Your Best Dream House for{" "}
            <span className="text-primary">Rental</span>
          </h1>
          <p className="font-medium mt-5 md:mt-10 text-xl md:w-xl text-[#0E0E46]">
            Properties for buy / rent in in your location. We have more than
            3000+ listings for you to choose
          </p>

          <Button className="mt-5 md:mt-7 text-lg p-5">
            {" "}
            <Plus /> Join with us{" "}
          </Button>
          <div className="flex items-center">
            {" "}
            <Input className=" w-full bg-white mt-5 h-13 "></Input>{" "}
            <Button className="mt-5 px-10 py-5 -ml-32">Search</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
