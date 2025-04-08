/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVerifyOtpMutation } from "@/redux/api/authApi";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const ForgotPasswordVerifyOtp = () => {
  const router = useRouter();
  const params = useParams();
  const [verifyOtpCode, { isLoading }] = useVerifyOtpMutation();
  const { control, handleSubmit, setValue } = useForm();
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = params?.email ? decodeURIComponent(params.email as string) : "";

  const onSubmit = async (data: any) => {
    const { otp0, otp1, otp2, otp3, otp4, otp5 } = data;
    const otp: string = `${otp0 + otp1 + otp2 + otp3 + otp4 + otp5}`;
    // return router.push(`/auth/forgotPassword/newPassword/${email}/${otp}`);
    try {
      const res: any = await verifyOtpCode({
        otp: otp,
        email: email,
      }).unwrap();
      if (res?.success === true) {
        toast.success("Verification successful !");
        router.push(`/auth/forgotPassword/newPassword/${email}/${otp}`);
      } else {
        toast.error("Invalid or expired verification code");
      }
    } catch (error: any) {
      toast.error("Invalid or expired verification code");
    }
  };

  return (
    <div className=" flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm mt-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Verify OTP</h2>
        <p className="text-gray-500 mt-2">
          Enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="flex justify-center gap-2">
            {[...Array(6)].map((_, index) => (
              <Controller
                key={index}
                name={`otp${index}`}
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: /^[0-9]$/ }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    maxLength={1}
                    // Callback ref to set focus on the next field
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }} // Assigning ref here
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d?$/.test(value)) {
                        field.onChange(value);
                        if (value && index < 5) {
                          inputRefs.current[index + 1]?.focus();
                        }
                      }
                    }}
                    className="w-12 h-12 text-center text-xl font-bold border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
              />
            ))}
          </div>

          <Button type="submit" className="mt-4 w-full" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordVerifyOtp;
