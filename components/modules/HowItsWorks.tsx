"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideClipboardList, LucideHome, LucideMapPin } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "01. Search for Location",
    description:
      "Use our interactive map or search bar to find properties in your desired area. Whether it's a city, neighborhood, or near landmarks, we make it easy.",
    icon: <LucideMapPin className="w-8 h-8 text-white" />,
    bgColor: "bg-indigo-500",
  },
  {
    id: 2,
    title: "02. Select Property Type",
    description:
      "Choose the type of property that suits your needs—apartments, villas, commercial spaces, or land. Filter by amenities, size, and budget for a tailored search.",
    icon: <LucideClipboardList className="w-8 h-8 text-white" />,
    bgColor: "bg-rose-500",
  },
  {
    id: 3,
    title: "03. Book Your Property",
    description:
      "Found your dream property? Proceed to book instantly or schedule a visit. Our secure booking process ensures your reservation is safe and hassle-free.",
    icon: <LucideHome className="w-8 h-8 text-white" />,
    bgColor: "bg-emerald-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-900">
        How It <span className="text-primary">Works</span>
      </h2>
      <div className="flex justify-center my-2">
        <div className="h-1 w-10 bg-primary rounded-full" />
      </div>
      <p className="text-gray-500 mb-12">
        Follow these 3 steps to book your place
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition duration-300">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                    step.bgColor
                  )}
                >
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
