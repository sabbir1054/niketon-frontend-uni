/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

const AddHouseForm = () => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { register, handleSubmit, reset, setValue } = useForm();

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    if (!files.length) {
      alert("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("data", JSON.stringify(data));

    console.log("Submitting Data:", data);
    console.log("Submitting Files:", files);

    try {
      const response = await fetch("/api/houses", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to submit");

      const result = await response.json();
      console.log("Success:", result);

      // Reset form and close modal
      reset();
      setFiles([]);
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit. Check the console for details.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">Add House</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogTitle>Add New House</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>House Name</Label>
            <Input
              {...register("houseName", { required: true })}
              placeholder="Enter house name"
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              {...register("address", { required: true })}
              placeholder="Enter address"
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select
              onValueChange={(value) => setValue("category", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="bungalow">Bungalow</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Tenant Type</Label>
            <Select
              onValueChange={(value) => setValue("tenantType", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select tenant type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="bachelor">Bachelor</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Rent Fee</Label>
            <Input
              type="number"
              {...register("rentFee", { required: true })}
              placeholder="Enter rent fee"
            />
          </div>
          <div>
            <Label>Min Booking Charge</Label>
            <Input
              type="number"
              {...register("minBookingCharge", { required: true })}
              placeholder="Enter booking charge"
            />
          </div>
          <div>
            <Label>Details</Label>
            <Textarea
              {...register("details")}
              placeholder="Enter house details"
            />
          </div>
          <div>
            <Label>Upload Photos</Label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed p-4 text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <p>Drag & drop images here, or click to select</p>
            </div>
            {files.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {files.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHouseForm;
