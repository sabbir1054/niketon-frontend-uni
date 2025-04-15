/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SpinnerOverlay from "@/components/shared/SpinnerOverlay";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { Eye, EyeOff } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateNewPassword() {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const params = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { otp } = params;
  const email = params?.email ? decodeURIComponent(params.email as string) : "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      repeatPassword: "",
    },
  });

  const newPassword = watch("newPassword");
  const passwordConditions = {
    length: newPassword.length >= 8,
    number: /\d/.test(newPassword),
    uppercase: /[A-Z]/.test(newPassword),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const onSubmit = async (data: any) => {
    console.log("Password Updated:", data);
    try {
      const res: any = await resetPassword({
        otp: otp,
        email: email,
        newPassword: data?.newPassword,
      }).unwrap();
      if (res?.success === true) {
        toast.success("Verification successful, password changed !");
        router.push(`/auth/login`);
      } else {
        toast.error("Invalid or expired verification code");
      }
    } catch (error: any) {
      toast.error("Invalid or expired verification code");
    }
  };
  if (isLoading) {
    return <SpinnerOverlay />;
  }
  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-lg p-6 shadow-sm rounded-xl">
        <CardContent>
          <h2 className="text-xl font-semibold text-center mb-10">
            Create New Password
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password */}
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("newPassword", {
                    required: "Password is required",
                    minLength: 6,
                  })}
                  className="shadow-none p-5 rounded-xl border-secondary-foreground my-5"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Repeat Password */}
            <div>
              <Label htmlFor="repeatPassword">Repeat Password</Label>
              <div className="relative">
                <Input
                  id="repeatPassword"
                  type={showRepeatPassword ? "text" : "password"}
                  {...register("repeatPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  className="shadow-none p-5 rounded-xl border-secondary-foreground my-5"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  {showRepeatPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.repeatPassword && (
                <p className="text-red-500 text-sm">
                  {errors.repeatPassword.message}
                </p>
              )}
            </div>
            <div className="flex justify-between password_conditions">
              <div>
                <p
                  className={`text-xs py-1 ${
                    passwordConditions.length
                      ? "text-green-500"
                      : "text-secondary-foreground"
                  }`}
                >
                  ● Use 8 or more characters
                </p>
                <p
                  className={`text-xs py-1 ${
                    passwordConditions.number
                      ? "text-green-500"
                      : "text-secondary-foreground"
                  }`}
                >
                  ● Use a number (e.g. 1234)
                </p>
              </div>
              <div>
                <p
                  className={`text-xs py-1 ${
                    passwordConditions.uppercase
                      ? "text-green-500"
                      : "text-secondary-foreground"
                  }`}
                >
                  ● Use upper and lower case letters (e.g. Aa)
                </p>
                <p
                  className={`text-xs py-1 ${
                    passwordConditions.symbol
                      ? "text-green-500"
                      : "text-secondary-foreground"
                  }`}
                >
                  ● Use a symbol (e.g. !@#$)
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Save Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
