"use client";
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+1234567890",
      address: "123 Main Street",
    },
  });

  const onSubmit = (data) => {
    console.log("Updated Data:", data);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen">
      <div className="container mt-5 max-w-5xl   mx-auto">
        <div className="grid grid-cols-12 bg-white  p-10 rounded-2xl border">
          <div className="col-span-4">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="col-span-8">
            <Card className="w-full ">
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
                      <p className="text-red-500 text-sm">
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
