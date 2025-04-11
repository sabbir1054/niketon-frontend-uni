/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getBaseUrl } from "@/config/envConfig";
import { authKey } from "@/constance/authKey";
import {
  useDeleteHouseImageMutation,
  useGetSingleHouseDetailsQuery,
  useUpdateHouseInfoMutation,
} from "@/redux/api/houseApi";
import { getFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import SpinnerOverlay from "../shared/SpinnerOverlay";

const houseCategories = [
  "FLAT",
  "SINGLE_ROOM",
  "HOSTEL",
  "SHOP",
  "OFFICE",
  "GARAGE",
];
const tenantTypes = ["OTHERS", "BACHELOR", "FAMILY"];

type HouseFormData = {
  houseName: string;
  category: string;
  tenantType: string;
  quantity: number;
  rentFee: number;
  minBookingCharge: number;
  address: string;
  video?: string;
  details: string;
};

type ImageType = {
  url: string;
  name?: string;
};

export default function UpdateHouseForm({ houseId }: any) {
  const [deleteImage] = useDeleteHouseImageMutation();
  const [updateInfo] = useUpdateHouseInfoMutation();
  const { data, isLoading } = useGetSingleHouseDetailsQuery({ id: houseId });
  const { register, handleSubmit, control, reset, setValue } =
    useForm<HouseFormData>();

  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [existingImages, setExistingImages] = useState<ImageType[]>([]);

  // 🟡 Dropzone Config
  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  const removeExistingImage = (url: string) => {
    setExistingImages((prev) => prev.filter((img) => img.url !== url));
  };

  // 🟡 Submit Handler
  const handleUpdateInfo = async (data: any) => {
    try {
      const response = await updateInfo({
        data: data,
        houseId: houseId,
      }).unwrap();
      if (response?.success === true) {
        toast.success("Info updated");
      }
    } catch (error) {}
  };
  const onSubmit = async (formDataRaw: any) => {
    const updateData = {
      address: formDataRaw?.address,
      category: formDataRaw?.category,
      details: formDataRaw?.details,
      houseName: formDataRaw?.houseName,
      minBookingCharge: parseInt(formDataRaw?.minBookingCharge),
      rentFee: parseInt(formDataRaw?.rentFee),
      quantity: parseInt(formDataRaw?.quantity),
      tenantType: formDataRaw?.tenantType,
      video: formDataRaw?.video,
    };
    handleUpdateInfo(updateData);
  };

  const handleImageDelete = async (imgId: string) => {
    try {
      const response = await deleteImage({
        imageId: imgId,
        houseId: houseId,
      }).unwrap();
      if (response?.success === true) {
        toast.success("Image deleted");
      }
    } catch (error) {}
  };

  const handleImageUpdate = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    try {
      const response: any = await axios.patch(
        `${getBaseUrl()}/house/addImages/${houseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: getFromLocalStorage(authKey) || "",
          },
        }
      );
      if (response?.data?.success === true) {
        toast.success("Image added");
        setFiles([]);
        window.location.reload();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (data?.data) {
      const { images, ...rest } = data.data;
      reset(rest);
      if (images) {
        setExistingImages(images);
      }
    }
  }, [data]);

  if (isLoading) return <SpinnerOverlay />;

  console.log(existingImages);

  return (
    <>
      <div className=" p-5 rounded-xl max-w-4xl mx-auto bg-white mb-5">
        <h2 className="font-medium">Previous Photo:</h2>

        <div className="mt-4 flex flex-wrap gap-4">
          {existingImages.map((img: any, idx: any) => (
            <div
              key={idx}
              className="relative w-32 h-32 rounded overflow-hidden border"
            >
              <img
                src={img.url}
                alt={img.name || "existing-image"}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleImageDelete(img?.id)}
                className="absolute cursor-pointer top-1 right-1 bg-white rounded-full p-1 shadow"
              >
                <X size={16} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-10 rounded-xl max-w-4xl mx-auto bg-white"
      >
        <h2 className="font-medium">Update House Info:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="House Name" {...register("houseName")} />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {houseCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="tenantType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Tenant Type" />
                </SelectTrigger>
                <SelectContent>
                  {tenantTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Input
            type="number"
            placeholder="Quantity"
            {...register("quantity")}
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Rent Fee"
            {...register("rentFee")}
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Min Booking Charge"
            {...register("minBookingCharge")}
          />
          <Input placeholder="Address" {...register("address")} />
          <Input placeholder="Video URL (optional)" {...register("video")} />
        </div>

        <Textarea
          placeholder="Details"
          {...register("details")}
          className="min-h-[100px]"
        />

        <Button type="submit">Update Property</Button>
      </form>
      <div className="mt-5 p-5 rounded-xl max-w-4xl mx-auto bg-white">
        <h2 className="font-medium">Add new photo :</h2>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className="cursor-pointer border border-dashed border-gray-400 p-10 rounded-md text-center"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag n drop images here, or click to select files</p>
          )}
        </div>

        {/* New Images */}
        <div className="mt-4 flex flex-wrap gap-4">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="relative w-32 h-32 rounded overflow-hidden border"
            >
              <img
                src={file.preview}
                alt={file.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(file.name)}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
              >
                <X size={16} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
        <Button className="mt-5" onClick={handleImageUpdate}>
          Upload Photo
        </Button>
      </div>
    </>
  );
}
