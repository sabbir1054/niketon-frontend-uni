"use client";

import { authKey } from "@/constance/authKey";
import { getUserRoleFromLocal } from "@/utils/AuthServices";
import { getFromLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = getFromLocalStorage(authKey);
  const user = getUserRoleFromLocal(token as string);
  const router = useRouter();
  if (user?.role !== "OWNER") {
    toast.error("You are not authorized");
    router.push("/");
  }

  return <>{children}</>;
}
