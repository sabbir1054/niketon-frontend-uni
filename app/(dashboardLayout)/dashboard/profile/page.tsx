/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ProfilePage = () => {
  const { data: profileData } = useGetMyProfileQuery({});
  const [updateData, { isLoading }] = useUpdateProfileMutation();
  const [editMode, setEditMode] = useState(false);

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

  // ✅ Update form fields when profile data is loaded
  useEffect(() => {
    if (profileData?.data) {
      reset({
        name: profileData.data.name || "",
        email: profileData.data.email || "",
        phone: profileData.data.phone || "",
        address: profileData.data.address || "",
      });
    }
  }, [profileData, reset]);

  const onSubmit = async (data: any) => {
    try {
      const res = await updateData({ ...data }).unwrap();
      console.log(res);

      if (res?.success === true) {
        toast.success("User profile update");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    // console.log("Updated Data:", data);
    setEditMode(false);
    // You can trigger an API call here to update user profile
  };

  return (
    <div className="min-h-screen">
      <div className="container mt-5 max-w-5xl mx-auto">
        <div className="grid grid-cols-12 bg-white p-10 rounded-2xl border">
          <div className="col-span-4">
            <img src="/images/profile.jpg" alt="Profile" />
          </div>
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
                  {/* Name */}
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

                  {/* Email */}
                  <div>
                    <Label>Email</Label>
                    <Input {...register("email")} disabled />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label>Phone</Label>
                    <Input {...register("phone")} disabled={!editMode} />
                  </div>

                  {/* Address */}
                  <div>
                    <Label>Address</Label>
                    <Input {...register("address")} disabled={!editMode} />
                  </div>

                  {/* Save Button */}
                  {editMode && (
                    <Button type="submit" className="w-full">
                      Save Changes
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
