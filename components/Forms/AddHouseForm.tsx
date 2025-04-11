/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* eslint-disable @next/next/no-img-element */
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
import { getFromLocalStorage } from "@/utils/localStorage";
import { X } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

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

export default function AddHouseForm() {
  const { register, handleSubmit, control, reset } = useForm<HouseFormData>();
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const onSubmit = async (data: any) => {
    const { quantity, rentFee, minBookingCharge, ...othersData } = data;
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        ...othersData,
        quantity: parseInt(quantity),
        rentFee: parseFloat(rentFee),
        minBookingCharge: parseFloat(minBookingCharge),
      })
    );

    files.forEach((file) => {
      formData.append("files", file);
    });
    console.log(data);

    try {
      const response = await fetch(`${getBaseUrl()}/house/add`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `${getFromLocalStorage(authKey)}`,
        },
      });

      const result = await response.json();
      if (result?.success === true) {
        // console.log("Success:", result);
        toast.success("House Added");
      }
      reset();
      setFiles([]);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-10 rounded-xl max-w-4xl mx-auto bg-white"
    >
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

        <Input type="number" placeholder="Quantity" {...register("quantity")} />
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

      <div
        {...getRootProps()}
        className="cursor-pointer border border-dashed border-gray-400 p-6 rounded-md text-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag n drop images here, or click to select files</p>
        )}
      </div>

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

      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
        <Button type="submit">Add Property</Button>
      </div>
    </form>
  );
}
