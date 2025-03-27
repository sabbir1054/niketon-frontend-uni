/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authKey } from "@/constance/authKey";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/slice/authSlice";
import { setToLocalStorage } from "@/utils/localStorage";
import { Eye, EyeOff, Facebook } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import SpinnerOverlay from "../shared/SpinnerOverlay";

export default function SigninForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      const res: any = await login({ ...data });
      console.log(res);

      if (res?.data.success === true) {
        toast.success("Login success");
        dispatch(setUser({ token: res?.data?.data?.accessToken }));
        setToLocalStorage(authKey, res?.data?.data?.accessToken);
        router.push("/");
        window.location.reload();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error("User not valid");
    }
  };
  if (isLoading) {
    return <SpinnerOverlay />;
  }

  return (
    <div className="flex justify-center  bg-white min-h-screen">
      <Card className="p-8 max-w-lg w-full  border-none shadow-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Hey There!!! Welcome Back.
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            {/* <div className=" text-center text-gray-500"> */}
            <p className=" my-1 text-end text-destructive font-medium">
              Forgot Password ?
            </p>
            {/* </div> */}
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

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
          >
            Sign in
          </Button>
        </form>

        <div className=" text-center text-gray-500">
          Or, Sign in with your email
        </div>

        <Button className="w-full bg-white border text-gray-700 flex items-center gap-2">
          <img src="/images/search.png" width={20} /> Sign in with Google
        </Button>
        <Button className="w-full mt-2 bg-white border text-gray-700 flex items-center gap-2">
          <Facebook size={20} className="text-blue-600" /> Sign in with Facebook
        </Button>

        <p className="text-center mt-2 text-gray-700">
          Don't have an account ?{" "}
          <Link href="/auth/register" className="text-indigo-600">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}
