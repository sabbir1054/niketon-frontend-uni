/* eslint-disable react-hooks/exhaustive-deps */
import { authKey } from "@/constance/authKey";
import { getUserRoleFromLocal } from "@/utils/AuthServices";
import { getFromLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getFromLocalStorage(authKey);

    if (!token) {
      router.replace("/auth/login"); // Redirect if no token
      toast.warning("Please login first");
      return;
    }

    const user = getUserRoleFromLocal(token);

    if (user?.role) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      toast.error("Something went wrong!, try again");
      router.replace("/auth/login");
    }
  }, []);

  return isAuthenticated;
}
