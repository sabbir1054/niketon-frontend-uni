import BangladeshiCities from "@/components/modules/BangladeshiCities";
import FeaturedPropertiesSection from "@/components/modules/FeaturedPropertiesSection";
import Hero from "@/components/modules/Hero";
import HowItWorks from "@/components/modules/HowItsWorks";
import PropertyTypeSection from "@/components/modules/PropertyTypeSection";
import TestimonialSection from "@/components/modules/TestimonialSection";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <PropertyTypeSection />
      <FeaturedPropertiesSection />
      <BangladeshiCities />
      <TestimonialSection/>
    </>
  );
}
