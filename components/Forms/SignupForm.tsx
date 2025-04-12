/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/redux/api/authApi";
import { Eye, EyeOff, Facebook } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SpinnerOverlay from "../shared/SpinnerOverlay";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { isLoading }] = useRegisterMutation();
  const onSubmit = async (data: any) => {
    console.log(data);
    const { confirmPassword, ...othersData } = data;

    try {
      const res: any = await registerUser({ ...othersData });
      if (res?.data?.success === true) {
        toast.success("Registration successful");
        window.location.href = "/auth/login";
        reset();
      }
    } catch (error: any) {
      toast.error("User not register");
    }
  };
  if (isLoading) {
    return <SpinnerOverlay />;
  }
  return (
    <div className="flex justify-center  bg-white min-h-screen">
      <Card className="p-8 max-w-lg w-full  border-none shadow-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Signup! New Account.
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Are you Owner/Tenant ?</Label>
            <Select onValueChange={(value) => setValue("role", value)} required>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select " />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OWNER">House owner</SelectItem>
                <SelectItem value="TENANT">Tenant</SelectItem>
                {/* <SelectItem value="bungalow">Bungalow</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Name *</label>
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="Enter Name"
            />
            {errors.name?.message && (
              <p className="text-red-500 text-sm">
                {String(errors.name.message)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email *</label>
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter Email"
            />
            {errors.email?.message && (
              <p className="text-red-500 text-sm">
                {String(errors.email.message)}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium">
              Password *
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              placeholder="Enter Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password?.message && (
              <p className="text-red-500 text-sm">
                {String(errors.password.message)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Confirm Password *
            </label>
            <Input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Enter Confirm Password"
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500 text-sm">
                {String(errors.confirmPassword.message)}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
          >
            Sign Up
          </Button>
        </form>

        <div className=" text-center text-gray-500">
          Or, Sign up with your email
        </div>

        <Button className="w-full bg-white border text-gray-700 flex items-center gap-2">
          <img src="/images/search.png" width={20} /> Sign up with Google
        </Button>
        <Button className="w-full mt-2 bg-white border text-gray-700 flex items-center gap-2">
          <Facebook size={20} className="text-blue-600" /> Sign up with Facebook
        </Button>

        <p className="text-center mt-2 text-gray-700">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-indigo-600">
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
}
