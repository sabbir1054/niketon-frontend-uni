"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Horace Cole",
    image: "/images/horace.jpg",
    text: "Omnis velit quia. Perspiciatis et cupiditate. Voluptatum beatae asperiores dolor magnam fuga. Sed fuga est harum quo nesciunt sint. Optio veniam...",
  },
  {
    name: "Karen Maria",
    image: "/images/karen.jpg",
    text: "Omnis velit quia. Perspiciatis et cupiditate. Voluptatum beatae asperiores dolor magnam fuga. Sed fuga est harum quo nesciunt sint. Optio veniam...",
  },
  {
    name: "Jack Nitzsche",
    image: "/images/jack.jpg",
    text: "Omnis velit quia. Perspiciatis et cupiditate. Voluptatum beatae asperiores dolor magnam fuga. Sed fuga est harum quo nesciunt sint. Optio veniam...",
  },
  {
    name: "Jack Nitzsche",
    image: "/images/jack.jpg",
    text: "Omnis velit quia. Perspiciatis et cupiditate. Voluptatum beatae asperiores dolor magnam fuga. Sed fuga est harum quo nesciunt sint. Optio veniam...",
  },
  {
    name: "Jack Nitzsche",
    image: "/images/jack.jpg",
    text: "Omnis velit quia. Perspiciatis et cupiditate. Voluptatum beatae asperiores dolor magnam fuga. Sed fuga est harum quo nesciunt sint. Optio veniam...",
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-[#1b1472] text-white py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Testimonials</h2>
        <div className="flex justify-center gap-2 mt-2">
          <span className="w-4 h-1 bg-[#e8292f] rounded"></span>
          <span className="w-8 h-1 bg-[#e8292f] rounded"></span>
        </div>
        <p className="text-gray-300 mt-2">What our happy client says</p>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-7xl mx-auto"
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <Card className="bg-white text-black text-center rounded-xl shadow-md p-6">
              <CardContent className="flex flex-col items-center">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={64}
                  height={64}
                  className="rounded-full mb-4"
                />
                <p className="text-sm mb-4">{t.text}</p>
                <h4 className="font-semibold text-[#1b1472]">{t.name}</h4>
                <div className="text-[#e8292f] text-sm mt-2">★★★★★</div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
