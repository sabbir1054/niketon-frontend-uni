// components/shared/Sidebar.tsx
"use client";

import { cn } from "@/lib/utils"; // if you're using ShadCN utility
import { useCurrentToken } from "@/redux/slice/authSlice";
import { getUserRoleFromLocal } from "@/utils/AuthServices";
import {
  ChevronLeft,
  ChevronRight,
  GitPullRequest,
  HousePlus,
  LayoutDashboard,
  MessageCircleHeart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const token = useSelector(useCurrentToken);
  const user = getUserRoleFromLocal(token);
  console.log(user);

  const pathName = usePathname();
  console.log(pathName);

  return (
    <>
      <div
        className={cn(
          "h-screen transition-all duration-300 bg-gray-900 text-white flex flex-col",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          {!collapsed && <span className="text-lg font-bold">Dashboard</span>}
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
        {user?.role === "TENANT" && (
          <nav className="flex-1 p-2 space-y-2">
            <Link
              href="/dashboard/myRequest"
              className={`flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-md ${
                pathName === "/dashboard/myRequest" ? "bg-gray-800" : ""
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              {!collapsed && <span>My Requests</span>}
            </Link>
          </nav>
        )}

        {user?.role === "OWNER" && (
          <nav className="flex-1 p-2 space-y-2">
            <Link
              href="/dashboard"
              className={`flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-md ${
                pathName === "/dashboard" ? "bg-gray-800" : ""
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              {!collapsed && <span>Dashboard</span>}
            </Link>
            <Link
              href="/dashboard/manageHouse"
              className={`flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-md ${
                pathName === "/dashboard/manageHouse" ? "bg-gray-800" : ""
              }`}
            >
              <HousePlus className="w-5 h-5" />
              {!collapsed && <span>Manage House</span>}
            </Link>
            <Link
              href="/dashboard/manageBookingRequest"
              className={`flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-md ${
                pathName === "/dashboard/manageBookingRequest"
                  ? "bg-gray-800"
                  : ""
              }`}
            >
              <GitPullRequest className="w-5 h-5" />
              {!collapsed && <span>Booking Request</span>}
            </Link>
            <Link
              href="/dashboard/manageBookingRequest/feedbacks"
              className={`flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-md ${
                pathName === "/dashboard/feedbacks" ? "bg-gray-800" : ""
              }`}
            >
              <MessageCircleHeart className="w-5 h-5" />
              {!collapsed && <span>Feedbacks</span>}
            </Link>
          </nav>
        )}
      </div>
    </>
  );
}
