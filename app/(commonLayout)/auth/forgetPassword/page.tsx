/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SpinnerOverlay from "@/components/shared/SpinnerOverlay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgetPasswordMutation } from "@/redux/api/authApi";
// import { useForgetPasswordMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ForgotPassword() {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgetPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res: any = await forgotPassword({ ...data }).unwrap();
      if (res?.success === true) {
        toast.success("Email send successful !");
        router.push(`/auth/forgetPassword/verify/${data?.email}`);
      } else {
        toast.error(res?.detail);
      }
    } catch (error: any) {
      toast.error(error?.data?.detail);
    }
  };
  if (isLoading) {
    return <SpinnerOverlay />;
  }
  return (
    <div className="flex justify-center  p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-lg">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="shadow-none p-5 rounded-xl border-secondary-foreground my-5"
              />
              {errors.email?.message &&
                typeof errors.email.message === "string" && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
            </div>
            <Button type="submit" className="w-full " disabled={isLoading}>
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
