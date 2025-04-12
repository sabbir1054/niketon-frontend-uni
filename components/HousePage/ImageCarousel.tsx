/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../ui/button";

export default function ImageCarousel({ images }: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="relative">
        {/* Main Swiper */}
        <Swiper
          modules={[Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // Assign navigation elements before swiper init
            // Otherwise, it won't recognize them
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="rounded-xl overflow-hidden"
        >
          {images?.map((src: any, index: number) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[500px]">
                <Image
                  src={src?.url}
                  alt={`Image ${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <Button
          ref={prevRef}
          className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-5"
        >
          <MoveLeft className="text-primary " />
        </Button>
        <Button
          ref={nextRef}
          className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-5 "
        >
          <MoveRight className="text-primary" />
        </Button>
      </div>

      {/* Thumbnail Swiper */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        watchSlidesProgress
        className="mt-4"
      >
        {images.map((src: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative h-24 rounded-lg overflow-hidden border cursor-pointer">
              <Image
                src={src?.url}
                alt={`Thumb ${index}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
