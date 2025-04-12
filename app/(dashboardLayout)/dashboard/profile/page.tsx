"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getBaseUrl } from "@/config/envConfig";
import { authKey } from "@/constance/authKey";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import { getFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ProfilePage = () => {
  const { data: profileData } = useGetMyProfileQuery({});
  const [updateData, { isLoading }] = useUpdateProfileMutation();
  const [editMode, setEditMode] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (profileData?.data) {
      reset({
        name: profileData.data.name || "",
        email: profileData.data.email || "",
        phone: profileData.data.phone || "",
        address: profileData.data.address || "",
      });

      if (profileData.data.photo) {
        setPreviewImage(profileData.data.photo); // you can adjust this if photo is relative
      }
    }
  }, [profileData, reset]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    },
  });

  const onSubmit = async (formValues: any) => {
    const formData = new FormData();

    if (uploadedImage) {
      formData.append("file", uploadedImage);
    }

    formData.append("data", JSON.stringify(formValues));

    try {
      const res: any = await axios.patch(
        `${getBaseUrl()}/user/updateProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: getFromLocalStorage(authKey) || "",
          },
        }
      );

      if (res?.data?.success === true) {
        toast.success("User profile updated");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }

    setEditMode(false);
  };

  console.log(uploadedImage);

  return (
    <div className="min-h-screen">
      <div className="container mt-5 max-w-5xl mx-auto">
        <div className="grid grid-cols-12 bg-white p-10 rounded-2xl border gap-8">
          {/* Left side: image + dropzone */}
          <div className="col-span-4 space-y-4">
            <img
              src={previewImage || profileData?.data?.photo}
              alt="Profile"
              className="w-full h-auto rounded-lg"
            />

            {editMode && (
              <div
                {...getRootProps()}
                className="border border-dashed p-4 rounded-md text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the image here ...</p>
                ) : (
                  <p>Drag & drop an image here, or click to select</p>
                )}
              </div>
            )}
          </div>

          {/* Right side: form */}
          <div className="col-span-8">
            <Card className="w-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setEditMode(!editMode)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      {...register("name", { required: "Name is required" })}
                      disabled={!editMode}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input {...register("email")} disabled />
                  </div>

                  <div>
                    <Label>Phone</Label>
                    <Input {...register("phone")} disabled={!editMode} />
                  </div>

                  <div>
                    <Label>Address</Label>
                    <Input {...register("address")} disabled={!editMode} />
                  </div>

                  {editMode && (
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
