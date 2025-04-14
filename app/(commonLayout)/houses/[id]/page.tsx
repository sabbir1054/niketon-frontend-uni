/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import OwnerProfile from "@/components/HousePage/OwnerProfile";
import BookingDialog from "@/components/modules/BookingDialog";
import SpinnerOverlay from "@/components/shared/SpinnerOverlay";
import { Button } from "@/components/ui/button";
import { useGetSingleHouseDetailsQuery } from "@/redux/api/houseApi";
import { MapPin } from "lucide-react";
import { useParams } from "next/navigation";
import ImageCarousel from "../../../../components/HousePage/ImageCarousel";
const getYouTubeEmbedUrl = (url: any) => {
  const videoId = url.split("v=")[1]?.split("&")[0];
  return `https://www.youtube.com/embed/${videoId}`;
};
const HouseDetailsPage = () => {
  const params = useParams();
  const { data, isLoading } = useGetSingleHouseDetailsQuery({
    id: params?.id,
  });
  if (isLoading) {
    <SpinnerOverlay />;
  }

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="flex justify-between py-8 mt-10 bg-white p-5 border-1 rounded-lg shadow-sm">
        <div>
          <h2 className="text-3xl font-medium">{data?.data?.houseName}</h2>
          <p className="text-sm mt-2">
            <MapPin className="inline-block " />
            {data?.data?.address}{" "}
          </p>
        </div>
        <div>
          <h4 className="text-2xl">$ {data?.data?.rentFee}</h4>
          <Button
            className={`${
              data?.data?.status === "BOOKED" && "hover:bg-gray-600 bg-gray-600"
            }`}
          >
            {data?.data?.status}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5 my-10">
        <div className="col-span-8">
          <div className="p-5 bg-white border-1 rounded-lg shadow-sm">
            {data?.data?.images?.length > 0 && (
              <ImageCarousel images={data?.data?.images} />
            )}
          </div>
          <div className="p-5  bg-white border-1 rounded-lg shadow-sm mt-5 ">
            <p className="text-lg text-justify font-medium">Features:</p>
            <div className="flex justify-evenly">
              {" "}
              <Button className="text-lg  font-medium border-1 rounded-md">
                {data?.data?.category}
              </Button>
              <Button className="text-lg  font-medium  border-1 rounded-md">
                {data?.data?.tenantType}
              </Button>
              <Button className="text-lg  font-medium border-1 rounded-md">
                QTY: {data?.data?.quantity}
              </Button>
              <Button className="text-lg  font-medium  border-1 rounded-md">
                Booking Charge: {data?.data?.minBookingCharge}
              </Button>
            </div>
          </div>
          <div className="p-5 bg-white border-1 rounded-lg shadow-sm mt-5">
            <p className="text-lg text-justify font-medium">House Details:</p>
            <p className="text-lg text-justify">{data?.data?.details}</p>
          </div>
          <div className="p-5 bg-white border-1 rounded-lg shadow-sm mt-5">
            {/* <iframe frameborder="0"></iframe> */}
            {data?.data?.video && (
              <iframe
                className="w-full h-140"
                src={`${getYouTubeEmbedUrl(data?.data?.video)}`}
                title={data?.data?.houseName}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <div className="p-5 bg-white border-1 rounded-lg shadow-sm mt-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.222173753859!2d90.40771542589756!3d23.775101537826572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7711041fe49%3A0x6724a7f9669fcc9e!2z4Kao4Ka_4KaV4KeH4Kak4KaoLCDgpqLgpr7gppXgpr4gMTIxMg!5e0!3m2!1sbn!2sbd!4v1744419032739!5m2!1sbn!2sbd"
              width="100%"
              height="450"
              // style="border:0;"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="col-span-4">
          {data?.data?.status === "AVAILABLE" && (
            <BookingDialog data={data?.data} />
          )}
          <OwnerProfile user={data?.data?.houseOwner} />
        </div>
      </div>
    </div>
  );
};

export default HouseDetailsPage;
